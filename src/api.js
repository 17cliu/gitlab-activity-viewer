function fetchData() {
    const baseUrl = 'https://git.transmissionmedia.ca/api/v4';
    const userId = 4;
    const query = new URLSearchParams({
        per_page: 5,
        // page: 894
    });

    return fetch(`${baseUrl}/users/${userId}/events?${query.toString()}`, {
        headers: {
            'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_TOKEN,
        }
    }).then(response => {
        const body = response.json();
        const headers = response.headers;

        for (const pair of headers.entries()) {
            console.log(`${pair[0]}: ${pair[1]} ${typeof pair[1]}`);
        }

        return body;
    });
}

export default fetchData;
