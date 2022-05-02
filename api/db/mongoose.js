// This file handles the connection logic to mongoDB

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
    .connect("mongodb://localhost:27017/TaskManager", { useNewUrlParser: true })
    .then(() => {
        console.log("connection to db successful");
    })
    .catch((e) => {
        console.log("connection to db unsuccessful");
        console.log(e);
    });

// To prevent deprectation warnings (from MongoDB native driver)
// mongoose.set("useCreateIndex", true);
// mongoose.set("useFindAndModify", false);

module.exports = {
    mongoose,
};
