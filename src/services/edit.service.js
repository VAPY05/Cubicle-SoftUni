const mongoose = require("mongoose");
const Cube = require("../models/cube.model")

const editMyCube = async (data, id) => {
    const response = await Cube.findById(id);

    response.name = data.name
    response.description = data.description
    response.difficultyLevel = data.difficultyLevel
    response.imageUrl = data.imageUrl

    await response.save()
}

module.exports = editMyCube