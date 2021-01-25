import { useEffect, useState } from 'react';
// import Action from './components/Action';
import Tapestry from './components/Tapestry';
import Debug from './components/Debug';
import Loader from './components/Loader';
import fetchData from './mockApi';

function formatDateToIsoDate(date) {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function floorDateToClosestSunday(date) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - newDate.getDay());
    return newDate;
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
    const [result, setResult] = useState({ data: [], total: 0, nextPage: '' });

    // On app load, fetch first page of data.
    useEffect(() => {
        fetchData().then(setResult);
    }, []);

    // When state changes, and there is a next page to fetch, go fetch it!
    // TODO: Promise.allSettled ?
    useEffect(() => {
        if (result.nextPage) {
            fetchData({ page: result.nextPage }).then(response => {
                setResult({
                    ...result,
                    nextPage: response.nextPage,
                    data: result.data.concat(response.data)
                });
            });
        }
    }, [result]);

    const { data, total } = result;

    if (!data.length) {
        return <div>No activity</div>;
    } else if (data.length < total) {
        return <Loader current={data.length} total={total} />;
    }

    const oldestDate = floorDateToClosestSunday(data[data.length - 1].created_at);
    const newestDate = new Date(data[0].created_at);
    const dates = generateDateStampsInRange(oldestDate, newestDate);

    // Count events per day
    const countsByDay = dates.reduce((memo, s) => ({ ...memo, [s]: 0 }), {});
    data.forEach(o => {
        const d = formatDateToIsoDate(new Date(o.created_at));
        countsByDay[d]++;
    });

    const tapestryCells = Object.keys(countsByDay).reverse().map(s => ({
        date: s,
        count: countsByDay[s]
    }));

    return (
        <div>
            <p>
                Showing {data.length} events from {
                    oldestDate.toISOString()} to {
                    newestDate.toISOString()}
            </p>

            <Tapestry cells={tapestryCells} />

            {/* <ol className="activity-list">
                {result.map(o => <Action key={o.id} {...o} />)}
            </ol> */}
            <Debug data={result} />
        </div>
    );
}

export default App;
