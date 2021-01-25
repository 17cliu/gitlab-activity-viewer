async function fetchData(queryOptions) {
    const baseUrl = 'https://git.transmissionmedia.ca/api/v4';
    const userId = 4;
    const query = new URLSearchParams({
        // page: 894,
        per_page: 100,
        ...queryOptions
    });

    const response = await fetch(`${baseUrl}/users/${userId}/events?${query.toString()}`, {
        headers: {
            'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_TOKEN,
        }
    });

    const body = await response.json();
    const headers = response.headers;
    const nextPage = headers.get('x-next-page');
    const total = Number(headers.get('x-total'));
    const totalPages = Number(headers.get('x-total-pages'));

    return {
        total,
        totalPages,
        nextPage,
        data: body,
    };
}

export default fetchData;
