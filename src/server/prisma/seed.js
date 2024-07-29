import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import { config } from "dotenv";
config();

const saltRounds = 10;
const prisma = new PrismaClient();

async function main() {
  await prisma.author.create({
    data: {
      name: "Super Admin",
      email: "super.admin@email.com",
      password: hashSync("@BLOG4DM1N", saltRounds),
    },
  });
  await prisma.setting.create({
    data: {
      name: "Jugga Hub",
      shortName: "Jugga HUB",
      description:
        "Welcome to Jugga Hub, the media platform and trusted news source for events unfolding on the Africa continent and beyond via our digital studio in Ethiopia, Nairobi and Nigeria.",
      email: "info@juggahub.com",
      phoneNumber: "+2347040829030",
      facebookLink: "https://www.facebook.com/Jugga HUB",
      xLink: "https://www.x.com/Jugga HUB",
      linkedInLink: "https://www.linkedin.com/in/Jugga HUB",
      youtubeLink: "https://www.youtube.com/@Jugga HUB",
      instagramLink: "https://www.instagram.com/Jugga HUB",
      footerTag: "COPYRIGHT 2024 Jugga HUB.",
    },
  });
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
