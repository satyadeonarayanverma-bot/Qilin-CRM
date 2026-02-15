const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const getChatCompletion = async (messages) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are Qilin Copilot, an AI assistant for an educational CRM. Your goal is to help counsellors and admins manage leads, draft follow-ips, and summarize data. Be professional, concise, and helpful."
                },
                ...messages
            ],
            model: "llama3-8b-8192", // Fast and efficient
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        return chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Groq API Error:", error);
        throw new Error("Failed to communicate with AI service");
    }
};

module.exports = { getChatCompletion };
