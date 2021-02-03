//expressi dahil edip ondan router üretiyoruz
const express = require("express");
const router = express.Router();

//controller'ı çağırdım
const adminController = require("../controllers/adminController");

//admincontroller üzerinden admin_index'i çağırıp işlemi tamamladım.
router.get("/", adminController.admin_index);

//yeni yazı ekleme sayfası:
router.get("/add", adminController.admin_add_post);

//yeni yazı ekleme:
router.post("/add", adminController.admin_add);

/*fetch ile tanımladıgımız linke artık app.get değil de 
  delete altında ulasıyoruz ve callback func ile yakaladığımız
  id'i req.params.id ile yakalayıp id değerine alıp findByIdAndDelete ile siliyoruz*/
router.delete("/delete/:id", adminController.admin_delete);

module.exports = router;
