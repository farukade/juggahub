import { prisma } from "../utilities/utilities.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required!" });
    }

    const exitingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (exitingCategory) {
      return res.status(400).send({
        success: false,
        message: `Category with name ${name} exists!`,
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
        icon: icon ? icon : undefined,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Request successful!",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { id: req.query.id ? Number(req.query.id) : undefined },
    });

    return res.status(200).send({
      success: true,
      message: "Request successful!",
      data: req.query.id ? categories[0] : categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name && !description) {
      return res.status(400).send({
        success: false,
        message: `Nothing to update!`,
      });
    }
    const exitingCategory = await prisma.category.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingCategory) {
      return res.status(400).send({
        success: false,
        message: `Category not found!`,
      });
    }

    if (name) {
      const existingName = await prisma.category.findFirst({
        where: { email: email ? email : undefined },
      });
      if (existingName) {
        return res.status(400).send({
          success: false,
          message: `Category with name ${name} exists!`,
        });
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id: exitingCategory.id },
      data: {
        description: description ? description : undefined,
        name: name ? name : undefined,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const exitingCategory = await prisma.category.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingCategory) {
      return res.status(400).send({
        success: false,
        message: `Category not found!`,
      });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: exitingCategory.id },
    });

    return res.status(200).send({
      success: true,
      message: "Category deleted!",
      data: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};
