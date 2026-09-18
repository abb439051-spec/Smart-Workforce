const gemini = require("../../config/gemini");

const generateAnalyticsInsights = async (
  analyticsData
) => {
  const fallbackInsights = [];
  const recommendation = analyticsData.workloadRecommendations?.[0];
  if (recommendation) {
    fallbackInsights.push({
      type: "recommendation",
      title: "AI Recommendation",
      description: recommendation.details,
      recommendation,
    });
  }
  if (analyticsData.overloadAlerts?.length) {
    fallbackInsights.push({
      type: "alert",
      title: "Redistribute overloaded work",
      description: recommendation?.details ||
        `${analyticsData.overloadAlerts.length} employee(s) are above healthy capacity. Review their active tasks and move work to available team members.`,
    });
  }
  if ((analyticsData.cards?.workloadBalance ?? 100) < 80 && !analyticsData.overloadAlerts?.length) {
    fallbackInsights.push({
      type: "recommendation",
      title: "Rebalance team assignments",
      description: `Workload balance is ${analyticsData.cards?.workloadBalance}%. Compare active task hours by employee and move lower-priority work from the busiest team members to those with capacity.`,
    });
  }
  if (analyticsData.burnoutRisk >= 50) {
    fallbackInsights.push({
      type: "alert",
      title: "Burnout risk is elevated",
      description: `Current workforce burnout risk is ${analyticsData.burnoutRisk}%. Reduce overload before assigning additional work.`,
    });
  }
  if (analyticsData.delayPredictions?.length) {
    const highRisk = analyticsData.delayPredictions.filter((task) => task.risk === "High");
    fallbackInsights.push({
      type: "alert",
      title: "Prevent likely task delays",
      description: `${highRisk.length || analyticsData.delayPredictions.length} task(s) need deadline attention. Review ${analyticsData.delayPredictions
        .slice(0, 3)
        .map((task) => `"${task.taskName}" assigned to ${task.assignedTo}`)
        .join(", ")} and redistribute work or adjust priorities.`,
    });
  }
  if (analyticsData.cards?.employeeProductivity < 60) {
    fallbackInsights.push({
      type: "recommendation",
      title: "Review task progress",
      description: `Average task productivity is ${analyticsData.cards.employeeProductivity}%. Check blocked and overdue work with the responsible teams.`,
    });
  }
  if (!fallbackInsights.length) {
    fallbackInsights.push({
      type: "growth",
      title: "Workforce is balanced",
      description: `Current workload balance is ${analyticsData.cards?.workloadBalance ?? 100}%, with burnout risk at ${analyticsData.burnoutRisk ?? 0}%. Continue monitoring active assignments.`,
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      insights: fallbackInsights.slice(0, 3),
      recommendation: recommendation || null,
    };
  }

  const prompt = `
You are an AI workforce management assistant.

Analyze the following real workforce analytics data.

Generate exactly 3 useful insights.

Focus on:
- workload problems
- productivity
- department performance
- useful workforce recommendations
- specific actions to balance workload, including who should transfer work when names are available

Rules:
- Do not invent employees.
- Do not invent departments.
- Do not invent numbers.
- Only use information present in the provided data.
- Keep each insight short and practical.

Return ONLY valid JSON.

Format:

{
  "insights": [
    {
      "type": "alert",
      "title": "Short title",
      "description": "Short explanation"
    }
  ]
}

Allowed types:
alert
growth
recommendation
prediction

WORKFORCE ANALYTICS:

${JSON.stringify(
  analyticsData,
  null,
  2
)}
`;

  try {
    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });
    const text = typeof response.text === "function"
      ? response.text()
      : response.text;
    const parsed = JSON.parse(String(text).replace(/^```json\s*|\s*```$/g, ""));

    if (!Array.isArray(parsed.insights)) {
      throw new Error("Gemini response did not contain an insights array");
    }

    const insights = parsed.insights
      .filter((insight) =>
        insight &&
        typeof insight.title === "string" &&
        typeof insight.description === "string"
      )
      .slice(0, 3);

    return {
      insights: [
        ...(recommendation ? [fallbackInsights[0]] : []),
        ...insights.filter((insight) => insight.title !== "AI Recommendation"),
      ].slice(0, 3),
      recommendation: recommendation || null,
    };
  } catch (error) {
    console.error("Gemini insights generation failed:", error.message);

    return {
      insights: fallbackInsights.slice(0, 3),
      recommendation: recommendation || null,
    };
  }
};

module.exports = {
  generateAnalyticsInsights,
};