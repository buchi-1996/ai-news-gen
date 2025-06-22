// const { samplePost1 } = require('./sampleContent');

// function generatePrompt(article, category) {
//   let categorySpecificInstructions;

//   switch (category) {
//     case 'Arts & Culture':
//       categorySpecificInstructions = `Focus on the luxury and cultural significance of the art world, highlighting exclusive events, high-end galleries, premium auctions, and influential collectors. Emphasize the intersection of wealth, culture, and artistic expression.`;
//       break;
//     case 'Auto & Yachting':
//       categorySpecificInstructions = `Highlight luxury automotive and yachting experiences, focusing on premium brands, exclusive models, cutting-edge technology, and the lifestyle associated with high-end vehicles and superyachts.`;
//       break;
//     case 'Aviation':
//       categorySpecificInstructions = `Focus on private aviation, luxury airlines, premium aircraft, and the exclusive world of high-end air travel, including business jets and first-class experiences.`;
//       break;
//     case 'Business & Finance':
//       categorySpecificInstructions = `Emphasize luxury investments, wealth management, high-net-worth individuals, premium financial services, and the intersection of business success and luxury lifestyle.`;
//       break;
//     case 'Entertainment':
//       categorySpecificInstructions = `Focus on luxury entertainment experiences, exclusive events, premium venues, celebrity lifestyle, and high-end entertainment offerings.`;
//       break;
//     case 'Fashion':
//       categorySpecificInstructions = `Highlight luxury fashion brands, haute couture, designer collections, premium materials, and the exclusive world of high-end fashion and style.`;
//       break;
//     case 'Food & Wine':
//       categorySpecificInstructions = `Focus on fine dining, luxury restaurants, premium wines, exclusive culinary experiences, Michelin-starred establishments, and gourmet lifestyle.`;
//       break;
//     case 'Health & Wellness':
//       categorySpecificInstructions = `Emphasize luxury wellness experiences, premium spa treatments, exclusive health retreats, high-end fitness facilities, and luxury approach to health and wellbeing.`;
//       break;
//     case 'Home Design':
//       categorySpecificInstructions = `Focus on luxury real estate, mansion designs, premium interior design, exclusive home features, and high-end residential architecture and lifestyle.`;
//       break;
//     case 'Jewelry & Watches':
//       categorySpecificInstructions = `Highlight luxury timepieces, premium jewelry, exclusive collections, rare gems, master craftsmanship, and the world of high-end accessories.`;
//       break;
//     case 'Lifestyle':
//       categorySpecificInstructions = `Focus on luxury living, premium experiences, exclusive lifestyle choices, high-end services, and the sophisticated approach to modern living.`;
//       break;
//     case 'People':
//       categorySpecificInstructions = `Emphasize luxury personalities, wealthy individuals, exclusive social circles, premium lifestyle choices, and the intersection of success and luxury living.`;
//       break;
//     case 'Pets':
//       categorySpecificInstructions = `Focus on luxury pet care, premium pet products, exclusive pet services, expensive breeds, and the high-end approach to pet ownership.`;
//       break;
//     case 'Philanthropy':
//       categorySpecificInstructions = `Highlight luxury philanthropy, wealthy donors, exclusive charitable events, premium giving experiences, and the intersection of wealth and social impact.`;
//       break;
//     case 'Technology':
//       categorySpecificInstructions = `Focus on luxury technology, premium gadgets, exclusive tech experiences, high-end innovations, and the sophisticated approach to technology adoption.`;
//       break;
//     case 'Travel':
//       categorySpecificInstructions = `Emphasize luxury travel experiences, premium destinations, exclusive resorts, high-end accommodations, and sophisticated travel lifestyle.`;
//       break;
//     default:
//       categorySpecificInstructions = 'Focus on the luxury and premium aspects of the topic.';
//   }

//   return categorySpecificInstructions;
// }

