var Sequelize = require('sequelize');

// module.exports =  new Sequelize('mysql://root:@localhost:3000/node_exchange', opts);
 module.exports = {     
    secret : "secret",
    savePath : "./public/uploads/",
    connection : new Sequelize('s1_exchg1', 's1_exch1', 'j6vP3cm7',{
        dialect: 'mysql',
        host: '192.168.1.16', 
        operatorsAliases: false,
        define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
                freezeTableName: true,
                underscored: true,
                timestamps: true
        }
    }),
    mongo: {host : '192.168.1.114', db: 'exchange_mongo', username : '', password : ''}
    
} 