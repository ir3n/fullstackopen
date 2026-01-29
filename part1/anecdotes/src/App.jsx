import { useState } from "react";
import Anecdote from "./Anecdote";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(
    Array(anecdotes.length).fill(0),
  );

  const getRandomIndexExcludingNum = (max, excluded) => {
    if (max <= 1) return 0;

    let index;
    do {
      index = Math.floor(Math.random() * max);
    } while (index === excluded);

    return index;
  };

  const handleVoteButtonClick = () => {
    setAnecdotesVotes((prev) => {
      const copy = [...prev];
      copy[selectedIndex]++;
      return copy;
    });
  };

  const handleNextButtonClick = () => {
    setSelectedIndex((current) =>
      getRandomIndexExcludingNum(anecdotes.length, current),
    );
  };

  const mostVotesValue = Math.max(...anecdotesVotes);
  const indexOfMostVoted = anecdotesVotes.indexOf(mostVotesValue);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote
        text={anecdotes[selectedIndex]}
        numOfVotes={anecdotesVotes[selectedIndex]}
      />

      <button onClick={handleVoteButtonClick}>vote</button>
      <button onClick={handleNextButtonClick}>next anecdote</button>

      <h2>Anecdote with the most votes</h2>

      {mostVotesValue > 0 ? (
        <Anecdote
          text={anecdotes[indexOfMostVoted]}
          numOfVotes={mostVotesValue}
        />
      ) : (
        <p>No votes yet.</p>
      )}
    </>
  );
};

export default App;
