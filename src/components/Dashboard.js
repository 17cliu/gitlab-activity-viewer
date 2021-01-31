import { useEffect, useState } from 'react';
// import Action from './Action';
import { fetchUser } from '../mockApi';
import useData, { FETCH_STATES } from '../hooks/useData';
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

function Dashboard({ host, username, accessToken }) {
    const [user, setUser] = useState(null);

    // On app load, fetch user details
    useEffect(() => {
        // TODO: handle user not found error
        fetchUser({ host, username, accessToken }).then(setUser);
    }, [host, username, accessToken]);

    const {
        result,
        numItemsLoaded,
        status
    } = useData({ host, userId: user ? user.id : null, accessToken });

    const { data, total } = result;

    if (status === FETCH_STATES.LOADING) {
        return <Loader current={numItemsLoaded} total={total} />;
    }

    if (status === FETCH_STATES.ERROR) {
        return (
            <div className="dashboard">
                <p>Something went wrong :(</p>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="dashboard">
                <p>No activity found for @{user.username} :(</p>
            </div>
        );
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
        <div className="dashboard">
            <h2>@{user.username}</h2>

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
