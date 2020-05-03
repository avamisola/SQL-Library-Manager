const express = require('express');
const router = express.Router();

//root get, redirect to books
router.get('/', (req, res, next) => {
    res.redirect("/books");
});

module.exports = router;