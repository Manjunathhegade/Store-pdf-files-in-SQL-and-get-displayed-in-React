const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

const fileupload = sequelize.define('test-expense-blob', {
    id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    file: Sequelize.BLOB,
    filename:Sequelize.STRING,
    mimeType:Sequelize.STRING
},
{
    timestamps: false,
    freezeTableName: true
}
)

module.exports = fileupload