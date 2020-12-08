let express = require('express');
let router = express.Router();
let pdfDoc = require('pdfkit');

router.get('/:id', (req, res, next) => {
    let pdf = new pdfDoc();
    pdf.text("trial text");
    pdf.pipe(res);

    pdf.end();
})


module.exports = router;