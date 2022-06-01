const express = require("express");
const handlebars = require("express-handlebars");
const database = require("./config/database.json")
const mongoose = require('mongoose')
const editCube = require('./controllers/edit.controller')
const Cube = require('./models/cube.model');

mongoose.connect('mongodb://localhost:27017/test')
//const Cube = mongoose.model('Cube', { name: String, description: String, difficultyLevel: Number, imageUrl: String});

const app = express();
const port = 5000;

app.use("/static",express.static("src/public"))
app.use(express.urlencoded({extended: false}))

app.engine("hbs",handlebars.engine({
    extname: "hbs"
}))

app.set("view engine", "hbs")
app.set('views','./src/views')



app.get("/",async (req,res)=>{
    if(req.query.search || req.query.from || req.query.to){
        //let serachList = database;
        let response = JSON.stringify(await Cube.find().all())
        response = JSON.parse(response)
        if(req.query.search){
        serachList = response.filter(x=>x.name.toLowerCase().startsWith(req.query.search))
        }
        
        res.render("index", {cubes:serachList})
    }else{
        response = JSON.stringify(await Cube.find().all())
        res.render("index", {cubes:JSON.parse(response)})
    }
});

app.get("/about",(req,res)=>{
    res.render("about")
});

app.get("/create",(req,res)=>{
    res.render("create")
    if(req.query.name && req.query.description && req.query.imageUrl && req.query.difficultyLevel){
        req.query.id = database.length.toString()
            
        const newRubikCube = new Cube({ name: req.query.name, description: req.query.description, difficultyLevel: req.query.difficultyLevel, imageUrl: req.query.imageUrl});
        newRubikCube.save()
        res.redirect("/")
    }
});

app.get("/details/:id",async(req,res)=>{
    let response = JSON.stringify(await Cube.findById(req.params.id));
        //console.log(JSON.parse(response))
        res.render("details",{cube: JSON.parse(response)})
    
});

app.get("/edit/:id",async(req,res)=>{
    let response = JSON.stringify(await Cube.findById(req.params.id));
    res.render("edit",{data: JSON.parse(response)})
})

app.post("/edit/:id", (req,res)=>{
    editCube(req)
    res.redirect("/")
})

app.get("*",(req,res)=>{
    res.render("404")
});
app.listen(port,()=>{console.log(`Server is listening on port ${port}`)})