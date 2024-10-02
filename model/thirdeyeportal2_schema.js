const { text } = require("body-parser");
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        data: Buffer,
        contentType: String
            // required: true
    }
});


const ImageModel1 = mongoose.model("portal2", imageSchema,"portal2");
module.exports = ImageModel1;
