const express = require("express");
const router = express.Router();
const Lists = require("../Models/ListModel");

//Get All Lists
router.get("/", async (req, res) => {
    try {
        const listData = await Lists.find();
        res.json({ data: listData })
    }
    catch (err) {
        res.json({
            message: err
        })
    }
})

//Get Specific ListData(Tasks) using List Id

router.get("/:listId", async (req, res) => {

    try {
        const listData = await Lists.findById(req.params.listId)
        res.json({ ListData: listData })
    } catch (error) {
        res.json({
            message: err
        })
    }
})

//Get Specific Task using Task Id

router.get("/:listId/tasks/:taskId", async (req, res) => {

    try {
        const listData = await Lists.findById(req.params.listId)
        //const taskdata = await listData.tasks.findById(req.params.taskId)
        let taskData = listData.tasks.filter((data) => {
            return data._id == req.params.taskId
        });
        res.json({ TaskData: taskData })
    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }
})


//Post a New List

router.post("/", (req, res) => {
    console.log(req.body.tasks.name)
    const listData = new Lists({
        title: req.body.title,
        tasks: {
            taskName: req.body.tasks.taskName,
            description: req.body.tasks.description,
        }

    })
    listData.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({
            message: err
        })
    })
})

//Post (Add) a task to specific list id 

router.post("/:listId/tasks", async (req, res) => {
    var user_id = req.params.listId;
    const taskdata = {
        tasks: {
            taskName: req.body.taskName,
            description: req.body.description
        }
    }
    try {
        const data = await Lists.findByIdAndUpdate({ "_id": user_id }, { $push: taskdata }, { new: true })
        res.json({ data: data })
    }
    catch (err) {
        res.json({
            message: err
        })
    }

})


//Update a List
router.patch("/:listId", async (req, res) => {
    try {
        const updateData = await Lists.updateOne({ _id: req.params.listId }, {
            $set: {
                title: req.body.title
            }
        });
        console.log()
        res.json({ updateData, message: "Updated Successfully" })
    } catch (err) {
        console.log(err)
        res.json({
            message: err
        })
    }

})
//Update a Task in List
router.patch("/:listId/tasks/:taskId", async (req, res) => {
    try {
        const listData = await Lists.findById(req.params.listId)

        let taskData = listData.tasks.filter((data) => {
            return data._id == req.params.taskId
        });

        const id = taskData[0]._id;
        const updatedData = {
            'tasks.$.taskName': req.body.taskName,
            'tasks.$.description': req.body.description
        }
        const updateData = await Lists.updateOne({ "tasks._id": id }, { $set: updatedData });
        res.json({ updateData, message: "Updated Successfully" })

    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }
})


//Delete a list
router.delete("/:listId", async (req, res) => {
    try {
        const deleteData = await Lists.remove({ _id: req.params.listId });

        res.json({ deleteData, message: "Deleted Successfully" })
    } catch (err) {

        res.json({
            message: err
        })
    }

})

//Delete a Task in List
router.delete("/:listId/tasks/:taskId", async (req, res) => {
    try {
        const listData = await Lists.findById(req.params.listId)

        let taskData = listData.tasks.filter((data) => {
            return data._id == req.params.taskId
        });

        const id = taskData[0]._id;
        const deleteData = await Lists.remove({ "tasks._id": id });
        res.json({ deleteData, message: "Deleted Successfully" })
    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }
})

module.exports = router;