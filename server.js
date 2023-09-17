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
    res.status(500).send("Unable to retrieve all messages");
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
    res.status(500).send("Unable to save message");
  }
});

app.delete("/message/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteRow = await bd("messages").where({ id: id }).del();
    if (deleteRow) {
      console.log(`Message with id ${id} deleted sucessfully`);
      res.status(200).send(`Message with id ${id} deleted sucessfully`);
    } else {
      console.log(`Message with id ${id} not found`);
      res.status(404).send(`Message with id ${id} not found`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to delete message");
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Server got the request");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
