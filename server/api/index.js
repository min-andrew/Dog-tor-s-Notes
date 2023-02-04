const router = require('express').Router();
const cloudinaryapi = require('./cloudinaryapi');

router.use('/api', cloudinaryapi);

module.exports = router;