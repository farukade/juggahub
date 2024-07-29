import { prisma } from "../utilities/utilities.js";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const saltRounds = 10;
const secret = process.env.JWT_SECRET;

export const createAuthor = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const { id: authorId } = req.user ? req.user : { id: null };

    if (!password || password.length < 4) {
      return res.status(400).send({
        success: false,
        message: "password should have a minimum length of 4!",
      });
    }

    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required!" });
    }

    const exitingAuthor = await prisma.author.findFirst({
      where: { email },
    });

    if (exitingAuthor) {
      return res.status(400).send({
        success: false,
        message: `Author with email ${email} exists!`,
      });
    }

    const newAuthor = await prisma.author.create({
      data: {
        name,
        email,
        password: hashSync(password, saltRounds),
        createdBy: authorId || undefined,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Request successful!",
      data: { ...newAuthor, password: undefined },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      where: { id: req.query.id ? Number(req.query.id) : undefined },
    });

    return res.status(200).send({
      success: true,
      message: "Request successful!",
      data: req.query.id ? authors[0] : authors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).send({
        success: false,
        message: `Nothing to update!`,
      });
    }
    const exitingAuthor = await prisma.author.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingAuthor) {
      return res.status(400).send({
        success: false,
        message: `Author not found!`,
      });
    }

    if (email) {
      const existingEmail = await prisma.author.findFirst({
        where: { email: email ? email : undefined },
      });
      if (existingEmail) {
        return res.status(400).send({
          success: false,
          message: `Author with email ${email} exists!`,
        });
      }
    }

    const updatedAuthor = await prisma.author.update({
      where: { id: exitingAuthor.id },
      data: { email: email ? email : undefined, name: name ? name : undefined },
    });

    return res.status(200).send({
      success: true,
      message: "Author updated",
      data: updatedAuthor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const exitingAuthor = await prisma.author.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingAuthor) {
      return res.status(400).send({
        success: false,
        message: `Author not found!`,
      });
    }

    const deletedAuthor = await prisma.author.delete({
      where: { id: exitingAuthor.id },
    });

    return res.status(200).send({
      success: true,
      message: "Author deleted!",
      data: deletedAuthor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const authorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exitingAuthor = await prisma.author.findFirst({
      where: { email },
    });

    if (!exitingAuthor) {
      return res.status(400).send({
        success: false,
        message: `Author not found!`,
      });
    }

    const isValidPassword = compareSync(password, exitingAuthor.password);
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: `Invalid credentials!`,
      });
    }

    const authorWithoutPassword = {
      ...exitingAuthor,
      password: undefined,
    };
    const token = jwt.sign(authorWithoutPassword, secret, { expiresIn: "1h" });

    return res.status(200).send({
      success: true,
      message: `Login success!`,
      data: {
        ...authorWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 4) {
      return res.status(400).send({
        success: false,
        message: "password should have a minimum length of 4!",
      });
    }

    const exitingAuthor = await prisma.author.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!exitingAuthor) {
      return res.status(400).send({
        success: false,
        message: `Author not found!`,
      });
    }

    const updatedAuthor = await prisma.author.update({
      where: { id: exitingAuthor.id },
      data: { password: hashSync(password, saltRounds) },
    });

    return res.status(200).send({
      success: true,
      message: "Author's password updated",
      data: updatedAuthor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};
