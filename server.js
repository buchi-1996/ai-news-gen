const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const FormData = require('form-data');
const { PROMPTS } = require('./prompts');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let tryCount = 0;

function getNowDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 14); // 14 days ago as requested

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Luxury-focused search terms for different categories
const luxurySearchTerms = {
    'Arts & Culture': ['luxury art', 'premium galleries', 'exclusive exhibitions', 'high-end auctions'],
    'Auto & Yachting': ['luxury cars', 'superyachts', 'Mercedes', 'Bentley', 'Ferrari', 'yacht charters'],
    'Aviation': ['private jets', 'luxury aviation', 'business jets', 'premium airlines'],
    'Business & Finance': ['luxury investments', 'high-net-worth', 'wealth management', 'luxury markets'],
    'Entertainment': ['luxury entertainment', 'exclusive events', 'premium experiences', 'celebrity lifestyle'],
    'Fashion': ['luxury fashion', 'haute couture', 'designer brands', 'premium fashion'],
    'Food & Wine': ['fine dining', 'luxury restaurants', 'premium wine', 'Michelin star'],
    'Health & Wellness': ['luxury wellness', 'premium spa', 'exclusive health', 'luxury fitness'],
    'Home Design': ['luxury homes', 'mansions', 'premium interior', 'luxury real estate'],
    'Jewelry & Watches': ['luxury watches', 'premium jewelry', 'Rolex', 'diamonds', 'luxury timepieces'],
    'Lifestyle': ['luxury lifestyle', 'premium living', 'exclusive experiences', 'luxury travel'],
    'People': ['luxury personalities', 'wealthy celebrities', 'billionaire lifestyle', 'luxury influencers'],
    'Pets': ['luxury pets', 'premium pet care', 'expensive pets', 'luxury pet products'],
    'Philanthropy': ['luxury philanthropy', 'wealthy donors', 'exclusive charity', 'premium giving'],
    'Technology': ['luxury tech', 'premium gadgets', 'expensive technology', 'luxury innovation'],
    'Travel': ['luxury travel', 'premium destinations', 'exclusive resorts', 'luxury hotels']
};

const categoriesWithId = [
    { name: 'Arts & Culture', id: 16 },
    { name: 'Auto & Yachting', id: 20 },
    { name: 'Aviation', id: 24 },
    { name: 'Business & Finance', id: 19 },
    { name: 'Entertainment', id: 26 },
    { name: 'Fashion', id: 13 },
    { name: 'Food & Wine', id: 21 },
    { name: 'Health & Wellness', id: 17 },
    { name: 'Home Design', id: 14 },
    { name: 'Jewelry & Watches', id: 25 },
    { name: 'Lifestyle', id: 12 },
    { name: 'People', id: 22 },
    { name: 'Pets', id: 23 },
    { name: 'Philanthropy', id: 18 },
    { name: 'Technology', id: 27 },
    { name: 'Travel', id: 15 }
];

// Store processed articles to avoid duplicates
const processedArticles = new Set();

