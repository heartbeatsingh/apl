// config.js
module.exports = {
    'secret': process.env.SECRET || 'supersecret',
    'base_url': process.env.BASEURL || 'http://localhost:3000',
    'fornt_url': process.env.FORNTURL || 'http://localhost:4200',
    'bc_mode': 'test',
    coin_prefix: 't',
    coins: [
        { 'name': 'btc', 'platform': 'bitgo' , 'wallet' : '5b14ed9b899698a60316213bff774bc4', 'passphrase' : 'CssWmIkgCFCqkteGCCKc' },
        { 'name': 'bch', 'platform': 'bitgo' , 'wallet' : '5b18da1277f976a30366ab69d358523c', 'passphrase' : 'LQEOXxHHNMweIYUKfZjF'},
        { 'name': 'btg', 'platform': 'bitgo' , 'wallet' : '5b14ed9b899698a60316213bff774bc4', 'passphrase' : 'CssWmIkgCFCqkteGCCKc'},
        { 'name': 'eth', 'platform': 'bitgo' , 'wallet' : '5b18f61fd27abb9e039213937df62e7d', 'passphrase' : 'nxTmIdtaBqLFAROmdpnC'},
        { 'name': 'ltc', 'platform': 'bitgo' , 'wallet' : '5b18dbef7e2aab83035ca7b43bab25ea', 'passphrase' : 'JzLoxFgcxYJtklTvmqaK'},
        { 'name': 'xrp', 'platform': 'bitgo' , 'wallet' : '5b14ed9b899698a60316213bff774bc4', 'passphrase' : 'CssWmIkgCFCqkteGCCKc'}
    ],
    bitgo_access_token: process.env.BITGOTOKEN || 'v2x68b2c0391a64f851ffd38edc3c007cb0a7bbdcf91da3bba5fd41275503ed8dc5',
    //v2x050c2ba68f6c815bff003e1f5cfcbd63dfa58c2587fcf22d89163bede6cb28f7
    bitgo_express_url: process.env.BITGO_EXPRESS_HOST || 'http://localhost:3080',
    bitgo_public_api: process.env.BITGO_API || 'https://test.bitgo.com',
    enterprise: process.env.ENTERPRISE || '5afa7ef666aeaea4072e3ab65565e0bf'
};