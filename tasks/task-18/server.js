import express from "express";
import client from "prom-client";

const app = express();

async function apiRequest() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  return response.json();
}

app.get("/", async (req, res) => {
  const data = await apiRequest();
  res.send(`Pokemon is ${data.species.name}`);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
