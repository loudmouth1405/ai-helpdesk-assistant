const prisma = require("../config/prisma");
const { getTroubleshooting } = require("../services/aiServices");


const troubleshoot = async (req, res) => {
  try {
    const { title, description } = req.body;


    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required.",
      });
    }


    const aiResponse = await getTroubleshooting(title, description);


    const session = await prisma.aISession.create({
      data: {
        title,
        description,
        aiResponse: JSON.stringify(aiResponse),
        resolvedByAI: false,
        userId: req.user.id,
      },
    });

    res.json({
      sessionId: session.id,
      category: aiResponse.category,
      priority: aiResponse.priority,
      suggestions: aiResponse.suggestions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "AI processing failed",
    });
  }
};


const resolveIssue = async (req, res) => {
  try {
    const { sessionId } = req.body;

    await prisma.aISession.update({
      where: {
        id: sessionId,
      },
      data: {
        resolvedByAI: true,
      },
    });

    res.json({
      message: "Issue marked as resolved successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update AI session.",
    });
  }
};

module.exports = {
  troubleshoot,
  resolveIssue,
};