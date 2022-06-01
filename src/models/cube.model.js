const mongoose = require("mongoose")

module.exports = Cube = mongoose.model('Cube', { name: String, description: String, difficultyLevel: Number, imageUrl: String});
