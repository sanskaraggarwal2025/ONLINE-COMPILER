const express = require("express");
const cors = require("cors");
const { executeCpp} = require("./executeCpp")
const {generateFile} = require("./generateFile");


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',(req,res) =>{
 return res.json({ hello : "sanskar!"})
})


app.post("/run",async(req,res) =>{
 // console.log(req.body);

 const{language = "cpp",code} = req.body;

 if(code === undefined){
  return res.status(400).json({success: false, error: "Empty code body"});
 }

 // process.on("unhandledRejection",err =>{
 //  console.log(`send this to error tracking: ${err.stack}`);
 //  console.log("------------------");
 // })


 try{
 //need to generate a c++ file with the content from the request
 const filepath = await generateFile(language,code);
 //we need to run the file and send the response
 const output = await executeCpp(filepath);
 return res.json({filepath,output});
 }catch(err){
  res.status(500).json({err});
 }
})
app.listen(5000,() =>{
 console.log(`app is running at port 5000`);
});