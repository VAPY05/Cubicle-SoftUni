const editMyCube = require("../services/edit.service")


const editCube = (req) => {
    editMyCube(req.body, req.params.id)
}

module.exports = editCube