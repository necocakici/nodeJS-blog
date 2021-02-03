const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//user semamızın modelini tanımldığımız yer
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:{
      type:String,
      required: true
  }
});

userSchema.statics.login = async function (username,password){
    //o username'e göre db'de aramaa yapıyorum
    const user = await this.findOne({username})
    //varsa
    if (user){
        //şifreleri bcrypt ile karşılaştırıyorum
        const auth = await bcrypt.compare(password,user.password)
        //true dönerse user'ı döndürüyorum
        if (auth){
            return user
        }else{
            throw Error('Parola hatalı')
        }
    }else{
        throw Error('Kullanıcı bulunamadı.')
    }
}


//kayıt olmadan önce şifrenin cryptlenmesi:
userSchema.pre('save', async function(next){
    //burası calısmadan projenin devam etmemesi gerekiyor
    // await = gerçekleşene kadr beklicek
    const salt = await bcrypt.genSalt()
    //schemaya gelen pass'i alıp ilk paramla pass'i ikide de saltı yolluyoruz
    this.password = await bcrypt.hash(this.password, salt)
    //devam etmesi için
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User

