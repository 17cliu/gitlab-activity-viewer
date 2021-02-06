import { useState, useEffect } from 'react';
import { fetchUser, fetchUserEvents } from '../api';

export const FETCH_STATES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export default function useData({ host, username, accessToken }) {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState({ data: [], total: 0 });
    const [numEventsLoaded, setNumEventsLoaded] = useState(0);
    const [status, setStatus] = useState(FETCH_STATES.LOADING);
    // const [error, setError] = useState(null);

    // First, fetch the user
    useEffect(() => {
        setStatus(FETCH_STATES.LOADING);

        fetchUser({ host, username, accessToken })
            .then(setUser)
            .catch(err => {
                console.warn('Could not fetch user', err);
                setUser(null);
                setStatus(FETCH_STATES.ERROR);
            });
    }, [host, username, accessToken]);

    // Next, fetch the user's data
    useEffect(() => {
        if (!user) return;

        setStatus(FETCH_STATES.LOADING);

        fetchUserEvents({ host, userId: user.id, accessToken }).then(initialResponse => {
            // TODO: reduce for testing
            const totalPages = Math.min(initialResponse.totalPages, 10);
            // const totalPages = initialResponse.totalPages;

            setEvents(initialResponse);
            setNumEventsLoaded(initialResponse.data.length);

            if (!initialResponse.nextPage) {
                // This is all the data there is!
                setStatus(FETCH_STATES.SUCCESS);
            } else {
                // Fetch the remaining pages.

                // Array(n) generates [0, 1, 2, ... n-1]. Because page numbers are
                // 1-indexed, we generate `totalPages + 1` numbers, then slice off
                // the 0. We also slice off the 1, because we already fetched the
                // first page.
                const pagesToFetch = [...Array(totalPages + 1).keys()].slice(2);
                console.log('Attempting to fetch more pages:', pagesToFetch);

                const promises = pagesToFetch.map(async page => {
                    const thisResponse = await fetchUserEvents({
                        host,
                        userId: user.id,
                        accessToken,
                        queryOptions: { page }
                    });
                    setNumEventsLoaded(n => n + thisResponse.data.length);
                    return thisResponse;
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
                            // TODO: Tell user that some data is missing!
                            console.log('Failed to fetch chunk of events!', i);
                            return memo;
                        }
                    }, { ...initialResponse });

                    setEvents(newResult);
                    setStatus(FETCH_STATES.SUCCESS);
                });
            }
        }).catch(err => {
            console.warn('Caught error in useData!', err);
            setStatus(FETCH_STATES.ERROR);
        });
    }, [host, user, accessToken]);

    return {
        user,
        events,
        numEventsLoaded,
        status
    };
}
