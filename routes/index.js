const express = require('express');
const router = express.Router();

/*get home route*/
router.get('/', (req, res, next) => {
    res.redirect("/books")
})

module.exports = router;