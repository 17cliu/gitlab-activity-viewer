async function fetchData(queryOptions) {
    const baseUrl = 'https://git.transmissionmedia.ca/api/v4';
    const userId = 4;
    const query = new URLSearchParams({
        // page: 894,
        per_page: 20,
        ...queryOptions
    });

    const response = await fetch(`${baseUrl}/users/${userId}/events?${query.toString()}`, {
        headers: {
            'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_TOKEN,
        }
    });

    const headers = response.headers;
    const nextPage = headers.get('x-next-page');
    // const totalItems = headers.get('x-total');
    // const totalPages = headers.get('x-total-pages');

    let body = await response.json();

    // TODO: Temporarily limit to only two pages to avoid overloading site
    if (nextPage && Number(nextPage) < 3) {
        await setTimeout(() => {}, 100);
        body = body.concat(await fetchData({ page: nextPage }));
    }

    return body;
}

export default fetchData;
