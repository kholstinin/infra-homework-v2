import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.get("/api/config", (req, res) => {
  res.json({
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    FEATURE_X_ENABLED: process.env.FEATURE_X_ENABLED === "true",
  });
});

app.use(express.static(path.join(__dirname, "static")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Service running on :${port}`));
