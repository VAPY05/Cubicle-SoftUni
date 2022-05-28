const express = require("express");
const handlebars = require("express-handlebars");
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
    let entries = [...database];

    if (req.query.search) {
        entries = entries.filter(x=>x.name.toLowerCase().startsWith(req.query.search))
    } else if (req.query.from && req.query.to) {
        entries = entries.filter(x=>x.difficultyLevel >= req.query.from && x.difficultyLevel <= req.query.to);
    }

    res.render("index", {cubes:entries})
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
        res.redirect("/")
    }
});

app.get("/details/:id",(req,res)=>{
    res.render("details",{cube: database[req.params.id]})
    
});

app.get("*",(req,res)=>{
    res.render("404")
});
app.listen(port,()=>{console.log(`Server is listening on port ${port}`)})
