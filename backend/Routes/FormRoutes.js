const express = require('express');
const multer = require('multer');
const { authenticate } = require("../Middleware/Auth");
const { FormDataModel } = require("../Model/FormData");
const FormDataRoute = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/Product");
    },
    filename: async (req, file, cb) => {
        // const id = req.postId.toString();
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

FormDataRoute.get('/:id', authenticate, async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const formData = await FormDataModel.find();
        res.send(formData)
    } catch (er) {
        res.send(er.message)
    }
})

FormDataRoute.post('/add', authenticate, upload.array('photos'), async (req, res) => {
    // console.log(req)
    try {
        const userId = req.body.userId;
        const { name, age, address } = req.body;
        const photos = req.files.map(file => file.Buffer);
        const newFormData = new FormDataModel({
            userId,
            name,
            age,
            address,
            photos
        });
        await newFormData.save();
        console.log("ne", newFormData)
        res.status(201).json({ message: 'Form data submitted successfully' });

    } catch (er) {
        res.send(er.message)
    }
})

module.exports = {
    FormDataRoute
};