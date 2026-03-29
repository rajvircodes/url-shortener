const {nanoid} = require('nanoid')

const generateShortCode = () => nanoid(8)

module.exports = generateShortCode