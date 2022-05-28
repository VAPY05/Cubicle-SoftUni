const express = require("express");
const handlebars = require("express-handlebars")

const app = express();
const port = 5000;

app.use("/static",express.static("src/public"))

app.engine("hbs",handlebars.engine({
    extname: "hbs"
}))

app.set("view engine", "hbs")
app.set('views','./src/views')


app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/about",(req,res)=>{
    res.render("about")
});

app.get("/create",(req,res)=>{
    res.render("create")
});

app.get("/details/:id",(req,res)=>{
    res.render("details")
});

app.get("*",(req,res)=>{
    res.render("404")
});
app.listen(port,()=>{console.log(`Server is listening on port ${port}`)})