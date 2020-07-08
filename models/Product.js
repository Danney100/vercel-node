// a schema that gives some structure to the data that will
// be stored in the database.

const mongoose = require("mongoose");  //Interacts with MongoDB database instance.
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    publicKey: {
        type: String,
        required: [true, 'Public Key is required'],
        minlength: 56,
        maxlength: 56
    },
    productPrice: {
        type: Number,
        required: [true, 'Product Price is required']
    },
    productTitle: {
        type: String,
        required: [true, 'Product Title is required']
    },
    productDescription: {
        type: String
    },
    productUrl: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    memoIds: {
      type: Array,
      required: false
    }
});


module.exports = mongoose.model("Products", ProductSchema);
