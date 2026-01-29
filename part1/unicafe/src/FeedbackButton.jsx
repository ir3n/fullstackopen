const FeedbackButton = ({ option, handleClick }) => {
  return <button onClick={() => handleClick(option)}>{option}</button>;
};

export default FeedbackButton;
