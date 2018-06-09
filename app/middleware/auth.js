/*
 * Authencation middleware with session
 
 * list of allowed URLs without login
 */
var jwt = require('jsonwebtoken');
var allowed = [
    {url: '/product', method: 'GET'},
    {url: '/login', method: 'POST'},
    {url: '/user', method: 'POST'},
    {url: '/setup', method: 'GET'},
];



function checkIfRouteExistInAllowedList(route, method) {
    var evens = _.filter(allowed, function (obj) {
        return route.indexOf(obj.url) !== -1 && (obj.method === "ALL" || obj.method === method);
    });
    if (evens.length > 0) {
        return true;
    } else {
        return false;
    }
}
/**
 *  middleware enabled or not
 * @type Boolean
 */
var enabled = true;

/**
 * the middleware function
 * @param {type} onoff : to enable middleware
 * @returns {Function}
 */
module.exports = function (onoff) {
    enabled = (onoff == 'on') ? true : false;
    return function (req, res, next) {
        global.requestLanguage = req.headers.language;
        var originalUrlAllowed = checkIfRouteExistInAllowedList(req.originalUrl, req.method);
        try {
            if (typeof req.headers['lang-code'] != 'undefined' && req.headers['lang-code'] != '') {
                langCode = req.headers['lang-code'];
                appMessage = require('../helpers/language/' + langCode + ".msg.js");
            } else {
                langCode = '';
                appMessage = require('../helpers/language/' + process.env.MSGLANG + ".msg.js");
            }
        } catch (e) {
            langCode = '';
            appMessage = require('../helpers/language/' + process.env.MSGLANG + ".msg.js");
        }
        if (enabled && originalUrlAllowed === false) {
            // check header or url parameters or post parameters for token
            var token = req.headers['x-access-token'];
            // decode token
            if (typeof token !== 'undefined' && token)
            {
                // verifies secret and checks exp
                jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                    if (err) {
                        helper.formatResponse('', res, "Failed to authenticate token.");
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        if (typeof decoded._doc !== 'undefined') {
                            global.requestUserId = decoded._doc._id;
                        } else {
                            global.requestUserId = '';
                        }
                        next();
                    }
                });
            } else {
                // console.log('dsd'); 
                // if there is no token
                var error = {
                    httpstatus: 401,
                    msg: appMessage.common.error.noToken.msg
                };
                helper.formatResponse('', res, error);
            }
        } else {
            if (typeof token !== 'undefined' && token)
            {
                // verifies secret and checks exp
                jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                    if (err) {
                        helper.formatResponse('', res, "Failed to authenticate token.");
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        if (typeof decoded._doc !== 'undefined') {
                            global.requestUserId = decoded._doc._id;
                        } else {
                            global.requestUserId = '';
                        }
                        next();
                    }
                });
            } else {
                /*
                 * If jwt is disabled
                 */
                global.requestUserId = '';
                next();
            }
        }
    }
};