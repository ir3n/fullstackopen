import { useState } from "react";
import Statistics from "./Statistics";
import FeedbackButton from "./FeedbackButton";

const initFeedbackOptions = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [feedbackOptions, setFeedbackOptions] = useState(initFeedbackOptions);

  const handleButtonClick = (option) => {
    setFeedbackOptions((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));
  };

  const feedbackOptionNames = Object.keys(feedbackOptions);

  return (
    <>
      <h1>Give feedback</h1>

      {feedbackOptionNames.map((option, i) => (
        <FeedbackButton
          key={option}
          option={option}
          handleClick={handleButtonClick}
        />
      ))}

      <Statistics
        feedbackOptionNames={feedbackOptionNames}
        feedbackOptions={feedbackOptions}
      />
    </>
  );
}

export default App;
