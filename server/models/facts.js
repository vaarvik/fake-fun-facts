const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const factSchema = new Schema({
  body: String,
  authorId: String
});

module.exports = mongoose.model("Fact", factSchema);
