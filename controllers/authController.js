const User = require('../models/users')
const jwt = require('jsonwebtoken')
const maxAge = 60*60*24;

const createToken = (id) => {
  return jwt.sign({id}, 'gizli kelime', {expiresIn: maxAge})
}

const login_get = (req, res) => {
  res.render("login", { title: "Giriş yap!" });
};

const login_post = async (req, res) => {
  const {username,password} = req.body
  try {
    const user = await User.login(username,password)
    const token = createToken(user._id)
    //http için httponly s için secure
    res.cookie('jwt', token,{httpOnly: true,maxAge: maxAge*1000})
    res.redirect('/admin')
  } catch (err) {
    console.log(err);
  }
};

const signup_get = (req, res) => {
  res.render("signup", { title: "Kayıt ol!" });
};

const signup_post = (req, res) => {
  const user = new User(req.body)
  user.save()
  .then(result => {
    res.redirect('/login')
  })
  .catch(err => console.log(err))
};

const logout_get = (req, res) => {
  //cookie sıfırlama
  res.cookie('jwt','',{maxAge:1})
  res.redirect('/login')
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout_get,
};
