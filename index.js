import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));

//All requests to the API begin with:
const API_URL = "https://api.harvardartmuseums.org";
//And all requests must also specify the resource you want to retrieve:
const API_URL_IMAGE = "https://api.harvardartmuseums.org/image";
//API Key
const API_KEY = "fadfdbd7-8c2a-483b-ad1d-26134e78590f";


app.get("/", async(req,res)=>{
    const config = {apikey: API_KEY, size: 1};
    const result = await axios.get(API_URL_IMAGE,config);
    const ResultJSObject = result.data;
    console.log("base Image>>>" + ResultJSObject.records[0].baseimageurl);
    
    res.render("index.ejs", {data: ResultJSObject.records[0].imageid});
});

app.listen(port,(req,res)=>{
    console.log(`server running on port ${port}`);
})






