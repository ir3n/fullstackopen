const Anecdote = ({ text, numOfVotes }) => {
  return (
    <p>
      {text} <br />
      {`has ${numOfVotes} ${numOfVotes === 1 ? "vote" : "votes"}`}
    </p>
  );
};

export default Anecdote;
