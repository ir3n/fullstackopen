import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  const { feedbackOptionNames, feedbackOptions } = props;

  const totalFeedbackNum = Object.values(feedbackOptions).reduce(
    (sum, val) => sum + val,
    0,
  );

  // good = 1, neutral = 0, bad = -1
  const averageFeedback =
    totalFeedbackNum === 0
      ? 0
      : (feedbackOptions.good - feedbackOptions.bad) / totalFeedbackNum;

  const percentageOfPositive =
    totalFeedbackNum === 0
      ? 0
      : (feedbackOptions.good / totalFeedbackNum) * 100;

  const renderFeedback = () => {
    if (totalFeedbackNum === 0) {
      return <p>No feedback given</p>;
    }

    return (
      <table>
        <tbody>
          {feedbackOptionNames.map((option, i) => (
            <StatisticLine
              key={option}
              label={option}
              value={feedbackOptions[option]}
            />
          ))}

          <StatisticLine label={"all"} value={totalFeedbackNum} />
          <StatisticLine label={"average"} value={averageFeedback} />
          <StatisticLine
            label={"positive"}
            value={`${percentageOfPositive}%`}
          />
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h2>Statistics</h2>

      {renderFeedback()}
    </>
  );
};

export default Statistics;
