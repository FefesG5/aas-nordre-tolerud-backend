const express = require("express");
const { db, pool } = require("./knexConfig");

const app = express();

app.use(express.json());

app.get("/messages", async (req, res) => {
  try {
    const result = await db.select("*").from("messages");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/message", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const result = await db("messages").insert({
      name: name,
      email: email,
      message: message,
    });
    console.log("Message inserted successfully");
    res.status(200).send("Message stored sucessfully in database");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Server got the request");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