// const PROMPTS = {
//   type_one: (article, category) => {
//     const samplePostExcerpt = `${samplePost1}`;
//     const instructions = `Using the style and structure of the above sample posts, create a blog article that first summarizes the content of the following article and then discusses how its themes relate to the jobs of the future. The blog post should be engaging and thought-provoking, aiming to retain the reader's interest throughout. It should provide not only a summary but also insightful elaboration on key points. Include relevant analogies, examples, and personal insights to make the content more relatable and share-worthy. The blog should encourage the reader to think deeply about the subject and feel compelled to share it for its value. The article should be less than 1500 words with minimal sub-headings. note: don't include Blog Title, Summary or Blog Content at start of summary or body of summary, i only need the content.`;

//     const categoryInstructions = generatePrompt(article, category);

//     return `${samplePostExcerpt}\n\n${instructions}\n\n${categoryInstructions}`;
//   },

//   type_two: (article, category) => {
//     const instruction = `Please rewrite the following article based on the enhanced instructions provided:

// The article's topic is "${article.title}". The target audience includes a diverse group of readers interested in staying informed about the latest trends and insights across various fields.

// Provide a brief outline of the central theme and main ideas, ensuring alignment with the interests of a broad audience.

// Develop an engaging opening paragraph that sets the tone and introduces the subject matter in a compelling way.

// Structure the article into at least four coherent paragraphs, incorporating real-life examples, case studies, and research findings. Ensure a seamless flow of ideas.

// Infuse the article with insights and personal anecdotes, reflecting extensive knowledge and experience.

// Conclude the article with a powerful and memorable ending, avoiding cliché phrases like 'in conclusion.' Opt for a creative transition into the final thoughts, which could be a call to action, a provocative question, or a compelling statement.

// Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.

// Note: the final content should not be structured like , Topic and Audience Understanding:, Logical Body Development: etc. just return the content (it'll be used as the article body), also don't include a title, only the content is needed `;
    
//     const categoryInstructions = generatePrompt(article, category);

//     return `Article description: ${article.description}, Article content: ${article.content}. ${instruction}\n\n${categoryInstructions}`;
//   },

//   luxury_focused: (article) => {
//     const categoryInstructions = generatePrompt(article, article.categoryName);
    
//     return `You are a luxury lifestyle writer. Based on the following article, create an engaging blog post that focuses specifically on the luxury and premium aspects of the topic.

// ARTICLE DETAILS:
// Title: "${article.title}"
// Description: "${article.description}"
// Content: "${article.content}"
// Source URL: "${article.url}"

// INSTRUCTIONS:
// 1. Write from a luxury lifestyle perspective, focusing on premium, exclusive, and high-end aspects
// 2. ${categoryInstructions}
// 3. Create an engaging narrative that appeals to affluent readers
// 4. Include 2-3 direct quotes from the original article, properly formatted with quotation marks
// 5. After each quote, mention the source (use format: "according to [source publication]" or "as reported by [source]")
// 6. Structure the article with 4-5 well-developed paragraphs
// 7. Use sophisticated language appropriate for luxury-focused content
// 8. Avoid generic conclusions - end with a compelling statement or thought-provoking insight
// 9. Do not include a title - only return the article content
// 10. Ensure the content feels fresh and original while incorporating the source material

// TONE: Sophisticated, engaging, and focused on luxury lifestyle aspects
// LENGTH: 800-1200 words
// FORMAT: Return only the article content without any headers or structural labels

// Remember to weave in the quotes naturally and always attribute them to their source. Focus on what makes this topic relevant and interesting to readers who appreciate luxury and premium experiences.`;
//   },

//   type_three: (article, category) => {
//     const categoryInstructions = generatePrompt(article, category);

//     return `The article's topic is "${article.title}". The target audience includes a broad spectrum of readers who are interested in how new technologies and trends are shaping various aspects of life and work.

// The central theme of this article should explore how the featured technology or trend is shaping the future. Focus on providing a forward-looking, optimistic perspective on the new and exciting opportunities that are emerging as a result of this trend.

// Begin with an engaging opening paragraph that highlights the rapid pace of change and the significant impact it is having. Use this as a hook to draw the reader in and set the stage for the article's key insights.

