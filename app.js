const express = require('express');
const {analyzeImage} =require('./ai.js');
var bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', upload.single('image'), async (req, res) => {
    const imageUrl = req.file.path;
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

app.get('/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    // const file = `./uploads/${imageId}`;
    res.status(200).sendFile('uploads/' + imageId, { root: path.resolve() });
});

app.post('/image', upload.single('image'), (req, res) => {
    console.log('blob', req.file, typeof(req.file));
    res.status(200).json({id: req.file.path});
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);