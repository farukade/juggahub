import { prisma } from "../utilities/utilities.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, categoryId, tags } = req.body;

    const { id: authorId } = req.user;

    if (!title || !content || !categoryId) {
      return res.status(400).send({
        success: false,
        message: "Title | content | author | category is required!",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        categoryId,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Request successful!",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        id: req.query.id ? Number(req.query.id) : undefined,
        published: req.user ? undefined : true,
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            id: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).send({
      success: true,
      message: "Request successful!",
      data: req.query.id ? posts[0] : posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const { id: authorId } = req.user;

    if (!title && !content && !categoryId) {
      return res.status(400).send({
        success: false,
        message: `Nothing to update!`,
      });
    }
    const exitingPost = await prisma.post.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingPost) {
      return res.status(400).send({
        success: false,
        message: `Post not found!`,
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: exitingPost.id },
      data: {
        title: title ? title : undefined,
        content: content ? content : undefined,
        authorId: authorId ? authorId : undefined,
        categoryId: categoryId ? categoryId : undefined,
        published: false,
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            id: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).send({
      success: true,
      message: "Post updated",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const publishPost = async (req, res) => {
  try {
    const { id, publish } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: `Nothing to update!`,
      });
    }

    const exitingPost = await prisma.post.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingPost) {
      return res.status(400).send({
        success: false,
        message: `Post not found!`,
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: exitingPost.id },
      data: {
        published: publish === false ? false : true,
      },
    });

    return res.status(200).send({
      success: true,
      message: `Post ${publish === false ? "unpublished" : "published"}`,
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const exitingPost = await prisma.post.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingPost) {
      return res.status(400).send({
        success: false,
        message: `Post not found!`,
      });
    }

    const deletedPost = await prisma.post.delete({
      where: { id: exitingPost.id },
    });

    return res.status(200).send({
      success: true,
      message: "Post deleted!",
      data: deletedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};
