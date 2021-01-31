export async function fetchUser(options) {
    const { host, username, accessToken } = options;
    const url = new URL(`https://${host}/api/v4/users?username=${username}`);
    const fetchOptions = {};

    if (accessToken) {
        // This endpoint is publicly available for gitlab.com, so we only
        // need to pass an access token if we're accessing a private self-hosted
        // instance of GitLab.
        fetchOptions.headers = {
            'PRIVATE-TOKEN': accessToken
        };
    }

    const response = await fetch(url, fetchOptions);
    const users = await response.json();

    if (users.length) {
        return users[0];
    } else {
        throw new Error('User not found');
    }
}

export async function fetchUserEvents(options) {
    const { host, userId, accessToken } = options;
    const query = new URLSearchParams({
        per_page: 100,
        ...options.queryOptions
    });
    const url = new URL(`https://${host}/api/v4/users/${userId}/events?${query.toString()}`);

    const response = await fetch(url, {
        headers: {
            'PRIVATE-TOKEN': accessToken || process.env.REACT_APP_GITLAB_COM_TOKEN,
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
