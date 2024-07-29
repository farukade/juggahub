import { prisma } from "../utilities/utilities.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !message || !email) {
      return res.status(400).send({
        success: false,
        message: "Name | message | email is required!",
      });
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Request successful!",
      data: newFeedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).send({
      success: true,
      message: "Request successful!",
      data: feedbacks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const exitingFeedback = await prisma.feedback.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingFeedback) {
      return res.status(400).send({
        success: false,
        message: `Feedback not found!`,
      });
    }

    const deletedFeedback = await prisma.feedback.delete({
      where: { id: exitingFeedback.id },
    });

    return res.status(200).send({
      success: true,
      message: "Feedback deleted!",
      data: deletedFeedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};
