const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//blog semamızın modelini tanımldığımız yer
const blogSchema = new Schema({
  //istersek sadece title: String şeklinde
  //tanımlayabiliriz fakat birden fazla özellik
  //tanımlamak için obje de açabiliriz
  //.Net'te model
  title: {
    type: String,
    required: true
  },
  //kısa açıklma
  short:{
      type:String,
      required: true
  },
  //uzun açıklama
  long:{
      type: String,
      required: true
  }
  //timestamp ile ne zaman girildiğini oto kaydeder.
}, {timestamps:true});

//İlk param şemaya ulaşırken kullancagımız isim
//İkinci param şemayı veriyoruz
//.Net'te tablo
const Blog = mongoose.model('Blog', blogSchema)

//çıktısını alıyoruz, ulaşabilmek için
module.exports = Blog

