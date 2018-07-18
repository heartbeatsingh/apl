var Sequelize = require('sequelize');

// module.exports =  new Sequelize('mysql://root:@localhost:3000/node_exchange', opts);
 module.exports = {     
    secret : "secret",
    savePath : "./public/uploads/",
    connection : new Sequelize('apl', 'root', 'root',{
        dialect: 'mysql',
        host: 'localhost', 
        operatorsAliases: false,
        define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
                freezeTableName: true,
                underscored: true,
                timestamps: true
        }
    }),
    //mongo: {host : 'localhost', db: 'apl', username : 'root', password : ''}
    
} 