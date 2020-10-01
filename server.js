import express from "express";
import mongoose from "mongoose";
const db = "mongodb://localhost:27017/quotes";
const app = express();
app.use(express.json());
const connect = () => {
  return mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
connect();
const quoteSchema = {
  text: String,
  from: String,
};
const Quote = mongoose.model("qoute", quoteSchema);
app.post("/add", (req, res) => {
  const { text, from } = req.body;
  Quote.create({
    text,
    from,
  });
  res.json("Quote added");
});
app.get("/all", async (req, res) => {
  let allQoutes = await Quote.find({}, { _id: 0, __v: 0 });
  res.json(allQoutes);
});
const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
