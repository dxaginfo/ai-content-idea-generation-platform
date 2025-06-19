const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Generate content ideas using OpenAI
 * @param {string} topic - The main topic for generating ideas
 * @param {string} industry - The industry context (optional)
 * @param {string} contentType - The type of content (Blog, Video, etc.) (optional)
 * @param {number} count - Number of ideas to generate (default: 4)
 * @returns {Array} Array of generated content ideas
 */
const generateIdeasWithAI = async (topic, industry = '', contentType = '', count = 4) => {
  try {
    // Create prompt based on inputs
    let prompt = `Generate ${count} creative and engaging content ideas about "${topic}"`;
    
    if (industry) {
      prompt += ` for the ${industry} industry`;
    }
    
    if (contentType) {
      prompt += ` in the format of ${contentType}`;
    }
    
    prompt += `. For each idea, provide a catchy title, a brief description, and 5 relevant keywords. Format the response as a JSON array with objects containing title, description, and keywords properties.`;

    // Call OpenAI API
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
      n: 1,
    });

    // Parse the response to get structured ideas
    const text = response.data.choices[0].text.trim();
    
    // Try to parse JSON response
    try {
      // Clean up the text in case there's any markdown or extra text
      const jsonStartIndex = text.indexOf('[');
      const jsonEndIndex = text.lastIndexOf(']') + 1;
      const jsonText = text.substring(jsonStartIndex, jsonEndIndex);
      
      const ideas = JSON.parse(jsonText);
      
      // Add format and id to each idea
      return ideas.map((idea, index) => ({
        id: `ai-${Date.now()}-${index}`,
        title: idea.title,
        description: idea.description,
        format: contentType || 'Blog Post',
        keywords: Array.isArray(idea.keywords) ? idea.keywords : idea.keywords.split(',').map(k => k.trim()),
        contentType: contentType || 'Blog Post',
      }));
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      // Fallback to a simple format if JSON parsing fails
      return [{
        id: `ai-${Date.now()}-0`,
        title: `${contentType || 'Content'} ideas about ${topic}`,
        description: text,
        format: contentType || 'Blog Post',
        keywords: [topic],
        contentType: contentType || 'Blog Post',
      }];
    }
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    throw new Error('Failed to generate ideas');
  }
};

module.exports = generateIdeasWithAI;
