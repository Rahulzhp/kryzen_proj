const express = require('express');
const multer = require('multer');
const { authenticate } = require("../Middleware/Auth");
const { FormDataModel } = require("../Model/FormData");
const FormDataRoute = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/product");
    },
    filename: async (req, file, cb) => {
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

FormDataRoute.get('/', async (req, res) => {
    try {
        const formData = await FormDataModel.find();
        res.send(formData)
    } catch (er) {
        res.send(er.message)
    }
})
FormDataRoute.get("/single/:id", async (req, res) => {
    const ids = req.params.id;
    const data = await FormDataModel.findOne({ _id: ids });
    const parentDirectory = path.join(__dirname, "..");
    const imagesDirectory = path.join(parentDirectory, "uploads/product");
    console.log(imagesDirectory);
    fs.readdir(imagesDirectory, async (err, files) => {
        if (err) {
            return res.status(500).json({ msg: "Failed to read images directory" });
        }
        const filteredImages = files.filter((file) => file.includes(ids));
        const imagesData = [];
        filteredImages.forEach((imageName) => {
            const imagePath = path.join(imagesDirectory, imageName);
            const imageData = fs.readFileSync(imagePath);
            imagesData.push({
                name: imageName,
                data: `data:image/jpeg;base64,${imageData.toString("base64")}`,
            });
        });
        res.status(200).send({
            data: data,
            images: imagesData,
        });
    });
});

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