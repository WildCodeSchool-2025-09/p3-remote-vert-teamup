import { useEffect, useState } from "react";
import "../styles/ParticipantsList.css";

type ParticipantsListProps = {
  id: number;
  visibility: boolean;
};

type Participant = {
  username: string;
  picture: string;
  status: string;
};

function ParticipantsList({ id, visibility }: ParticipantsListProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participants?id=${id}`)
      .then((response) => response.json())
      .then((participants) => setParticipants(participants));
  }, [id]);

  return (
    <ul>
      {participants.map((participant) => (
        <li key={participant.username}>
          <div>
            <img src={participant.picture} alt="" />
            <p>{participant.username}</p>
          </div>
          {participant.status === "refused" ? (
            <p className="refused">Refusée</p>
          ) : participant.status === "accepted" ? (
            <p className="accepted">Acceptée</p>
          ) : participant.status === "pending" ? (
            <p className="pending">En attente ...</p>
          ) : (
            <div>
              <button type="button" className="btn-refused">
                Accepté
              </button>
              <button type="button" className="btn-accepted">
                Refusé
              </button>
            </div>
          )}
        </li>
      ))}
      {!visibility && (
        <div>
          <input type="text" placeholder="Inviter des personnes" />
          <button type="button">bouton</button>
        </div>
      )}
    </ul>
  );
}

export default ParticipantsList;
