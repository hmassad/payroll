import Button from "./UI/Button";

import moment from "moment";

const Round = props => {
  const handleCreateRound = (e, round) => {
    e.preventDefault();
    fetch(`/api/projects/${round.project}/rounds`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        project: round.project,
        contractorId: round.contractor.id,
        assignmentId: round.assignment.id
      })
    });
  };

  const handleCloseRound = (e, round) => {
    e.preventDefault();
    fetch(`/api/projects/${round.project}/rounds`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        roundId: parseInt(round.id)
      })
    });
  };
  return (
    <div className="card mb-3">
      <div className="grid grid-cols-2 gap-4 place-content-center h-48">
        <p className="text-5xl">{props.round.project.name}</p>
        <p>{props.round.assignment.rate}</p>
        <ul>
          <li className="text-2xl">{props.round.project.customer}</li>
        </ul>
        <p>{moment(props.round.startedAt).local().format("llll")}</p>
        <p>{props.round.duration}</p>
        <p>{props.round.contractor.name}</p>
      </div>
      {moment(props.round.finishedAt) > moment(new Date(0)) ? (
        <Button
          className="btn-primary"
          onClick={e => handleCreateRound(e, props.round)}
          type="button"
        >
          Crear Round
        </Button>
      ) : (
        <Button
          className="btn-warning"
          onClick={e => handleCloseRound(e, props.round)}
          type="button"
        >
          Cerrar Round
        </Button>
      )}
    </div>
  );
};

export default Round;
