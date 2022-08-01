const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const app = express();

const multer = require("multer");

app.use(multer().any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Sushma123:oPRb0pySPR0iiGiz@cluster0.wp92b.mongodb.net/testyyc0B6WREXuiFiB6", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected on 27017"))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express App running on port ' + (process.env.PORT || 3000))
});