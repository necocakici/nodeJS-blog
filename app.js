const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const Blog = require("./models/blogs");
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const {requireAuth, checkUser} = require('./middlewares/authMiddleware')


const { response } = require("express");

//mongodb bağlantı url
const dbURL =
  "mongodb+srv://neco:asd123@nodeblog.kjiy5.mongodb.net/node-blog?retryWrites=true&w=majority";

//mongoose ile mongodb db'mize bağlanıyoruz
//.then .catch ile bağlantı başarılı mı değil mi kontrolü
//başarılıysa portu dinlemeye başla
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000, () => {
      console.log("3000 dinleniyor");
    });
  })
  .catch((err) => console.log(err));

//Ejs görüntü motoruyla calıscaz diyoruz
app.set("view engine", "ejs");

/*arakatman olarak express ile public klasörünü
statik olarak tanımlıyoruz böylece erişim izni veriyoruz */
app.use(express.static("public"));

//data parser işlemi gerçekleştirmemize yarıyor
//req.body ile aldıgımız objelere ulaşmamız için
app.use(express.urlencoded({extended: true}))

//tiny/dev ile log'a rapor bastırır.
app.use(morgan("dev"));

app.use(cookieParser())

app.get('*',checkUser)

// '/' gelen istek ve cevabı düzenlediğimiz yer
app.get("/", (req, res) => {
  //anasayfamızı bloglar isimli bi sayfaya yönlendiriyoruz
  res.redirect('/blog')
});

//arakatmanla router'ımızı dahil ediyoruz
// eğer route ara katmanıma ilk param olarak
//blog üzerine gelen isteği farkedebiliriz.
app.use('/blog',blogRoutes)
app.use('/admin',requireAuth ,adminRoutes)
app.use('/', authRoutes)

app.get("/about", (req, res) => {
  res.render("about", { title: "Hakkımızda" });
});

//Yönlendirme
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

/*En alta ara katman oluşturuyoruz, 
404 sayfamıza yönlenmesi için*/
app.use((req, res) => {
  //status'e 404 diyoruz.
  res.status(404).render("404", { title: "Not Found" });
});
