import "../styles/ActivityCard.css";

type ActivityCardType = {
  activity: Activity;
};

function ActivityCard({ activity }: ActivityCardType) {
  const price = Number(activity.price);
  const playing_at = new Date(activity.playing_at);
  const formattedPlayingAt = playing_at.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  const nbAvailableSpots = activity.nb_spots - activity.nb_participant;
  const widthProgressBar = (100 / activity.nb_spots) * activity.nb_participant;

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
        <button type="button">
          {nbAvailableSpots === 0 ? (
            <>
              <img src="/icons/bell.png" alt="logo alert" />
            </>
          ) : (
            <>Réserver &gt;</>
          )}
        </button>
      </div>
      <div className={nbAvailableSpots === 0 ? "activity-full" : ""}> </div>
    </article>
  );
}

export default ActivityCard;
