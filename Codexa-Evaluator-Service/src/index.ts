import express,{Express} from "express";
import serverConfig from "./config/serverConfig.js";

const app:Express=express();

app.listen(serverConfig.PORT,()=>{
    console.log(`Server started at ${serverConfig.PORT}`);
    // console.log("Chalne laga basically");
})
/*
There is a flag as --kill-others
it kills others process if one exits or dies
*/