import { useEffect, useState } from 'react';
// import Action from './components/Action';
import EventsByDayOfWeek from './components/EventsByDayOfWeekChart';
import EventsByTypeChart from './components/EventsByTypeChart';
import DownloadLink from './components/DownloadLink';
import Loader from './components/Loader';
import Tapestry from './components/Tapestry';
import Statistics from './components/Statistics';
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
    const [result, setResult] = useState({ data: [], total: 0 });
    const [numItemsFetched, setNumItemsFetched] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // On app load, fetch all data
    useEffect(() => {
        fetchData().then(initialResponse => {
            setResult(initialResponse);
            setNumItemsFetched(initialResponse.data.length);
            console.log('got first page', initialResponse);

            if (!initialResponse.nextPage) {
                // This is all the data there is!
                setIsLoading(false);
            } else {
                // Fetch the remaining pages.

                // Array(n) generates [0, 1, 2, ... n-1]. Because page numbers are
                // 1-indexed, we generate `totalPages + 1` numbers, then slice off
                // the 0. We also slice off the 1, because we already fetched the
                // first page.
                const pagesToFetch = [...Array(initialResponse.totalPages + 1).keys()].slice(2);
                console.log('attempting to fetch more pages:', pagesToFetch);

                const promises = pagesToFetch.map(async page => {
                    // await new Promise(resolve => setTimeout(resolve, Math.random() * 10000));
                    const data = await fetchData({ page });
                    setNumItemsFetched(n => n + data.data.length);
                    return data;
                });

                Promise.allSettled(promises).then(outcomes => {
                    const newResult = outcomes.reduce((memo, outcome, i) => {
                        if (outcome.status === 'fulfilled') {
                            return {
                                ...memo,
                                nextPage: outcome.value.nextPage,
                                data: memo.data.concat(outcome.value.data)
                            };
                        } else {
                            console.log('Failed to fetch chunk of events!', i);
                            return memo;
                        }
                    }, { ...initialResponse });

                    setResult(newResult);
                    setIsLoading(false);
                });
            }
        });
    }, []);

    const { data, total } = result;

    if (isLoading) {
        return <Loader current={numItemsFetched} total={total} />;
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

            <div className="charts">
                <EventsByDayOfWeek data={data} />
                <EventsByTypeChart data={data} />
                <Statistics data={data} startDate={oldestDate} endDate={newestDate} />
            </div>

            {/* <ol className="activity-list">
                {result.map(o => <Action key={o.id} {...o} />)}
            </ol> */}
            <DownloadLink data={result} />
        </div>
    );
}

export default App;
