const Round = props => {
  return (
    <div className="card">
      <p className="text-lg">{props.project}</p>
      <ul>
        <li>{`Rate: ${props.rate}`}</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Round;
