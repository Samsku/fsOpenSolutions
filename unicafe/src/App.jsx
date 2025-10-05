import {useState} from "react";

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    return (
        <>
            {total === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table>
                    <tbody>
                        <StatisticLine text="Good" value={good} />
                        <StatisticLine text="Neutral" value={neutral} />
                        <StatisticLine text="Bad" value={bad} />
                        <StatisticLine text="All" value={total} />
                        <StatisticLine text="Average" value={average} />
                        <StatisticLine text="Positive" value={positive} />
                    </tbody>
                </table>
            )}
        </>
    )
}

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h2>Give Feedback</h2>
            <Button text="Good" onClick={() => setGood(good + 1)} />
            <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="Bad" onClick={() => setBad(bad + 1)} />

            <Statistics good={good} bad={bad} neutral={neutral} />
        </>
    )
}

export default App;