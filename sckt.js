var aUCTIONS = require('./app/modules/auctions/schemas/auction');
var uSER = require('./app/modules/users/schemas/user');

var results, row = [];

exports.scktFun = function(io) {
    io.on('connection', function (socket) {
        socket.on('join', function (data) {
            socket.emit('joined',"from joind123");
        });

        socket.on('auctionOff', function (data) {
            uSER.update({auction_status:false},{where:{id:data.userId}}).then(row => {
                aUCTIONS.destroy({where:{id:data.id}});
            });
            socket.emit('auctionOff',"from joind123");
        });
        socket.on('auctionOn', async function (data) {
            var results = await aUCTIONS.findOne({include : [{ model: uSER}],order:[['id',"ASC"]]});  
            socket.emit('auctionOn',results);
        });

    });
}