import { prisma } from "../utilities/utilities.js";

export const createComment = async (req, res) => {
  try {
    const { name, message, postId } = req.body;

    if (!name || !message || !postId) {
      return res.status(400).send({
        success: false,
        message: "Name | message | post is required!",
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        name,
        message,
        postId,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Request successful!",
      data: newComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.query.postId ? Number(req.query.postId) : undefined,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Request successful!",
      data: comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { name, message, postId } = req.body;

    if (!name && !message && !postId) {
      return res.status(400).send({
        success: false,
        message: `Nothing to update!`,
      });
    }
    const exitingComment = await prisma.comment.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingComment) {
      return res.status(400).send({
        success: false,
        message: `Comment not found!`,
      });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: exitingComment.id },
      data: {
        name: name ? name : undefined,
        message: message ? message : undefined,
        postId: postId ? postId : undefined,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Comment updated",
      data: updatedComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const exitingComment = await prisma.comment.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingComment) {
      return res.status(400).send({
        success: false,
        message: `Comment not found!`,
      });
    }

    const deletedComment = await prisma.comment.delete({
      where: { id: exitingComment.id },
    });

    return res.status(200).send({
      success: true,
      message: "Comment deleted!",
      data: deletedComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};
