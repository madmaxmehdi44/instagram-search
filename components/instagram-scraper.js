const { ApifyClient } = require('apify-client');

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_nkunMGfYpGFRtmsEfyaofLQ2VdIyog3kaI3H',
});

// Prepare actor input
const input = {
    "directUrls": [
        "https://www.instagram.com/medfoxi/"
    ],
    "resultsType": "posts", //"posts", "comments", "details", "stories"
    "resultsLimit": 5,
    "searchType": "hashtag", //"user", "hashtag", "place", "stories"
    "searchLimit":3,
    "proxy": {
        "useApifyProxy": true,
        "apifyProxyGroups": [
            "RESIDENTIAL"
        ]
    },
    "likedByLimit": 0,
    "followingLimit": 0,
    "followedByLimit": 0,
    "extendOutputFunction": async ({ data, item, helpers, page, customData, label }) => {
      return item;
    },
    "extendScraperFunction": async ({ page, request, label, response, helpers, requestQueue, logins, addProfile, addPost, addLocation, addHashtag, doRequest, customData, Apify }) => {
     
    },
    "customData": {}
};

(async () => {
    // Run the actor and wait for it to finish
    console.log("Please wait..." )
    const run = await client.actor("jaroslavhejlek/instagram-scraper").call(input);

    // Fetch and print actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        console.dir(item);
    });
})();
