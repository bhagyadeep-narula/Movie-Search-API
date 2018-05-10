const express = require('express');
const logger = require('morgan');
const request = require('request');
const PORT = process.env.PORT || 3000 ;
const app = express();
const open = require('open');

app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.render("search");
});

app.get("/results", (req, res) =>{
    let query  = req.query.search;
    let url= "http://www.omdbapi.com/?s="+ query + "&apikey=thewdb";
    request(url, (error, response, body) =>{
        if(!error && response.statusCode == 200) {
            let parsedData = JSON.parse(body);
            res.render("results", {data: parsedData});
        }
    });
});

app.listen(PORT, () =>{
    console.log("Server Has Started on the port");
});
