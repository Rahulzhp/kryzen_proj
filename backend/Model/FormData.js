const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    photos: [{ type: Buffer, required: true }],
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = {
    FormDataModel
}