const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");


router.get("/", blogController.blog_index);

// path'e eklediğimiz : sonrası param olur, onu req(istek).params.id ile yakalayabiliriz
// tıkladığımız şeyin idsine ulaşırız, blog'da findbyid ile bulup yeni oluşturduğumuz sayfaya
// render ederken resultı parametre olarak yollar orda ejs ile kullanırız
router.get("/:id", blogController.blog_content);

module.exports = router