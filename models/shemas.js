const mongoose = require("mongoose");
const schema = mongoose.Schema;


// define schema 

const item = new schema({
    itemtoadd : String
});

const todo = mongoose.model("todo" ,item);

module.exports = todo;