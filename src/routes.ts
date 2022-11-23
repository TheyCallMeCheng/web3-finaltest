import { createCheerioRouter } from 'crawlee';
import { Actor } from 'apify';
import { BASE_URLS, labels } from './constants.js';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ log }) => {
    log.info(`Router reached...`);
});

router.addHandler(labels.START_W3, async ({ $, crawler }) => {
    const jobs = $('tr');

    for (const job of jobs) {
        const element = $(job);
        const titleElement = $(element.find('a[href]'));

        const urlJob = BASE_URLS.web3 + titleElement.attr('href');
        console.log(urlJob);

        await crawler.addRequests([{
            url: urlJob,
            label: labels.JOB,
            userData: {
                data: {
                    title: titleElement.first().text().trim(),
                    company: element.find('h3').first().text().trim(),
                    salaryRange: element.find('.text-salary').first().text().trim(),
                    location: element.find('.job-location-mobile a[href]').text().trim().split("\n\n")[1],
                    tags: element.find('span.my-badge a').text().trim().split("\n\n"),
                    applyUrl: urlJob
                },
            },
        }]);
    }
});

router.addHandler(labels.JOB, async ({ $, request }) => {
    const { data } = request.userData;
    console.log(data.title, data.company, data.salaryRange, data.tags);

    const element = $('div.text-dark-grey-text');
    const titleElement = element.find('h4');

    await Actor.pushData({
        ...data,
    });
});

router.addHandler(labels.START_REMOTE, async({ $, crawler, request }) => {
    const jobs = $('#odindex > div.bubble-element.RepeatingGroup.bubble-rg');
    console.log("Jobs: " + jobs.length);
    for (const job of jobs) {
        const element = $(job);
        console.log(element);
    }
})
