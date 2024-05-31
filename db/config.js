const mongoose = require("mongoose");

const url =
  "mongodb+srv://swapnilwalhekar1999:HPjpR8JIGdf812iv@interview.xcdev2v.mongodb.net/";

mongoose.connect(url, () => {
  console.log("ok DB Connected:");
});

// "mongodb+srv://swapnilwalhekar1999:VJbRQgS6GOiclrdK@cluster.ihmi2nm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
// HPjpR8JIGdf812iv;
// swapnilwalhekar1999;
