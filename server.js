const dotenv = require('dotenv');
const OpenAI = require('openai');
const axios = require('axios');
const FormData = require('form-data');
const { PROMPTS } = require('./prompts');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chatGptModel = 'gpt-3.5-turbo-16k';

let tryCount = 0;

function getNowDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const categoriesWithId = [
  { name: 'Arts & Culture', id: 16, domains: ['hyperallergic.com', 'thisiscolossal.com', 'artnews.com'] },
  { name: 'Auto & Yatching', id: 20, domains: ['robbreport.com', 'yachtingworld.com', 'autoblog.com'] },
  { name: 'Aviation', id: 24, domains: ['flightglobal.com', 'aviationweek.com', 'avgeekery.com', 'flyingmag.com', 'simpleflying.com'] },
  { name: 'Business & Finance', id: 19, domains: ['insightssuccess.com', 'forbes.com', 'bmmagazine.co.uk', 'fortune.com', 'businessinsider.com'] },
  { name: 'Entertainment', id: 26, domains: ['hollywoodreporter.com', 'ew.com', 'variety.com', 'deadline.com', 'collider.com']},
  { name: 'Fashion', id: 13, domains: ['glamourandgains.com', 'luxuo.com']},
  { name: 'Food & Wine', id: 21, domains: [ 'foodandwine.com', 'epicurious.com', 'seriouseats.com', 'bonappetit.com']},
  { name: 'Health & Wellness', id: 17, domains: ['healthline.com', 'webmd.com', 'mayoclinic.org', 'verywellhealth.com', 'prevention.com']},
  { name: 'Home Design', id: 14, doamains: ['houzz.com', 'dwell.com', 'housebeautiful.com', 'design-milk.com',] },
  { name: 'Jewelry & Watches', id: 25, domains: ['jckonline.com', 'nationaljeweler.com', 'thejewelleryeditor.com', 'hodinkee.com', 'watchtime.com', 'jewellermagazine.com']},
  { name: 'Lifestyle', id: 12, domains: ['goop.com', 'theeverygirl.com', 'refinery29.com', 'manrepeller.com', 'apartmenttherapy.com', 'coveteur.com']},
  { name: 'People', id: 22, domains: ['people.com', 'usmagazine.com', 'pagesix.com', 'hollywoodlife.com',]},
  { name: 'Pets', id: 23, domains: ['petmd.com', 'petfinder.com', 'catster.com', 'dogster.com', 'vetstreet.com']},
  { name: 'Philanthropy', id: 18, domains: ['insidephilanthropy.com', 'alliancemagazine.org', 'geofunders.org', 'cep.org']},
  { name: 'Technology', id: 27, domains: ['techcrunch.com', 'theverge.com', 'wired.com', 'arstechnica.com']},
  { name: 'Travel', id: 15, domains: ['tripadvisor.com', 'lonelyplanet.com', 'expedia.com', 'kayak.com', 'travelandleisure.com']}
];

async function getNewsArticles() {
  try {
    const articles = await Promise.all(
      categoriesWithId.map(async (category) => {
        // Ensure domains is an array and use a default empty array if it's not defined
        const domains = Array.isArray(category.domains) ? category.domains.join(',') : '';
        
        // Construct the query with proper encoding
        const query = encodeURIComponent(
          `${category.name.toLowerCase()} -politics -"political" -"government" -"protest" -"democracy" -"election"`
        );

        // Format date correctly
        const fromDate = getNowDate();

        // Construct URL
        const url = `https://newsapi.org/v2/everything?q=${query}&domains=${domains}&apiKey=${process.env.NEWS_API_KEY}&pageSize=${process.env.NEWS_SIZE}&from=${fromDate}`;

        // console.log(`Fetching articles for category: ${category.name} with URL: ${url}`);

        const response = await axios.get(url);

        // Log full response for debugging
        console.log(`Response for category ${category.name}:`, response.data);

        if (response.data.status !== 'ok') {
          console.error(`Error fetching articles for category: ${category.name}. Status: ${response.data.status}`);
          return [];
        }

        return response.data.articles.map((article) => {
          article.categories = [category.id];
          return article;
        });
      })
    );

    const flattenedArticles = articles.flat();

    const uniqueArticles = {};

    const filteredArticles = flattenedArticles.filter((article) => {
      const titleKey = article.title.toLowerCase();

      if (!uniqueArticles[titleKey]) {
        uniqueArticles[titleKey] = [article.categories[0]];
        console.log(`Selected Article: "${article.title}" in category: ${categoriesWithId.find(c => c.id === article.categories[0])?.name}`);
        return true;
      } else if (!uniqueArticles[titleKey].includes(article.categories[0])) {
        return false; // Skip this article to prevent it from repeating in multiple categories
      }
      return false;
    });

    return filteredArticles.splice(0, 10); // Return the trimmed list
  } catch (error) {
    console.error('Error retrieving news articles:', error);
    return []; // Return an empty array in case of error
  }
}




