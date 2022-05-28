const express = require("express");
const handlebars = require("express-handlebars");
const { path } = require("express/lib/application");
const { redirect } = require("express/lib/response");
const database = require("./config/database.json")

const app = express();
const port = 5000;

app.use("/static",express.static("src/public"))
app.use(express.urlencoded({extended: false}))

app.engine("hbs",handlebars.engine({
    extname: "hbs"
}))

app.set("view engine", "hbs")
app.set('views','./src/views')



app.get("/",(req,res)=>{
    res.render("index", {cubes:database})
});

app.get("/about",(req,res)=>{
    res.render("about")
});

app.get("/create",(req,res)=>{
    res.render("create")
    if(req.query.name && req.query.description && req.query.imageUrl && req.query.difficultyLevel){
        req.query.id = database.length.toString()
        const newCube = req.query;
        database.push(newCube)
    }
});

app.get("/details/:id",(req,res)=>{
    res.render("details",{cube: database[req.params.id]})
    
});

app.get("*",(req,res)=>{
    res.render("404")
});
app.listen(port,()=>{console.log(`Server is listening on port ${port}`)})