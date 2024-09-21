const { samplePost1 } = require('./sampleContent');

function generatePrompt(article, category) {
  let categorySpecificInstructions;

  switch (category) {
    case 'Arts & Culture':
      categorySpecificInstructions = `Please rewrite the following article based on the enhanced instructions provided:
      The article's topic is "${article.title}". The focus should be on the cultural and artistic significance, highlighting key events, exhibits, or contributions.
      Provide a brief outline of the central theme and main ideas, ensuring alignment with the interests of the arts and culture lovers.
      Develop an engaging opening paragraph that sets the tone and introduces the subject matter in a compelling way.
      Structure the article into at least four coherent paragraphs, incorporating real-life examples, case studies, and research findings. Ensure a seamless flow of ideas.
      Infuse the article with insights and personal anecdotes, reflecting extensive experience in the field.
      Conclude the article with a powerful and memorable ending, avoiding cliché phrases like 'in conclusion.' Opt for a creative transition into the final thoughts, which could be a call to action, a provocative question, or a compelling statement.
      Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
      Note: the final content should not be structured like , Topic and Audience Understanding:, Logical Body Development: etc. just return the content (it'll be used as the article body) , also don't include a title, only the content is needed`;
      break;
    case 'Auto & Yatching':
      categorySpecificInstructions = `Please rewrite the following article based on the comprehensive instructions provided:
The article's topic is "${article.title}". Highlight innovations in automotive and yachting technology, with an emphasis on cutting-edge designs and luxury features.
Summarize the central theme and main ideas, aligning with the interests of auto and yachting enthusiasts.
Begin with an engaging introduction that captures attention and introduces the topic dynamically.
Organize the article into at least four well-structured paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure ideas flow seamlessly.
Enhance the article with insights and personal anecdotes, reflecting deep expertise in the field.
End with a memorable and impactful conclusion, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a provocative question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Aviation':
      categorySpecificInstructions = `Please rewrite the following article based on the specific instructions provided:
The article's topic is "${article.title}". Focus on aviation developments, including new aircraft technologies, safety advancements, and industry trends.
Summarize the central theme and main ideas, aligning with the interests of aviation professionals and enthusiasts.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter effectively.
Divide the article into at least four cohesive paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure a seamless flow of ideas.
Infuse the article with insights and personal anecdotes, drawing on extensive experience in aviation.
Conclude with a powerful and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a provocative question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Business & Finance':
      categorySpecificInstructions = `Please rewrite the following article based on the enhanced instructions provided:
The article's topic is "${article.title}". Focus on financial strategies, market trends, and business innovations shaping the industry.
Summarize the central theme and main ideas, ensuring they resonate with business executives and financial professionals.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter effectively.
Divide the article into at least four well-structured paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure ideas flow seamlessly.
Enhance the article with insights and personal anecdotes, reflecting deep expertise in business and finance.
End with a memorable and impactful conclusion, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Entertainment':
      categorySpecificInstructions = `Please rewrite the following article based on the detailed instructions provided:
The article's topic is "${article.title}". Focus on significant trends, events, and personalities shaping the entertainment industry.
Summarize the central theme and main ideas, ensuring they resonate with entertainment enthusiasts.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter vividly.
Organize the article into at least four cohesive paragraphs, integrating real-life examples, detailed case studies, and relevant research findings. Ensure a seamless flow of ideas.
Enrich the article with insights and personal anecdotes, drawing on extensive experience in the entertainment field.
Conclude with a compelling and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Fashion':
      categorySpecificInstructions = `Please rewrite the following article based on the comprehensive instructions provided:
The article's topic is "${article.title}". Highlight the latest trends, influential designers, and cultural impacts of fashion.
Summarize the central theme and main ideas, aligning with the interests of fashion enthusiasts.
Begin with an engaging introduction that captures attention and introduces the topic dynamically.
Organize the article into at least four well-structured paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure ideas flow seamlessly.
Enhance the article with insights and personal anecdotes, reflecting deep expertise in the fashion industry.
End with a memorable and impactful conclusion, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a provocative question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Food & Wine':
      categorySpecificInstructions = `Please rewrite the following article based on the specific instructions provided:
The article's topic is "${article.title}". Focus on culinary trends, gourmet recipes, and notable figures in the food and wine industry.
Summarize the central theme and main ideas, aligning with the interests of food and wine aficionados.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter effectively.
Divide the article into at least four cohesive paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure a seamless flow of ideas.
Infuse the article with insights and personal anecdotes, drawing on extensive experience in the culinary field.
Conclude with a powerful and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Health & Wellness':
      categorySpecificInstructions = `Please rewrite the following article based on the detailed instructions provided:
The article's topic is "${article.title}". Focus on health trends, wellness strategies, and advancements in medical science.
Summarize the central theme and main ideas, ensuring they resonate with health and wellness enthusiasts.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter vividly.
Break the article into at least four cohesive paragraphs, integrating real-life examples, detailed case studies, and relevant research findings. Ensure a seamless flow of ideas.
Enrich the article with insights and personal anecdotes, drawing on extensive experience in health and wellness.
Conclude with a compelling and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Home Design':
      categorySpecificInstructions = `Please rewrite the following article based on the comprehensive instructions provided:
The article's topic is "${article.title}". Highlight innovative home design trends, sustainable practices, and influential designers.
Summarize the central theme and main ideas, aligning with the interests of home design enthusiasts.
Begin with an engaging introduction that captures attention and introduces the topic dynamically.
Organize the article into at least four well-structured paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure ideas flow seamlessly.
Enhance the article with insights and personal anecdotes, reflecting deep expertise in home design.
End with a memorable and impactful conclusion, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a provocative question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Jewelry & Watches':
      categorySpecificInstructions = `Please rewrite the following article based on the specific instructions provided:
The article's topic is "${article.title}". Focus on luxury timepieces and jewelry, highlighting craftsmanship, design, and market trends.
Summarize the central theme and main ideas, aligning with the interests of jewelry and watch enthusiasts.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter effectively.
Divide the article into at least four cohesive paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure a seamless flow of ideas.
Infuse the article with insights and personal anecdotes, drawing on extensive experience in the field.
Conclude with a powerful and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Lifestyle':
      categorySpecificInstructions = `Please rewrite the following article based on the detailed instructions provided:
The article's topic is "${article.title}". Focus on contemporary lifestyle trends, personal development, and influential personalities.
Summarize the central theme and main ideas, ensuring they resonate with lifestyle enthusiasts.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter vividly.
Break the article into at least four cohesive paragraphs, integrating real-life examples, detailed case studies, and relevant research findings. Ensure a seamless flow of ideas.
Enrich the article with insights and personal anecdotes, drawing on extensive experience in lifestyle trends.
Conclude with a compelling and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
      case 'People':
      categorySpecificInstructions = `Please rewrite the following article based on the detailed instructions provided:
The article's topic is "${article.title}". Focus on inspiring stories, influential figures, and personal achievements that shape our society.
Summarize the central theme and main ideas, ensuring they resonate with readers interested in human stories and societal impact.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter vividly.
Break the article into at least four cohesive paragraphs, integrating real-life examples, detailed case studies, and relevant research findings. Ensure a seamless flow of ideas.
Enrich the article with insights and personal anecdotes, drawing on extensive experience in covering human interest stories.
Conclude with a compelling and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Pets':
      categorySpecificInstructions = `Please rewrite the following article based on the comprehensive instructions provided:
The article's topic is "${article.title}". Focus on pet care, training techniques, and trends in pet ownership.
Summarize the central theme and main ideas, aligning with the interests of pet owners and animal lovers.
Begin with an engaging introduction that captures attention and introduces the topic dynamically.
Organize the article into at least four well-structured paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure ideas flow seamlessly.
Enhance the article with insights and personal anecdotes, reflecting deep expertise in pet care.
End with a memorable and impactful conclusion, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a provocative question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Philanthropy':
      categorySpecificInstructions = `Please rewrite the following article based on the specific instructions provided:
The article's topic is "${article.title}". Focus on charitable initiatives, influential philanthropists, and the impact of giving.
Summarize the central theme and main ideas, aligning with the interests of philanthropists and charity enthusiasts.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter effectively.
Divide the article into at least four cohesive paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure a seamless flow of ideas.
Infuse the article with insights and personal anecdotes, drawing on extensive experience in philanthropy.
Conclude with a powerful and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Technology':
      categorySpecificInstructions = `Please rewrite the following article based on the detailed instructions provided:
The article's topic is "${article.title}". Focus on technological advancements, innovations, and their implications for the future.
Summarize the central theme and main ideas, ensuring they resonate with tech enthusiasts and professionals.
Craft an engaging introduction that sets a captivating tone and introduces the subject matter vividly.
Break the article into at least four cohesive paragraphs, integrating real-life examples, detailed case studies, and relevant research findings. Ensure a seamless flow of ideas.
Enrich the article with insights and personal anecdotes, drawing on extensive experience in technology.
Conclude with a compelling and memorable ending, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a thought-provoking question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed.`;
      break;
    case 'Travel':
      categorySpecificInstructions = `Please rewrite the following article based on the comprehensive instructions provided:
The article's topic is "${article.title}". Focus on travel destinations, experiences, and trends in the travel industry.
Summarize the central theme and main ideas, aligning with the interests of travel enthusiasts.
Begin with an engaging introduction that captures attention and introduces the topic dynamically.
Organize the article into at least four well-structured paragraphs, incorporating real-life examples, case studies, and relevant research findings. Ensure ideas flow seamlessly.
Enhance the article with insights and personal anecdotes, reflecting deep expertise in travel experiences.
End with a memorable and impactful conclusion, avoiding clichés like 'in conclusion.' Use a creative transition to final thoughts, such as a call to action, a provocative question, or a powerful statement.
Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.
Note: Return the content as a cohesive article body without section headers like 'Topic and Audience Understanding,' 'Logical Body Development,' etc. Do not include a title; only the content is needed`;
      break;
    default:
      categorySpecificInstructions = 'Summarize the article.';
  }

  return `
  ${categorySpecificInstructions}
  
  Article:
  ${article.title}. ${article.description}. ${article.content}`;
}

const PROMPTS = {
  type_one: (article, category) => {
    const samplePostExcerpt = `${samplePost1}`; // note: the sample post here is a sample of article style
    const instructions = `Using the style and structure of the above sample posts, create a blog article that first summarizes the content of the following article and then discusses how its themes relate to the jobs of the future. The blog post should be engaging and thought-provoking, aiming to retain the reader's interest throughout. It should provide not only a summary but also insightful elaboration on key points. Include relevant analogies, examples, and personal insights to make the content more relatable and share-worthy. The blog should encourage the reader to think deeply about the subject and feel compelled to share it for its value. The article should be less than 1500 words with minimal sub-headings. note: don't include Blog Title, Summary or Blog Content at start of summary or body of summary, i only need the content.`;

    const categoryInstructions = generatePrompt(article, category);

    return `${samplePostExcerpt}\n\n${instructions}\n\n${categoryInstructions}`;
  },
  type_two: (article, category) => {
    const instruction = `Please rewrite the following article based on the enhanced instructions provided:

The article's topic is "${article.title}". The target audience includes a diverse group of readers interested in staying informed about the latest trends and insights across various fields.

Provide a brief outline of the central theme and main ideas, ensuring alignment with the interests of a broad audience.

Develop an engaging opening paragraph that sets the tone and introduces the subject matter in a compelling way.

Structure the article into at least four coherent paragraphs, incorporating real-life examples, case studies, and research findings. Ensure a seamless flow of ideas.

Infuse the article with insights and personal anecdotes, reflecting extensive knowledge and experience.

Conclude the article with a powerful and memorable ending, avoiding cliché phrases like 'in conclusion.' Opt for a creative transition into the final thoughts, which could be a call to action, a provocative question, or a compelling statement.

Maintain a sophisticated yet accessible tone, suitable for an informed but diverse audience.

Note: the final content should not be structured like , Topic and Audience Understanding:, Logical Body Development: etc. just return the content (it'll be used as the article body), also don't include a title, only the content is needed `;
    
    const categoryInstructions = generatePrompt(article, category);

    return `Article description: ${article.description}, Article content: ${article.content}. ${instruction}\n\n${categoryInstructions}`;
  },
  type_three: (article, category) => {
    const categoryInstructions = generatePrompt(article, category);

    return `The article's topic is "${article.title}". The target audience includes a broad spectrum of readers who are interested in how new technologies and trends are shaping various aspects of life and work.

The central theme of this article should explore how the featured technology or trend is shaping the future. Focus on providing a forward-looking, optimistic perspective on the new and exciting opportunities that are emerging as a result of this trend.

Begin with an engaging opening paragraph that highlights the rapid pace of change and the significant impact it is having. Use this as a hook to draw the reader in and set the stage for the article's key insights.

In the body of the article, delve into real-world examples and case studies that illustrate how this technology or trend is already being applied in various contexts. Discuss the new types of opportunities and roles that are being created, as well as existing ones that are being transformed or augmented. Be sure to highlight the unique skills and qualifications that will be in high demand.

Incorporate research findings, expert opinions, and personal anecdotes to add depth and credibility to your analysis. Weave a cohesive narrative that explores both the near-term and long-term implications of this trend for the future.

Conclude the article with a powerful statement that leaves the reader feeling inspired and optimistic about the possibilities enabled by this emerging trend. Consider ending with a call to action that encourages the audience to start preparing for these new opportunities.

Maintain a sophisticated yet accessible tone throughout, providing insightful commentary that informs and engages a diverse audience.
Do not use words like "In conclusion" or "In summary" in article.

${categoryInstructions}
`;
  }
};

module.exports = {
  PROMPTS
};