async function changeArticleTitle(originalTitle, summary) {
  try {
    const response = await openai.chat.completions.create({
      model: chatGptModel,
      messages: [
        {
          role: 'user',
          content: `Rewrite the following article title to be similar but not the same:\n${originalTitle} and it should be related to this article: ${summary}\nNew Title:`
        }
      ],
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const newTitle = response.choices[0].message.content.trim();
    console.log(newTitle);
    return newTitle;
  } catch (error) {
    console.error('Error in changing article title:', error);
    return originalTitle;
  }
}

async function summarizeArticle(article) {
  const completion = await openai.chat.completions.create({
    model: chatGptModel,
    messages: [
      { role: 'user', content: PROMPTS.type_two(article) }
    ],
    temperature: 1,
    max_tokens: 6000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  let summary = completion.choices[0].message.content;

  const [newTitle, audioBuffer] = await Promise.all([
    changeArticleTitle(article.title, summary),
    textToSpeech(summary)
  ]);

  const uploadedMedia = await uploadAudioToWordPress(
    audioBuffer,
    `${newTitle.replace(/\s/g, '-')}-tts.mp3`
  );

  if (!uploadedMedia) {
    console.error('Error uploading audio to WordPress:', audioBuffer);
  }

  return {
    title: newTitle,
    content: `${summary}\n ${uploadedMedia?.url ? `
      <p class="has-text-align-center"><strong>Prefer to listen?</strong>&nbsp;No problem!&nbsp;We've created an audio version for your convenience.&nbsp;Press play and relax while you absorb the information.</p>
      <figure class="wp-block-audio"><audio controls src="${uploadedMedia?.url}"></audio></figure>` : ''}`,
    status: 'publish',
    imageUrl: article.urlToImage,
    categories: article.categories
  };
}

async function pushToWebhook(blogPost) {
  console.log('Pushing to Webhook started ===== ');
  try {
    const apiUrl = process.env.WEB_URL + '/wp-json/wp/v2/posts';

    const authHeader = {
      username: process.env.WEB_SITE_USERNAME,
      password: process.env.WEB_SITE_APPLICATION_KEY
    };

    const mediaId = await setFeaturedImage(blogPost.imageUrl);

    blogPost.featured_media = mediaId;

    const response = await axios.post(apiUrl, blogPost, { auth: authHeader });

    return response.data.id;
  } catch (error) {
    console.error('Error pushing blog post to webhook:', error.data);
    throw error;
  }
}

async function setFeaturedImage(imageUrl) {
  try {
    const authHeader = {
      username: process.env.WEB_SITE_USERNAME,
      password: process.env.WEB_SITE_APPLICATION_KEY
    };

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    const imageData = Buffer.from(response.data, 'binary');

    const formData = new FormData();
    formData.append('file', imageData, 'image.jpg');

    const uploadUrl = `${process.env.WEB_URL}/wp-json/wp/v2/media`;

    const uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      },
      auth: authHeader
    });

    return uploadResponse.data.id;
  } catch (error) {
    console.error('Error setting featured image:', error);
  }
}

async function generateNewsFeed() {
  console.log({ tryCount });
  try {
    const newInterval = setInterval(async () => {
      console.log('processing news feed generation');
    }, 2000);

    const newsArticles = await getNewsArticles();

    const summaries = await summarizeArticlesWithIntervals(newsArticles);

    await Promise.all(
      summaries.map(async (summary) => {
        await pushToWebhook(summary);
      })
    );

    clearInterval(newInterval);

    console.log('Blog post successfully pushed to webhook');
  } catch (error) {
    console.error('Error generating news feed:', error);
    if (tryCount <= 2) {
      generateNewsFeed();
      tryCount++;
    }
  }
}

async function summarizeArticlesWithIntervals(articles) {
  const summarizedArticles = [];

  console.time();
  console.log('summarizeArticlesWithIntervals started ===== ');

  try {
    await Promise.all(
      articles.map(async (article) => {
        const summary = await summarizeArticle(article);
        summarizedArticles.push(summary);
      })
    );
  } catch (error) {
    console.error('error occurred at summarizeArticlesWithIntervals : ', error);
  }

  console.log('summarizeArticlesWithIntervals completed ===== ');
  console.timeEnd();

  console.log({ summarizedArticles });

  return summarizedArticles;
}

async function textToSpeech(text) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return buffer;
  } catch (error) {
    console.error('textToSpeech error :', error);
  }
}

async function uploadAudioToWordPress(audioBuffer, fileName) {
  try {
    const authHeader = {
      username: process.env.WEB_SITE_USERNAME,
      password: process.env.WEB_SITE_APPLICATION_KEY
    };

    const formData = new FormData();
    formData.append('file', audioBuffer, fileName);

    const uploadUrl = `${process.env.WEB_URL}/wp-json/wp/v2/media`;

    const uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      },
      auth: authHeader
    });

    console.log(uploadResponse);

    return uploadResponse.data;
  } catch (error) {
    console.error('Error uploading audio to WordPress:', error);
  }
}


async function test() {
  try {
    const articles = await getNewsArticles();
    if (!articles || articles.length === 0) {
      console.log('No articles available');
      return;
    }

    const summaries = await summarizeArticlesWithIntervals(articles.slice(0, 2));

    await Promise.all(
      summaries.map(async (summary) => {
        await pushToWebhook(summary);
      })
    );

    console.log('Blog post successfully pushed to webhook');
  } catch (error) {
    console.error('Error in test function:', error);
  }
}

// async function test() {
//   const articles = await getNewsArticles();
//   console.log('articles', articles);
//   const summaries = await summarizeArticlesWithIntervals(articles.slice(0, 2));
//   console.log('summaries', summaries);
// }

// test();

module.exports = {
  generateNewsFeed,
  getNewsArticles
};