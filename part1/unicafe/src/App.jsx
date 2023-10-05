import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  const totalVotes = good + neutral + bad;
  const netPositive = good - bad;
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{totalVotes}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(netPositive / totalVotes).toFixed(1)}</td>
        </tr>
        <tr>
          <td>positve</td>
          <td>{((100 * good) / totalVotes).toFixed(1)} %</td>
        </tr>
      </tbody>
    </table>
    // <div>
    //   <StatisticLine text="good" value={good} />
    //   <StatisticLine text="neutral" value={neutral} />
    //   <StatisticLine text="bad" value={bad} />
    //   <StatisticLine text="all" value={totalVotes} />
    //   <StatisticLine text="average" value={(netPositive / totalVotes).toFixed(1)} />
    //   <StatisticLine text="positive" value={`${((100 * good) / totalVotes).toFixed(1)} %`} />
    // </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