// In the body of the article, delve into real-world examples and case studies that illustrate how this technology or trend is already being applied in various contexts. Discuss the new types of opportunities and roles that are being created, as well as existing ones that are being transformed or augmented. Be sure to highlight the unique skills and qualifications that will be in high demand.

// Incorporate research findings, expert opinions, and personal anecdotes to add depth and credibility to your analysis. Weave a cohesive narrative that explores both the near-term and long-term implications of this trend for the future.

// Conclude the article with a powerful statement that leaves the reader feeling inspired and optimistic about the possibilities enabled by this emerging trend. Consider ending with a call to action that encourages the audience to start preparing for these new opportunities.

// Maintain a sophisticated yet accessible tone throughout, providing insightful commentary that informs and engages a diverse audience.
// Do not use words like "In conclusion" or "In summary" in article.

// ${categoryInstructions}
// `;
//   }
// };

// module.exports = {
//   PROMPTS
// };






const { OPTIMIZED_SAMPLES } = require('./optimizedSampleContent');

function generatePrompt(article, category) {
  let categorySpecificInstructions;

  switch (category) {
    case 'Arts & Culture':
      categorySpecificInstructions = `Report on the luxury and cultural significance of the art world, citing sources about exclusive events, high-end galleries, premium auctions, and influential collectors. Focus on how reports describe the intersection of wealth, culture, and artistic expression. Use attribution phrases when discussing market values, collector activities, or cultural impact.`;
      break;
    case 'Auto & Yachting':
      categorySpecificInstructions = `Report on luxury automotive and yachting developments based on industry sources and official announcements. Cite manufacturer statements, industry reports, and expert opinions about premium brands, exclusive models, cutting-edge technology, and lifestyle trends. Use phrases like 'according to company officials' or 'industry sources report' when discussing new releases or market trends.`;
      break;
    case 'Aviation':
      categorySpecificInstructions = `Cover private aviation and luxury airline developments through official sources and industry reports. Cite aviation authorities, airline executives, and industry analysts when reporting on premium aircraft, exclusive air travel services, business jets, and first-class innovations. Use attribution for safety reports, market data, and company announcements.`;
      break;
    case 'Business & Finance':
      categorySpecificInstructions = `Report on luxury investments and wealth management developments based on financial sources and market reports. Cite financial institutions, market analysts, and economic reports when discussing high-net-worth trends, premium financial services, and luxury market performance. Use phrases like 'according to market analysts' or 'financial reports indicate' for data and trends.`;
      break;
    case 'Entertainment':
      categorySpecificInstructions = `Cover luxury entertainment developments through industry sources and official announcements. Report on exclusive events, premium venues, and celebrity lifestyle trends based on entertainment industry sources, event organizers, and official statements. Use attribution when discussing box office figures, event attendance, or industry trends.`;
      break;
    case 'Fashion':
      categorySpecificInstructions = `Report on luxury fashion industry developments based on designer statements, fashion house announcements, and industry sources. Cite fashion executives, industry analysts, and trade publications when covering haute couture, designer collections, premium materials, and fashion week events. Use attribution for sales figures, trend predictions, and brand strategies.`;
      break;
    case 'Food & Wine':
      categorySpecificInstructions = `Cover fine dining and luxury culinary developments through restaurant industry sources and culinary experts. Report on Michelin-starred establishments, premium wine releases, and exclusive culinary experiences based on chef interviews, sommelier expertise, and industry publications. Use phrases like 'according to culinary experts' or 'restaurant sources confirm' for new openings and trends.`;
      break;
    case 'Health & Wellness':
      categorySpecificInstructions = `Report on luxury wellness developments based on medical professionals, spa industry sources, and health experts. Cover premium spa treatments, exclusive health retreats, and high-end fitness facilities through expert opinions and industry reports. Use attribution when discussing health benefits, treatment efficacy, or wellness trends, including phrases like 'health experts say' or 'according to spa industry reports.'`;
      break;
    case 'Home Design':
      categorySpecificInstructions = `Cover luxury real estate and design developments through property market sources and architectural experts. Report on mansion sales, premium interior design trends, and exclusive home features based on real estate agents, architects, and design professionals. Use phrases like 'real estate sources report' or 'according to architectural firms' when discussing market values and design trends.`;
      break;
    case 'Jewelry & Watches':
      categorySpecificInstructions = `Report on luxury timepiece and jewelry developments based on brand announcements and industry sources. Cover exclusive collections, rare gems, and master craftsmanship through watchmaker statements, jewelry house officials, and auction house reports. Use attribution when discussing valuations, craftsmanship techniques, or market trends, such as 'according to auction house experts' or 'brand officials confirm.'`;
      break;
    case 'Lifestyle':
      categorySpecificInstructions = `Cover luxury living trends and premium lifestyle developments through lifestyle experts and industry sources. Report on exclusive experiences, high-end services, and sophisticated living approaches based on lifestyle consultants, service providers, and trend analysts. Use phrases like 'lifestyle experts note' or 'according to service industry reports' when discussing consumer behavior and luxury trends.`;
      break;
    case 'People':
      categorySpecificInstructions = `Report on luxury personalities and wealthy individuals through verified sources and official statements. Cover exclusive social circles and premium lifestyle choices based on publicist statements, social media announcements, and verified reporting. Always use attribution phrases like 'representatives confirm' or 'according to official sources' when discussing personal wealth, lifestyle choices, or social activities. Include appropriate caveats like 'reportedly' when information cannot be independently verified.`;
      break;
    case 'Pets':
      categorySpecificInstructions = `Cover luxury pet industry developments through veterinary experts and pet industry sources. Report on premium pet products, exclusive pet services, and expensive breeds based on veterinarian opinions, pet industry professionals, and breed association statements. Use phrases like 'pet industry experts say' or 'according to veterinary sources' when discussing pet care trends and product developments.`;
      break;
    case 'Philanthropy':
      categorySpecificInstructions = `Report on luxury philanthropy developments based on charitable organization statements and donor representatives. Cover wealthy donors, exclusive charitable events, and premium giving experiences through nonprofit officials, fundraising professionals, and verified donation reports. Use attribution phrases like 'charity officials confirm' or 'according to nonprofit sources' when discussing donation amounts and charitable activities.`;
      break;
    case 'Technology':
      categorySpecificInstructions = `Cover luxury technology developments through tech industry sources and company announcements. Report on premium gadgets, exclusive tech experiences, and high-end innovations based on manufacturer statements, tech analysts, and industry reports. Use phrases like 'company officials announce' or 'according to tech industry sources' when discussing product launches, specifications, and market positioning.`;
      break;
    case 'Travel':
      categorySpecificInstructions = `Report on luxury travel developments through tourism industry sources and hospitality experts. Cover premium destinations, exclusive resorts, and high-end accommodations based on tourism boards, hotel executives, and travel industry reports. Use attribution phrases like 'tourism officials report' or 'according to hospitality industry sources' when discussing new destinations, occupancy rates, and travel trends.`;
      break;
    default:
      categorySpecificInstructions = 'Report on the luxury and premium aspects of the topic based on verified sources and official statements. Use proper attribution and maintain journalistic objectivity.';
  }

  return categorySpecificInstructions;
}

