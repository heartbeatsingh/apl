var config = require("../config/wallet");
module.exports = {
    buildRequestPost: async (type, body, uri) => {
        var headers = {
            'Authorization': `Bearer ${config.bitgo_access_token}`,
            'Content-Type': 'application/json'
        }
        return {
            url: `${config.bitgo_express_url}/api/v2/${uri}`,
            method: 'POST',
            headers: headers, json: true,
            body : body
        };
    },
    buildRequestGet: async (type, uri) => {
        var headers = {
            'Authorization': `Bearer ${config.bitgo_access_token}`,
            'Content-Type': 'application/json'
        }
        return {
            url: `${config.bitgo_public_api}/api/v2/${uri}`,
            method: 'GET',
            headers: headers
        };
    },
    publicPost: async (uri) => {
        var headers = {
            'Authorization': `Bearer ${config.bitgo_access_token}`,
            'Content-Type': 'application/json'
        }
        return {
            url: `${config.bitgo_public_api}/api/v2/${uri}`,
            method: 'POST',
            headers: headers
        };
    },
    AwaitPublicPost: async (uri) => {
        return {
            data: {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.bitgo_access_token}`,
                    'Content-Type': 'application/json'
                }
            },
            url: `${config.bitgo_public_api}/api/v2/${uri}`
        }
    },
    AwaitPublicGet: async (uri) => {
        return {
            data: {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.bitgo_access_token}`,
                    'Content-Type': 'application/json'
                }
            },
            url: `${config.bitgo_public_api}/api/v2/${uri}`
        }
    },
    AwaitPrivatePost: async (uri, inputdata) => {
        return {
            data: {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.bitgo_access_token}`,
                    'Content-Type': 'application/json'
                },
                data: inputdata 
            },
            url: `${config.bitgo_express_url}/api/v2/${uri}`
        }
    }

};

