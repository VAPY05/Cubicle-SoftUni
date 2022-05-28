const database = require("../config/database.json")

module.exports = (req,res)=>{
    req.cubes = database
};