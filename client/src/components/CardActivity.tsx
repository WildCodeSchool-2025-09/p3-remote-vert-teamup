import type { CardActivityType } from "../types/Activity";
import "../styles/CardActivity.css";

function CardActivity({ activity }: CardActivityType) {
  const price = Number(activity.price);
  const date = new Date(activity.playing_at);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const resultFormattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <article className="card">
      <div
        className="card-header"
        style={{ backgroundImage: `url(${activity.sport_picture})` }}
      >
        <h2>{activity.name}</h2>
        <p className={`label-price ${price === 0 ? "free" : "paid"}`}>
          {price === 0
            ? "Gratuit"
            : price % 1 === 0
              ? `${price} €`
              : `${price.toFixed(2)} €`}
        </p>
      </div>
      <div className="date-time-location">
        <img src="../../public/icons/calendar.png" alt="icon-calendar" />
        <p>{resultFormattedDate}</p>
        <img src="../../public/icons/clock.png" alt="icon-clock" />
        <p>{activity.playing_time.slice(0, 5).replace(":", "h")}</p>
        <img src="../../public/icons/pin.png" alt="icon-pin" />
        <p>{activity.city}</p>
      </div>
      <div className="card-tags">
        <p className="card-tag">
          {activity.level === "All" && "Tous niveaux"}
          {activity.level === "begginer" && "Débutant"}
          {activity.level === "amateur" && "Intermédiaire"}
          {activity.level === "advance" && "Confirmé"}
        </p>
        <p className={`card-tag ${!activity.disabled && "condition-missing"}`}>
          Handisport
        </p>
        <p className={`card-tag ${!activity.locker && "condition-missing"}`}>
          Vestiaires
        </p>
        <p className={`card-tag ${!activity.shower && "condition-missing"}`}>
          Douches
        </p>
        <p className={`card-tag ${!activity.toilet && "condition-missing"}`}>
          Toilettes
        </p>
        <p
          className={`card-tag ${!activity.air_conditioning && "condition-missing"}`}
        >
          Clim
        </p>
      </div>
    </article>
  );
}

export default CardActivity;
