import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/ActivityCard.css";

type ActivityCardType = {
  activity: Activity;
  participantStatus?: string | null | undefined;
  isPending?: boolean;
  onStatusChange?: () => void;
};

function ActivityCard({
  activity,
  participantStatus,
  isPending,
  onStatusChange,
}: ActivityCardType) {
  const navigate = useNavigate();
  const price = Number(activity.price);
  const playing_at = new Date(activity.playing_at);
  const [alreadyParticipant, setAlreadyParticipant] = useState(false);
  const formattedPlayingAt = playing_at.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const nbAvailableSpots = activity.nb_spots - activity.nb_participant;
  const widthProgressBar = (100 / activity.nb_spots) * activity.nb_participant;

  const makeReservation = async (
    activity: Activity,
    nbAvailableSpots: number,
  ) => {
    //  !User navigate to sign up (To implement when we will see connection)

    if (nbAvailableSpots === 0) {
      // ? button is showing alert, user can click to put oneself to wait list and receive email when nb !== 0 (reminder: probably I'll use useMemo)
    }

    const newParticipant = {
      userId: 25,
      activityId: activity.id,
      status: activity.auto_validation ? "accepted" : "request",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/participation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newParticipant),
        },
      );

      const responseStatus = await response.json();

      if (!response.ok) throw new Error("Failed to join activity");

      if (responseStatus.alreadyClicked) {
        setAlreadyParticipant(responseStatus.alreadyClicked);
        return;
      }

      navigate("/my-activities", {
        state: activity.auto_validation ? 0 : 2,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const acceptInvitation = async (activityId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/participation`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 25,
            activityId: activityId,
            status: "accepted",
            participantUsername: "CurrentUser",
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to accept invitation");

      if (onStatusChange) onStatusChange();
    } catch (err) {
      console.error(err);
    }
  };

  const refuseInvitation = async (activityId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/participation`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 25,
            activityId: activityId,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to refuse invitation");

      if (onStatusChange) onStatusChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="card">
      <div className={`card-header ${activity.name}`}>
        <h2>{activity.name}</h2>
        <p className={`label-price ${price === 0 ? "free" : "paid"}`}>
          {price === 0
            ? "Gratuit"
            : price % 1 === 0
              ? `${price} €`
              : `${price.toFixed(2)} €`}
        </p>
      </div>
      <div className="important-info">
        <img src="/icons/calendar.png" alt="icon-calendar" />
        <p>
          {formattedPlayingAt.charAt(0).toUpperCase() +
            formattedPlayingAt.slice(1)}
        </p>
        <img src="/icons/clock.png" alt="icon-clock" />
        <p>{activity.playing_time.slice(0, 5).replace(":", "h")}</p>
        <img src="/icons/pin.png" alt="icon-pin" />
        <p>{activity.city}</p>
      </div>
      <div className="card-tags">
        <p className="card-tag">
          {activity.level === "all" && "Tous niveaux"}
          {activity.level === "beginner" && "Débutant"}
          {activity.level === "amateur" && "Intermédiaire"}
          {activity.level === "advanced" && "Confirmé"}
        </p>
        <p className={`card-tag ${!activity.disabled && "condition-missing"}`}>
          <img src="/icons/disabled.png" alt="logo disabled" />
          Handisport
        </p>
        <p className={`card-tag ${!activity.locker && "condition-missing"}`}>
          <img src="/icons/locker.png" alt="logo locker" />
          Vestiaires
        </p>
        <p className={`card-tag ${!activity.shower && "condition-missing"}`}>
          <img src="/icons/shower.png" alt="logo shower" />
          Douches
        </p>
        <p className={`card-tag ${!activity.toilet && "condition-missing"}`}>
          <img src="/icons/toilet.png" alt="logo toilet" />
          Toilettes
        </p>
        <p
          className={`card-tag ${!activity.air_conditioning && "condition-missing"}`}
        >
          <img
            src="/icons/air-conditionning.png"
            alt="logo air conditionning"
          />
          Clim
        </p>
      </div>
      <div className="nb-participant">
        <p>
          <img src="/icons/participants.png" alt="logo participants" />
          {`${activity.nb_participant}/${activity.nb_spots} Participants`}
        </p>
        <p>{`${nbAvailableSpots < 0 ? "0" : nbAvailableSpots} ${nbAvailableSpots <= 1 ? "place restante" : "places restantes"}`}</p>
      </div>
      <div className="bar">
        <div
          className={`progress-bar ${activity.nb_participant >= activity.nb_spots / 2 && "almost-full"} ${nbAvailableSpots === 0 && "full"}`}
          style={{ "--size": `${widthProgressBar}%` } as React.CSSProperties}
        >
          {" "}
        </div>
      </div>
      <div className="card-footer">
        <div className="user-organizer">
          <img src={activity.user_picture} alt="user" />
          <p>{activity.username}</p>
        </div>
        {isPending ? (
          <div className="invitation-buttons">
            <button
              type="button"
              className="refuse-button"
              onClick={() => refuseInvitation(activity.id)}
            >
              Refuser
            </button>
            <button
              type="button"
              className="accept-button"
              onClick={() => acceptInvitation(activity.id)}
            >
              Accepter
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => makeReservation(activity, nbAvailableSpots)}
          >
            {nbAvailableSpots === 0 ? (
              <>
                <img src="/icons/bell.png" alt="logo alert" />
              </>
            ) : (
              <>
                {" "}
                {alreadyParticipant
                  ? "Déjà inscrit"
                  : participantStatus
                    ? participantStatus
                    : "Reserve"}
              </>
            )}
          </button>
        )}
      </div>
      <div className={nbAvailableSpots === 0 ? "Complet" : ""}> </div>
    </article>
  );
}

export default ActivityCard;
