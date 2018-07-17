
pe = require('parse-error');
var request = require('request');

ReE = function (res, code, msg, error) {
    let send_data = { success: false, status: code, message: msg, error: error };

    return res.json(send_data);
}

ReS = function (res, code, msg, data, token) {
    let send_data = { success: true, status: code, message: msg, token: token, data: data };
    return res.json(send_data);
};
returnOP = {
    success: function (response, statusCode, message, data, token) {
        console.log("return success................************");
        let returnData = { status: true, statusCode: statusCode, message: message };
        if (data != undefined || data != null) {
            returnData['data'] = data;
        }
        if (token != undefined || token != null) {
            returnData['token'] = token;
        }
        return response.json(returnData);
    },
    fail: function (response, statusCode, message, error) {
        console.log("return failed................???????");
        let returnData = { status: false, statusCode: statusCode, message: message };
        if (error != undefined || error != null) {
            returnData['error'] = error;
        }
        return response.json(returnData);
    }
};
date_time = function () {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    return formatted;
};

await_post_request = function (input) {
    return new Promise(function (resolve, reject) {
        request.post(input, function (err, resp, body) {
            console.log("In Request complete")
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}
isObjEmpty=function isObjEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
