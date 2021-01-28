import { useEffect, useState } from 'react';
// import Action from './Action';
import fetchData from '../api';
import {
    floorDateToClosestSunday,
    formatLongDate,
    formatIsoDate,
    generateDateStampsInRange
} from '../utils';
import EventsByDayOfWeek from './EventsByDayOfWeekChart';
import EventsByTypeChart from './EventsByTypeChart';
import DownloadLink from './DownloadLink';
import Loader from './Loader';
import Tapestry from './Tapestry';
import Statistics from './Statistics';

function Dashboard({ host, userId, accessToken }) {
    const [result, setResult] = useState({ data: [], total: 0 });
    const [numItemsFetched, setNumItemsFetched] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // On app load, fetch all data
    useEffect(() => {
        fetchData({ host, userId, accessToken }).then(initialResponse => {
            setResult(initialResponse);
            setNumItemsFetched(initialResponse.data.length);
            console.log('got first page', initialResponse);

            if (!initialResponse.nextPage) {
                // This is all the data there is!
                setIsLoading(false);
            } else {
                // Fetch the remaining pages.

                // TODO: reduce for testing
                initialResponse.totalPages = Math.min(initialResponse.totalPages, 10);

                // Array(n) generates [0, 1, 2, ... n-1]. Because page numbers are
                // 1-indexed, we generate `totalPages + 1` numbers, then slice off
                // the 0. We also slice off the 1, because we already fetched the
                // first page.
                const pagesToFetch = [...Array(initialResponse.totalPages + 1).keys()].slice(2);
                console.log('attempting to fetch more pages:', pagesToFetch);

                const promises = pagesToFetch.map(async page => {
                    // await new Promise(resolve => setTimeout(resolve, Math.random() * 10000));
                    const data = await fetchData({
                        host,
                        userId,
                        accessToken,
                        queryOptions: { page }
                    });
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
    }, [host, userId, accessToken]);

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
        const d = formatIsoDate(new Date(o.created_at));
        countsByDay[d]++;
    });

    const tapestryCells = Object.keys(countsByDay).reverse().map(s => ({
        label: s,
        count: countsByDay[s]
    }));

    return (
        <div>
            <p>
                Showing <b>{data.length} events</b> from {
                    formatLongDate(oldestDate)} to {formatLongDate(newestDate)}.
            </p>

            <Tapestry cells={tapestryCells} startDate={oldestDate} />

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

export default Dashboard;
