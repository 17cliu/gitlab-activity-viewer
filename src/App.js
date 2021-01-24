import { useEffect, useState } from 'react';
// import Action from './components/Action';
import Tapestry from './components/Tapestry';
import Debug from './components/Debug';
// import fetchData from './api';

// TODO: Using mock data for now.
import testData from './data.json';
const fetchData = () => Promise.resolve(testData);

function formatDateToIsoDate(date) {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function generateDateStampsInRange(oldest, newest) {
    const newestDate = new Date(newest);
    const oldestDate = new Date(oldest);
    const dates = [];

    // https://github.com/eslint/eslint/issues/6984
    // eslint-disable-next-line no-unmodified-loop-condition
    while (newestDate > oldestDate) {
        dates.push(formatDateToIsoDate(newestDate));
        newestDate.setDate(newestDate.getDate() - 1);
    }

    return dates;
}

function App() {
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetchData().then(setResult);
    }, []);

    if (!result.length) {
        return <div>No activity</div>;
    }

    const oldestDate = result[result.length - 1].created_at;
    const newestDate = result[0].created_at;
    const dates = generateDateStampsInRange(oldestDate, newestDate);

    // Count events per day
    const countsByDay = dates.reduce((memo, s) => ({ ...memo, [s]: 0 }), {});
    result.forEach(o => {
        const d = formatDateToIsoDate(new Date(o.created_at));
        countsByDay[d]++;
    });

    const tapestryCells = Object.keys(countsByDay).map(s => ({
        date: s,
        count: countsByDay[s]
    }));

    return (
        <div>
            <p>Total items: {result.length}</p>
            <p>From {oldestDate} to {newestDate}</p>

            <Tapestry cells={tapestryCells} />

            {/* <ol className="activity-list">
                {result.map(o => <Action key={o.id} {...o} />)}
            </ol> */}
            <Debug data={result} />
        </div>
    );
}

export default App;
