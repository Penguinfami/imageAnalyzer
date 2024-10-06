const express = require('express');
const {analyzeImage} =require('./ai.js');
var bodyParser = require('body-parser')
const fs = require('fs');

const multer = require('multer');

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

const upload = multer({ dest: 'uploads/' });

app.post('/', upload.single('image'), async (req, res) => {
    console.log('blob', req.file, typeof(req.file));

    const imageUrl = req.file.path;
    console.log('Image uploaded to:', imageUrl);

    const result = await analyzeImage(imageUrl);

    fs.unlink(imageUrl, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted:', imageUrl);
        }
      });
    res.status(200).json(result);
    
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);