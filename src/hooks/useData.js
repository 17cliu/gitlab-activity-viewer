import { useState, useEffect } from 'react';
import { fetchUserEvents } from '../api';

export const FETCH_STATES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export default function useData({ host, userId, accessToken }) {
    const [result, setResult] = useState({ data: [], total: 0 });
    const [numItemsLoaded, setNumItemsLoaded] = useState(0);
    const [status, setStatus] = useState(FETCH_STATES.LOADING);
    // const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        setStatus(FETCH_STATES.LOADING);

        fetchUserEvents({ host, userId, accessToken }).then(initialResponse => {
            // TODO: reduce for testing
            const totalPages = Math.min(initialResponse.totalPages, 10);
            // const totalPages = initialResponse.totalPages;

            setResult(initialResponse);
            setNumItemsLoaded(initialResponse.data.length);

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
                console.log('attempting to fetch more pages:', pagesToFetch);

                const promises = pagesToFetch.map(async page => {
                    const thisResponse = await fetchUserEvents({
                        host,
                        userId,
                        accessToken,
                        queryOptions: { page }
                    });
                    setNumItemsLoaded(n => n + thisResponse.data.length);
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
                            console.log('Failed to fetch chunk of events!', i);
                            return memo;
                        }
                    }, { ...initialResponse });

                    setResult(newResult);
                    setStatus(FETCH_STATES.SUCCESS);
                });
            }
        });
    }, [host, userId, accessToken]);

    return {
        result,
        numItemsLoaded,
        status
    };
}
