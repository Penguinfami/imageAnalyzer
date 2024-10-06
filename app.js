const express = require('express');
const {analyzeImage} =require('./ai.js');
var bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const imageUrl = req.body.url;
    const result = await analyzeImage(imageUrl);
    res.status(200).json(result);
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);