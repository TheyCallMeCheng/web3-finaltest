import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';
import { router } from './routes.js';
import { BASE_URL, labels, BASE_URLS } from './constants.js';

// Initialize the Apify SDK
await Actor.init();

const crawler = new CheerioCrawler({
    requestHandler: router,
});

// await crawler.addRequests([{
//     url: `${BASE_URLS.web3}/remote-jobs`,
//     label: labels.START_W3,
// }]);

await crawler.addRequests([{
    url: `${BASE_URLS.remote3}/web3-jobs`,
    label: labels.START_REMOTE
}])


await crawler.run();

// Exit successfully
await Actor.exit();
