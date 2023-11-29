const config = require('../src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

async function login(req, res) {
    // const { email, password } = req.body
    
    // const query = `SELECT * FROM users WHERE email='${email}'`
    // const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    res.render('login')
}

async function register(req, res) {
    res.render('register')
}

module.exports = {
    login,
    register
}