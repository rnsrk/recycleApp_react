// Create express app
require('dotenv').config()
var db = require("./db/dbConfig.js")


const express = require("express")
const app = express()
const md5 = require("md5")

//bodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = process.env.HTTP_PORT 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints

app.get("/api/overview", (req, res, next) => {
    var sql = "select * from Products"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// get all products
app.get("/api/products/:id", (req, res, next) => {
    var sql = "select * from Products where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// create new product
app.post("/api/products/", (req, res, next) => {
    let errors=[]
    if (!req.body.DateOfPurchase){
        errors.push("No date of purchase specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        origin: req.body.Origin,
        dateOfPurchase: req.body.DateOfPurchase,
        purchasePrice : req.body.PurchasePrice,
        frameSize: req.body.FrameSize,
        bicycleType: req.body.BicycleType,
        brand: req.body.Brand,
        gears: req.body.Gears,
        color: req.body.Color,
        comment: req.body.Comment,
        count: req.body.Count,
        frameNumber: req.body.FrameNumber
    }
    var sql ='INSERT INTO Products (Origin, \
                                    dateOfPurchase, \
                                    PurchasePrice, \
                                    FrameSize, \
                                    BicycleType, \
                                    Brand, \
                                    Gears, \
                                    Color, \
                                    Comment, \
                                    Count, \
                                    FrameNumber) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    var params =[
            data.origin,
            data.dateOfPurchase,
            data.purchasePrice,
            data.frameSize,
            data.bicycleType,
            data.brand,
            data.gears,
            data.color,
            data.comment,
            data.count,
            data.frameNumber]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// Default response for any other request
app.use((req, res) => {
    res.status(404);
});