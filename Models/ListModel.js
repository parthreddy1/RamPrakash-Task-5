const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)
const ListSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    tasks: [TaskSchema]
})

module.exports = mongoose.model("Lists", ListSchema)
