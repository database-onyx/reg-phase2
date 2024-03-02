const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ImageModel = require("./model/tamilnadu_schema.js");
const ImageModel1 = require("./model/kerela_schema.js");
const path = require("path");
const app = express();
const PORT = 3004;
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

const dbUrl =
    "mongodb+srv://admin:Violinwalker%40onyx@image.ghzhekl.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(dbUrl, connectionParams)
    .then(function() {
        console.info(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    })
    .catch(function(e) {
        console.log("Error While connecting to database: ", e);
    });

const Storage = multer.memoryStorage({
    destination: "./uploads",
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage,
}).single("photo");

app.use(express.urlencoded({ extended: false }));

// Serve pin.html as the initial page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/pin.html');



    app.post("/", async(req, res) => {
        const pin = req.body.pin;
        if (pin === "1234") {
            res.redirect("/tamilnadu");
        } else if (pin === "4321") {
            res.redirect("/kerala");
        } else {
            res.redirect("/");
        }
    });
});
// Route for serving tamilnadu.html
app.get("/tamilnadu", (req, res) => {
    res.sendFile(__dirname + '/tamilnadu.html');
    app.post("/tamilnadu", function(req, res) {
        upload(req, res, async function(err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            } else {
                console.log(req.file);
                const name = req.body.name;
                const number = req.body.phonenumber;
                const capturedImage = req.body.capturedImage;
                const mimetype = req.body.capturedImageMimeType;

                const consoledraft = "Name : " + name + ", Phone Number: " + number;
                const coretest = "image string : " + capturedImage;
                console.log(consoledraft);
                console.log(coretest);

                if (capturedImage && capturedImage.length > 0) {
                    const newImage = new ImageModel({
                        name: name,
                        number: number,
                        image: { data: capturedImage, contentType: mimetype },
                    });
                    try {
                        await newImage.save();
                        console.log("Image sent to the database");
                        return res.redirect("/success");
                    } catch (error) {
                        console.error(error);
                        return res
                            .status(500)
                            .send({ error: "Failed to insert to DB: " + error.message });
                    }
                } else {
                    console.log("Image buffer is empty or undefined");
                    return res.status(400).send({ error: "No image data received" });
                }
            }
        });
    });
    app.get("/success", function(req, res) {
        res.sendFile(__dirname + "/public/success.html");
    });
});
// Route for serving kerala.html
app.get("/kerala", (req, res) => {
    res.sendFile(__dirname + '/kerala.html');
    app.post("/kerala", function(req, res) {
        upload(req, res, async function(err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            } else {
                console.log(req.file);
                const name = req.body.name;
                const number = req.body.phonenumber;
                const capturedImage = req.body.capturedImage;
                const mimetype = req.body.capturedImageMimeType;

                const consoledraft = "Name : " + name + ", Phone Number: " + number;
                const coretest = "image string : " + capturedImage;
                console.log(consoledraft);
                console.log(coretest);

                if (capturedImage && capturedImage.length > 0) {
                    const newImage = new ImageModel1({
                        name: name,
                        number: number,
                        image: { data: capturedImage, contentType: mimetype },
                    });
                    try {
                        await newImage.save();
                        console.log("Image sent to the database");
                        return res.redirect("/success");
                    } catch (error) {
                        console.error(error);
                        return res
                            .status(500)
                            .send({ error: "Failed to insert to DB: " + error.message });
                    }
                } else {
                    console.log("Image buffer is empty or undefined");
                    return res.status(400).send({ error: "No image data received" });
                }
            }
        });
    });
    app.get("/success", function(req, res) {
        res.sendFile(__dirname + "/public/success.html");
    });
});

app.listen(PORT, function() {
    console.log("Server is running on port:", PORT);
});