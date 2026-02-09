import { useNavigate } from "react-router";
import "../styles/ActivityCard.css";
import { StatusCodes } from "http-status-codes";
import ParticipantsList from "./ParticipantsList";
import toast from "react-hot-toast";

type ActivityCardType = {
  activity: Activity;
  selectedTab?: string;
  setMyActivities?: React.Dispatch<React.SetStateAction<Activity[]>>;
  participantsListIsOpen?: boolean;
  onClickListParticipant?: () => void;
};

function ActivityCard({
  activity,
  selectedTab,
  setMyActivities,
  participantsListIsOpen,
  onClickListParticipant,
}: ActivityCardType) {
  const price = Number(activity.price);
  const playing_at = new Date(activity.playing_at);
  const formattedPlayingAt = playing_at.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const nbAvailableSpots = activity.nb_spots - activity.nb_participant;
  const widthProgressBar = (100 / activity.nb_spots) * activity.nb_participant;
  const navigate = useNavigate();

  const makeReservation = async (
    activity: Activity,
    nbAvailableSpots: number,
  ) => {
    //  !User navigate to sign up (To implement when we will see connection)

    if (nbAvailableSpots === 0) {
      return;
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

      if (response.status === StatusCodes.CONFLICT) {
        return;
      }

      if (!response.ok) throw new Error("Failed to join activity");

      navigate("/my-activities", {
        state: {
          selectedTab: activity.auto_validation ? "incoming" : "pending",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const acceptOrRefuseInvitation = async (
    activityId: number,
    status: string,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/participation`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 25, // Replace userId with context loged in variable
            activityId: activityId,
            status: status,
            participantUsername: "CurrentUser", //connexion
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to accept invitation");

      setMyActivities?.((prev) => prev.filter((a) => a.id !== activity.id));
      status === "accepted"
        ? toast.success("Invitation validée")
        : status === "refused" && toast.error("Invitation refusée");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <article
        className={`card ${participantsListIsOpen ? "card-important" : ""}`}
      >
        <div className={`card-header ${activity.name}`}>
          <div className="overlay-img"> </div>
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
          <p
            className={`card-tag ${!activity.disabled && "condition-missing"}`}
          >
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
        {selectedTab !== "published" && (
          <div className="card-footer">
            <div className="user-organizer">
              <img src={activity.user_picture} alt="user" />
              <p>{activity.username}</p>
            </div>
            {selectedTab === "incoming" && (
              <img
                src="/icons/check.png"
                alt="validate"
                className="tag-status"
              />
            )}
            {!selectedTab && (
              <button
                type="button"
                onClick={() => makeReservation(activity, nbAvailableSpots)}
              >
                {nbAvailableSpots === 0 ? (
                  <>
                    Complet
                    <img src="/icons/bell.png" alt="logo alert" />
                  </>
                ) : (
                  "Réserver"
                )}
              </button>
            )}
            {selectedTab === "pending" &&
            activity.participation_status === "inviting" ? (
              <div className="invitation-buttons">
                <button
                  type="button"
                  className="refuse-button"
                  onClick={() =>
                    acceptOrRefuseInvitation(activity.id, "refused")
                  }
                >
                  Refuser
                </button>
                <button
                  type="button"
                  className="accept-button"
                  onClick={() =>
                    acceptOrRefuseInvitation(activity.id, "accepted")
                  }
                >
                  Accepter
                </button>
              </div>
            ) : selectedTab === "pending" &&
              activity.participation_status === "request" ? (
              <img
                src="/icons/hourglass.png"
                alt="pending"
                className="tag-status"
              />
            ) : (
              selectedTab === "pending" &&
              activity.participation_status === "refused" && (
                <img
                  src="/icons/cross.png"
                  alt="refused"
                  className="tag-status"
                />
              )
            )}
          </div>
        )}
        {selectedTab === "published" && (
          <button
            type="button"
            className={`dropdown-participation ${participantsListIsOpen ? "dropdown-open" : ""}`}
            onClick={onClickListParticipant}
            disabled={!activity.total_participant}
          >
            Participants
            <img
              src="/icons/chevron.png"
              alt=""
              className={`${participantsListIsOpen ? "rotate" : ""}`}
            />
          </button>
        )}

        <div
          className={
            nbAvailableSpots === 0 && !selectedTab ? "activity-full" : ""
          }
        >
          {" "}
        </div>

        {participantsListIsOpen && (
          <ParticipantsList
            activityId={activity.id}
            visibility={activity.visibility}
          />
        )}
      </article>
    </>
  );
}

export default ActivityCard;