async function getNewsArticles() {
    try {
        const articles = await Promise.all(
            categoriesWithId.map(async (category) => {
                const searchTerms = luxurySearchTerms[category.name] || ['luxury'];

                // Use one random search term from the category
                const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

                const query = encodeURIComponent(
                    `${randomTerm} -politics -"political" -"government" -"protest" -"democracy" -"election"`
                );

                const fromDate = getNowDate();

                const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}&pageSize=${process.env.NEWS_SIZE || 5}&from=${fromDate}&sortBy=publishedAt&language=en`;

                console.log(`Fetching luxury articles for category: ${category.name} with term: ${randomTerm}`);

                const response = await axios.get(url);

                if (response.data.status !== 'ok') {
                    console.error(`Error fetching articles for category: ${category.name}. Status: ${response.data.status}`);
                    return [];
                }

                return response.data.articles
                    .filter(article => {
                        // Check if we've already processed this article (by URL or title)
                        const articleKey = `${article.url}-${article.title}`;
                        if (processedArticles.has(articleKey)) {
                            return false;
                        }
                        processedArticles.add(articleKey);
                        return true;
                    })
                    .map((article) => {
                        article.categories = [category.id];
                        article.categoryName = category.name;
                        return article;
                    });
            })
        );

        const flattenedArticles = articles.flat();

        // Further deduplicate by title similarity
        const uniqueArticles = [];
        const seenTitles = new Set();

        flattenedArticles.forEach(article => {
            const normalizedTitle = article.title.toLowerCase().replace(/[^\w\s]/g, '');
            if (!seenTitles.has(normalizedTitle)) {
                seenTitles.add(normalizedTitle);
                uniqueArticles.push(article);
                console.log(`Selected Article: "${article.title}" in category: ${article.categoryName}`);
            }
        });

        return uniqueArticles.slice(0, 10); // Return top 10 unique articles
    } catch (error) {
        console.error('Error retrieving news articles:', error);
        return [];
    }
}

async function changeArticleTitle(originalTitle, summary, categoryName) {
    try {
        const prompt = `You are an expert luxury content editor. Create ONE compelling, luxury-focused title for this article. Do not provide options or multiple choices.

REQUIREMENTS:
- Make it engaging and premium-focused
- Emphasize exclusivity, sophistication, or luxury appeal
- Keep it concise but impactful
- Match the luxury tone of the content
- Focus on the category: ${categoryName}

Original Title: ${originalTitle}

Article Summary: ${summary}

Generate ONE final title only (no options, no explanations):`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let newTitle = response.text().trim();

        // Clean up any unwanted formatting or prefixes
        newTitle = newTitle.replace(/^(Title:|New Title:|Final Title:)/i, '').trim();
        newTitle = newTitle.replace(/^["']|["']$/g, ''); // Remove quotes if present
        
        // If the AI still provides options despite instructions, take the first one
        if (newTitle.includes('\n') || newTitle.includes('Option')) {
            newTitle = newTitle.split('\n')[0].trim();
            newTitle = newTitle.replace(/^Option \d+[:\-\.]?\s*/i, '').trim();
        }

        console.log('Generated Title:', newTitle);
        return newTitle;
    } catch (error) {
        console.error('Error in changing article title:', error);
        return originalTitle;
    }
}

async function summarizeArticle(article) {
    try {
        const result = await model.generateContent(PROMPTS.luxury_focused(article));
        const response = await result.response;
        const summary = response.text();

        const newTitle = await changeArticleTitle(article.title, summary, article.categoryName);

        return {
            title: newTitle,
            content: summary,
            status: 'publish',
            imageUrl: article.urlToImage,
            categories: article.categories,
            sourceUrl: article.url,
            originalTitle: article.title
        };
    } catch (error) {
        console.error('Error summarizing article:', error);
        throw error;
    }
}

async function pushToWebhook(blogPost) {
    console.log('Pushing to Webhook started =====');
    try {
        const apiUrl = process.env.WEB_URL + '/wp-json/wp/v2/posts';

        const authHeader = {
            username: process.env.WEB_SITE_USERNAME,
            password: process.env.WEB_SITE_APPLICATION_KEY
        };

        let mediaId = null;
        if (blogPost.imageUrl) {
            mediaId = await setFeaturedImage(blogPost.imageUrl);
            blogPost.featured_media = mediaId;
        }

        // Add source attribution to content
        blogPost.content += `\n\n<p><em>Credit(s): <strong><a class="credit" href="${blogPost.sourceUrl}" target="_blank" rel="noopener">${blogPost.originalTitle}</a></strong></em></p>`;

        const response = await axios.post(apiUrl, blogPost, { auth: authHeader });
        console.log('Blog post successfully pushed to webhook');
        return response.data.id;
    } catch (error) {
        console.error('Error pushing blog post to webhook:', error);
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
        return null;
    }
}

async function generateNewsFeed() {
    console.log({ tryCount });
    try {
        const newInterval = setInterval(async () => {
            console.log('processing luxury news feed generation');
        }, 2000);

        const newsArticles = await getNewsArticles();
        console.log(`Found ${newsArticles.length} unique luxury articles`);

        const summaries = await summarizeArticlesWithIntervals(newsArticles);

        await Promise.all(
            summaries.map(async (summary) => {
                await pushToWebhook(summary);
            })
        );

        clearInterval(newInterval);

        console.log('Luxury blog posts successfully pushed to webhook');
    } catch (error) {
        console.error('Error generating luxury news feed:', error);
        if (tryCount <= 2) {
            generateNewsFeed();
            tryCount++;
        }
    }
}

async function summarizeArticlesWithIntervals(articles) {
    const summarizedArticles = [];

    console.time();
    console.log('summarizeArticlesWithIntervals started =====');

    try {
        await Promise.all(
            articles.map(async (article) => {
                const summary = await summarizeArticle(article);
                summarizedArticles.push(summary);
            })
        );
    } catch (error) {
        console.error('error occurred at summarizeArticlesWithIntervals: ', error);
    }

    console.log('summarizeArticlesWithIntervals completed =====');
    console.timeEnd();

    console.log({ summarizedArticles });

    return summarizedArticles;
}

async function test() {
    try {
        const articles = await getNewsArticles();
        if (!articles || articles.length === 0) {
            console.log('No luxury articles available');
            return;
        }

        console.log(`Testing with ${articles.length} luxury articles`);
        const summaries = await summarizeArticlesWithIntervals(articles.slice(0, 2));

        await Promise.all(
            summaries.map(async (summary) => {
                await pushToWebhook(summary);
            })
        );

        console.log('Test luxury blog posts successfully pushed to webhook');
    } catch (error) {
        console.error('Error in test function:', error);
    }
}

module.exports = {
    generateNewsFeed,
    getNewsArticles,
    test
};