const PROMPTS = {
  type_one: (article, category) => {
    const optimizedSample = OPTIMIZED_SAMPLES.getFullTemplate(category, 'trend_analysis');
    const instructions = `Write as a journalist reporting on events based on existing news coverage. Using the style and structure shown below, create a blog article that first summarizes the content of the following article and then discusses how its themes relate to the jobs of the future.

STYLE TEMPLATE:
${optimizedSample}

JOURNALISTIC REQUIREMENTS:
- Use attribution phrases like 'according to reports,' 'sources say,' or 'officials confirmed'
- Maintain objective, third-person reporting style
- Do not write as if you directly witnessed or investigated the events
- Present information as coming from news reports and official sources
- Keep the tone professional and factual
- Include appropriate caveats like 'reportedly' or 'allegedly' when appropriate

The blog post should be engaging and thought-provoking while maintaining journalistic integrity. Provide not only a summary but also insightful elaboration on key points based on the source material. Include relevant analogies and examples drawn from the reporting. The article should be less than 1500 words with minimal sub-headings. Note: don't include Blog Title, Summary or Blog Content at start - only provide the content.`;

    const categoryInstructions = generatePrompt(article, category);

    return `${instructions}\n\n${categoryInstructions}`;
  },

  type_two: (article, category) => {
    const categorySample = OPTIMIZED_SAMPLES.getCategorySample(category);
    const instruction = `Write as a journalist reporting on events based on existing news coverage. Rewrite the following article based on the enhanced instructions provided:

STYLE REFERENCE:
${categorySample}

JOURNALISTIC REQUIREMENTS:
- Use attribution phrases like 'according to reports,' 'sources say,' or 'officials confirmed'
- Maintain objective, third-person reporting style
- Do not write as if you directly witnessed or investigated the events
- Present information as coming from news reports and official sources
- Keep the tone professional and factual
- Include appropriate caveats like 'reportedly' or 'allegedly' when appropriate

The article's topic is "${article.title}". Structure the article into at least four coherent paragraphs, incorporating reported examples, case studies, and research findings from the source material. Ensure proper attribution throughout. Conclude with insights based on expert opinions or industry projections. Return only the article content without headers or structural labels.`;
    
    const categoryInstructions = generatePrompt(article, category);

    return `Article description: ${article.description}, Article content: ${article.content}. ${instruction}\n\n${categoryInstructions}`;
  },

  luxury_focused: (article) => {
    const mainTemplate = OPTIMIZED_SAMPLES.getMainTemplate();
    const categoryInstructions = generatePrompt(article, article.categoryName);
    
    return `You are a luxury lifestyle journalist reporting on events based on existing news coverage. Create an engaging blog post focusing on the luxury and premium aspects while maintaining journalistic integrity.

ARTICLE DETAILS:
Title: "${article.title}"
Description: "${article.description}"
Content: "${article.content}"
Source URL: "${article.url}"

STYLE TEMPLATE:
${mainTemplate}

JOURNALISTIC REQUIREMENTS:
- Write as a journalist reporting on events based on existing news coverage
- Use attribution phrases like 'according to reports,' 'sources say,' or 'officials confirmed'
- Maintain objective, third-person reporting style
- Present information as coming from news reports and official sources
- Include appropriate caveats like 'reportedly' or 'allegedly' when appropriate

CONTENT INSTRUCTIONS:
1. Report from a luxury lifestyle perspective focusing on premium aspects from the source material
2. ${categoryInstructions}
3. Include 2-3 direct quotes from the original article with quotation marks
4. Use journalistic attribution after each quote (format: "according to [source publication]")
5. Structure with 4-5 well-developed paragraphs
6. Use sophisticated language while maintaining professional journalism standards
7. End with compelling insights based on reported information or expert predictions
8. Return only article content without title or headers

TONE: Sophisticated, engaging, luxury-focused with journalistic objectivity
LENGTH: 800-1200 words`;
  },

  type_three: (article, category) => {
    const trendTemplate = OPTIMIZED_SAMPLES.getFullTemplate(category, 'trend_analysis');
    const categoryInstructions = generatePrompt(article, category);

    return `Write as a journalist reporting on events based on existing news coverage. The article's topic is "${article.title}".

STYLE TEMPLATE:
${trendTemplate}

JOURNALISTIC REQUIREMENTS:
- Use attribution phrases like 'according to reports,' 'sources say,' or 'officials confirmed'
- Maintain objective, third-person reporting style
- Present information as coming from news reports and official sources
- Include appropriate caveats like 'reportedly' or 'allegedly' when appropriate

Focus on how the featured technology or trend is reportedly shaping the future, based on expert analysis and industry reports. Structure the article with proper attribution throughout, incorporating research findings and expert opinions from the source material. Conclude with expert predictions or industry forecasts. Do not use phrases like "In conclusion" or "In summary."

${categoryInstructions}`;
  }
};

module.exports = {
  PROMPTS,
  OPTIMIZED_SAMPLES
};