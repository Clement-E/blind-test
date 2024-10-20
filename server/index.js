import express from "express";
import { config } from "dotenv";

const port = 5000;

config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var app = express();

app.get("/auth/login", (req, res) => {});

app.get("/auth/callback", (req, res) => {});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
