const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI });

async function getOpenAIResponse(userMessage) {
    try {
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage },
            ],
        });

        return gptResponse.choices[0].message.content;
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        throw new Error("Failed to fetch response from OpenAI.");
    }
}

module.exports = getOpenAIResponse;
