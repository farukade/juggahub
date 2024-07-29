import express from "express";
import { config } from "dotenv";
import cors from "cors";
import allRoutes from "./routers/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./webpack.config.js";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT;
const app = express();

if (process.env.NODE_ENV !== "production") {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(join(__dirname, "../public")));
}

app.use("/api", allRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// FOR ENDPOINT NOT FOUND
app.use((req, res) => {
  console.log(`ENDPOINT ${req.method} - ${req.url} NOT FOUND`);
  return res
    .status(404)
    .send({ success: false, message: "Endpoint not found!" });
});

app.listen(port, () => {
  console.log("ANF RUNNING ON PORT", port);
});
