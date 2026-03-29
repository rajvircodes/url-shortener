const express = require('express');
const router = express.Router()
const {shortenUrl, redirectUrl, getAllUrls} = require('../controllers/url.controller')

router.post('/shorten', shortenUrl)
router.get('/all', getAllUrls)

router.get('/:code', redirectUrl)

module.exports = router