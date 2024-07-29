import { prisma } from "../utilities/utilities.js";

export const updateSetting = async (req, res) => {
  try {
    const {
      name,
      shortName,
      coverImage,
      description,
      phoneNumber,
      email,
      facebookLink,
      xLink,
      instagramLink,
      linkedInLink,
      youtubeLink,
      footerTag,
      logo,
    } = req.body;

    let formattedData = {};

    for (const prop of [
      name,
      shortName,
      coverImage,
      description,
      phoneNumber,
      email,
      facebookLink,
      xLink,
      instagramLink,
      linkedInLink,
      youtubeLink,
      footerTag,
      logo,
    ]) {
      if (req.body[prop] && req.body[prop] !== "") {
        formattedData = {
          ...formattedData,
          [prop]: req.body[prop],
        };
      }
    }

    const newSetting = await prisma.setting.update({
      data: formattedData,
      where: { id: req.params.id },
    });

    return res.status(201).send({
      success: true,
      message: "Request successful!",
      data: newSetting,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const getSettings = async (req, res) => {
  try {
    const setting = await prisma.setting.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).send({
      success: true,
      message: "Request successful!",
      data: setting,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error?.message || "Unknown error!",
    });
  }
};

export const saveTags = async (tags) => {
  try {
    const existingTags = await prisma.tag.findMany();
    const existingTagsArray = existingTags?.map((tag) => tag.name);

    const newTags = tags.filter((tag) => !existingTagsArray.includes(tag));

    if (newTags.length) {
      const result = await prisma.tag.createMany({
        data: newTags?.map((name) => {
          return { name };
        }),
      });
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
