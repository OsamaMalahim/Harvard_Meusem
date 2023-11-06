import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// to bypass localissuer certificate failure
//export NODE_TLS_REJECT_UNAUTHORIZED=0

//All requests to the API begin with:
const API_URL = "https://api.harvardartmuseums.org";
//And all requests must also specify the resource you want to retrieve:
const API_URL_IMAGE = "https://api.harvardartmuseums.org/image";
//API Key
const API_KEY = "fadfdbd7-8c2a-483b-ad1d-26134e78590f";


app.get("/", async(req,res)=>{
    try {
        
    const result = await axios.get(API_URL_IMAGE,{params: {
        apikey: API_KEY, sort: "random",
        size: 1
    }});

    const ResultJSObject = result.data;
    console.log("Result JSON Object: >>>"+JSON.stringify(ResultJSObject));
    console.log("base Image>>>" + ResultJSObject.records[0].baseimageurl);
    
    res.render("index.ejs", {data: ResultJSObject.records[0]});

    } catch (error) {
        console.log("API error message:"+ error.message);
    }
});

app.listen(port,(req,res)=>{
    console.log(`server running on port ${port}`);
})






