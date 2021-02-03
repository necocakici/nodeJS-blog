//Blog'a ulaşımını sağlıyorum
const Blog = require("../models/blogs");

//admin index sayfası callbackimizi direkt olarak yeni
//bir admin_index fonksiyonumuza yapıştırıyoruz
const admin_index = (req, res) => {
  //tüm blogları bulup admin sayfasına yollama:
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => console.log(err));
};

//add için aynı işlemler:
const admin_add = (req, res) => {
  //Blog türünde yeni bir blog isimli değişken tanımladık
  //içerisine doğrudan req.body den gelen objeyi attık
  const blog = new Blog(req.body);
  //blog.save ile blogu kaydettik
  blog
    .save()
    //basarılı olursa admin ekranına yönlendik
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
};

//yeni yazı ekleme:
const admin_add_post = (req, res) => {
  res.render("add", { title: "Yeni yazı ekle!" });
};

//delete için aynı işlemler
const admin_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    //adminde yakalamak için gelen cevabı json formatında döndürüyoruz
    .then((result) => {
      res.json({ link: "/admin" });
    })
    .catch((err) => console.log(err));
};

//birden fazla fonksiyon döndüreceğim için obje olarak yolluyorum
module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
};
