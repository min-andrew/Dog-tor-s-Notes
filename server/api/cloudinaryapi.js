const router = require('express').Router();
var cloudinary = require('cloudinary').v2;
console.log(process.env.CLOUDINARY_API_NAME)
// CLOUDINARY_API_KEY="781845853561475"
// CLOUDINARY_API_SECRET="TvR-N19AyNujkSQfki12YYpXr_w"
// CLOUDINARY_API_NAME="dtah7hwfr"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:dog')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});

router.post('/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dog',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router;