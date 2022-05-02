/*
lists
get all lists
create new list
update list name
delete list

task
get all tasks in a specific list
create new task in a specific list
update task in a specific list
delete task in a specific list
*/
// Testing api
// app.get('/', (req, res) => {
//     res.send('Hello world')
// })

const express = require("express");
app = express();

const bodyParser = require("body-parser");

const mongoose = require("./db/mongoose");

// *Importing the models
const { List, Task } = require("./db/models");

// * Load middleware
app.use(bodyParser.json());

// * CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, OPTIONS, HEAD, PATCH, DELETE"
    );
    next();
});

// *Route Handlers
// ?Lists
/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get("/lists", (req, res) => {
    // return array of lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    });
});

/**
 * POST /lists
 * Purpose: Create new list
 */
app.post("/lists", (req, res) => {
    // create a new list and return it back to the user (including the id)
    // This list info will be contained in json req body
    let title = req.body.title;
    let newlist = new List({
        title,
    });
    newlist.save().then((newlistdoc) => {
        // contains the new list created including the id
        res.send(newlistdoc);
    });
});

/**
 * PATCH /lists/:listid
 * Purpose: Update the listname
 */
app.patch("/lists/:listid", (req, res) => {
    // update the list (id in url) with the new values in json body of the request
    List.findOneAndUpdate(
        { _id: req.params.listid },
        {
            $set: req.body,
        }
    ).then(() => {
        res.sendStatus(200);
    });
});

/**
 * DELETE /lists
 * Purpose: Delete a list
 */
app.delete("/lists/:listid", (req, res) => {
    // delete the list with the id in url
    List.findOneAndRemove({ _id: req.params.listid }).then((removedlistdoc) => {
        res.send(removedlistdoc);
    });
});
// *******************
// ?Tasks
/**
 * GET /lists/:listid/tasks
 * Purpose: Get all tasks belonging to a specific list
 */
app.get("/lists/:listid/tasks", (req, res) => {
    // return array of tasks belonging to a specific list
    Task.find({ _listId: req.params.listid }).then((tasks) => {
        res.send(tasks);
    });
});

/**
 * GET /lists/:listid/tasks/:taskid
 * Purpose: Get specific task belonging to a specific list
 */
app.get("/lists/:listid/tasks/:taskid", (req, res) => {
    // return array of tasks belonging to a specific list
    Task.findOne({ _listId: req.params.listid, _id: req.params.taskid }).then(
        (task) => {
            res.send(task);
        }
    );
});

/**
 * POST /lists/:listid/tasks
 * Purpose: Create new task
 */
app.post("/lists/:listid/tasks", (req, res) => {
    // create a new task in a specific list (id in url) and return it back to the user (including the id)
    // This task info will be contained in json req body
    let title = req.body.title;
    let newtask = new Task({
        title: title,
        _listId: req.params.listid,
    });
    newtask.save().then((newtaskdoc) => {
        // contains the new task created including the id
        res.send(newtaskdoc);
    });
});

/**
 * PATCH "/lists/:listid/tasks/:taskid"
 * Purpose: Update the task in the list
 */
app.patch("/lists/:listid/tasks/:taskid", (req, res) => {
    // update the task in the list (list and task id in url) with the new values in json body of the request
    Task.findOneAndUpdate(
        { _id: req.params.taskid, _listId: req.params.listid },
        {
            $set: req.body,
        }
    ).then(() => {
        res.send({ message: "Updated Successfully" });
    });
});

/**
 * DELETE /lists/:listid/tasks/:taskid"
 * Purpose: Delete a task in the list
 */
app.delete("/lists/:listid/tasks/:taskid", (req, res) => {
    // delete the task in the list with the id in url
    Task.findOneAndRemove({
        _id: req.params.taskid,
        _listId: req.params.listid,
    }).then((removedtaskdoc) => {
        res.send(removedtaskdoc);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
