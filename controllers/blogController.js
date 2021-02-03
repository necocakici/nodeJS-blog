//Blog'a ulaşımını sağlıyorum
const Blog = require("../models/blogs");

const blog_index = (req, res) => {
    Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { title: "Anasayfa", blogs: result });
      })
      .catch((err) => console.log(err));
  }

const blog_content = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("blog", { title: "Blog", blog: result });
      })
      .catch((err) => {
        res.status(404).render("404", { title: "Not Found" });
      });
  }



module.exports = {
    blog_index,
    blog_content
}