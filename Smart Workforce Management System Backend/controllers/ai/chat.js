const gemini = require("../../config/gemini");
const { getAnalyticsDashboard } = require("../../services/analytics/analyticsService");

const chat = async (req, res) => {
    try {
        const prompt = String(req.body.message || "").trim();
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const analytics = await getAnalyticsDashboard(req.user.workspaceId);
        const response = await gemini.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `You are a workforce management assistant. Answer the user's question using only the workspace data below. Do not invent names or numbers. Keep the answer practical and concise. If the data does not answer the question, say so clearly.\n\nWorkspace data:\n${JSON.stringify(analytics)}\n\nUser question:\n${prompt}`,
        });

        return res.json({ success: true, reply: response.text });
    } catch (error) {
        console.error("AI assistant error:", error);
        return res.status(502).json({
            success: false,
            message: "AI assistant is unavailable right now",
        });
    }
};

module.exports = chat;
