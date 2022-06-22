"use strict"
const Sequelize =require('sequelize')

const sequelize = new Sequelize('DB-name','userName','password',{  //replace your db name ,username and password
    dialect:'mysql',
    host:'#######',
    port:3306,
    logging:false

})
module.exports=sequelize