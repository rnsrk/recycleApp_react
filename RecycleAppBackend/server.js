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
    if (!req.body.dateOfPurchase){
        errors.push("No date of purchase specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        origin: req.body.origin,
        dateOfPurchase: req.body.dateOfPurchase,
        purchasePrice : req.body.purchasePrice,
        frameSize: req.body.frameSize,
        bicycleType: req.body.bicycleType,
        brand: req.body.brand,
        gears: req.body.gears,
        color: req.body.color,
        comment: req.body.comment,
        count: req.body.count,
        frameNumber: req.body.frameNumber
    }
    const sql ='INSERT INTO Products (origin, \
                                    dateOfPurchase, \
                                    purchasePrice, \
                                    frameSize, \
                                    bicycleType, \
                                    brand, \
                                    gears, \
                                    color, \
                                    comment, \
                                    count, \
                                    frameNumber) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    const params =[
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

// Update product
app.patch("/api/products/:id", (req, res, next) => {
    const data = {
        origin: req.body.origin,
        dateOfPurchase: req.body.dateOfPurchase,
        purchasePrice : req.body.purchasePrice,
        frameSize: req.body.frameSize,
        bicycleType: req.body.bicycleType,
        brand: req.body.brand,
        gears: req.body.gears,
        color: req.body.color,
        comment: req.body.comment,
        count: req.body.count,
        frameNumber: req.body.frameNumber
    }
    const sql = 
        `UPDATE products set 
        origin = COALESCE(?,origin), 
        dateOfPurchase = COALESCE(?,dateOfPurchase), 
        purchasePrice = COALESCE(?,purchasePrice),
        frameSize = COALESCE(?,frameSize),
        bicycleType = COALESCE(?,bicycleType),
        brand = COALESCE(?,brand),
        gears = COALESCE(?,gears),
        color = COALESCE(?,color),
        comment = COALESCE(?,comment),
        count = COALESCE(?,count),
        frameNumber = COALESCE(?,frameNumber),
        WHERE id = ?`
    const params =[
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
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

// Delete product
app.delete("/api/products/:id", (req, res, next) => {
    db.run(
        'DELETE FROM Products WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})


// Default response for any other request
app.use((req, res) => {
    res.status(404);
});