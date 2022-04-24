const { ApifyClient } = require("apify-client");

export async function InstagramScraper() {
  // Initialize the ApifyClient with API token
  const client = new ApifyClient({
    token: "apify_api_nkunMGfYpGFRtmsEfyaofLQ2VdIyog3kaI3H",
  });

  // Prepare actor input
  const input = {
    directUrls: ["https://www.instagram.com/developerapiman/"],
    resultsType: "details", //"posts", "comments", "details", "stories"
    resultsLimit: 1,
    searchType: "hashtag", //"user", "hashtag", "place", "stories"
    searchLimit: 1,
    proxy: {
      useApifyProxy: true,
      apifyProxyGroups: ["RESIDENTIAL"],
    },
    likedByLimit: 0,
    followingLimit: 0,
    followedByLimit: 0,
    extendOutputFunction: async ({
      data,
      item,
      helpers,
      page,
      customData,
      label,
    }) => {
      return item;
    },
    extendScraperFunction: async ({
      page,
      request,
      label,
      response,
      helpers,
      requestQueue,
      logins,
      addProfile,
      addPost,
      addLocation,
      addHashtag,
      doRequest,
      customData,
      Apify,
    }) => {},
    customData: {},
  };
  // Run the actor and wait for it to finish
  console.log("Please wait...");
  const run = await client
    .actor("jaroslavhejlek/instagram-scraper")
    .call(input);

  // Fetch and print actor results from the run's dataset (if any)
  // console.log("Results from dataset");
  const instagramScraper=[];

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
   items.forEach((item) => {
     console.dir(item);
     //return;
    //  instagramScraper.push(item)
    //  item.json();
   });

  return items;
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}
