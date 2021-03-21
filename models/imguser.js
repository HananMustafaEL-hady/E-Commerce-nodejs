const mongoose = require("mongoose");
Schema = mongoose.Schema;
const imgschema = new mongoose.Schema({
    userid: {
      type: Schema.ObjectId,
      ref: "userR",
      required: true,
    },
  // userid: {
  //   type: Number,
  // },
  upload: {
  },
});

const imgs = mongoose.model("imgschema", imgschema);
module.exports = imgs;
