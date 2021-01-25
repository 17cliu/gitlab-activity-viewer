
import testData from './data.json';

const PAGE_SIZE = 100;
const LAST_PAGE = Math.ceil(testData.length / PAGE_SIZE);

function fetchData(queryOptions) {
    let page = 1;
    let startingIndex = 0;
    let endingIndex = PAGE_SIZE;

    if (queryOptions) {
        page = queryOptions.page;
        startingIndex = (page - 1) * PAGE_SIZE;
        endingIndex = page * PAGE_SIZE;
    }

    console.log(`sending data for page ${page}: ${startingIndex}-${endingIndex}`);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                total: testData.length,
                totalPages: LAST_PAGE,
                nextPage: page + 1 > LAST_PAGE ? '' : page + 1,
                data: testData.slice(startingIndex, endingIndex)
            });
        }, 500);
    });
}

export default fetchData;
