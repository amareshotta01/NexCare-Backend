const express = require("express");
const res = require("express/lib/response");
const connectDB = require('./config/db')

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({message : "Hello NexCare!"});
})

app.listen(port,()=>{
    console.log("Server Listening at", port);
});