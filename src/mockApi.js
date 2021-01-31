
import testData from './datalarge.json';

console.log(`Using local data with ${testData.length} items`);

const PAGE_SIZE = 100;
const LAST_PAGE = Math.ceil(testData.length / PAGE_SIZE);

export async function fetchUser(options) {
    const { host, username } = options;
    const url = new URL(`https://${host}/api/v4/users?username=${username}`);
    console.log(`If this were real, I'd be contacting ${url}`);
    return new Promise((resolve, reject) => {
        const isSuccess = Math.random() > 0.3;

        if (isSuccess) {
            setTimeout(() => {
                const data = {
                    id: 4,
                    name: 'Mock User',
                    username,
                };
                resolve(data);
            }, 1000);
        } else {
            reject(new Error('User not found'));
        }
    });
}

export function fetchUserEvents(options) {
    let page = 1;
    let startingIndex = 0;
    let endingIndex = PAGE_SIZE;

    if (options.queryOptions) {
        page = options.queryOptions.page;
        startingIndex = (page - 1) * PAGE_SIZE;
        endingIndex = page * PAGE_SIZE;
    }

    // console.log(`sending data for page ${page}: ${startingIndex}-${endingIndex}`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3;

            if (isSuccess) {
                const data = {
                    total: testData.length,
                    totalPages: LAST_PAGE,
                    nextPage: page + 1 > LAST_PAGE ? '' : page + 1,
                    data: testData.slice(startingIndex, endingIndex)
                };
                resolve(data);
            } else {
                reject(new Error('No data 4 u'));
            }
        }, 1000);
    });
}
