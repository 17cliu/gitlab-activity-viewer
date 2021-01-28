async function fetchData(options) {
    // TODO: ah what naive url concat you have
    const baseUrl = `https://${options.host}/api/v4`;
    const userId = options.userId;
    const query = new URLSearchParams({
        per_page: 100,
        ...options.queryOptions
    });

    const response = await fetch(`${baseUrl}/users/${userId}/events?${query.toString()}`, {
        headers: {
            'PRIVATE-TOKEN': options.accessToken // process.env.REACT_APP_GITLAB_TOKEN,
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
