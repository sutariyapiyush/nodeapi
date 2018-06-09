var jwt = require('jsonwebtoken');

module.exports = {
    addUsers: function (req,res) {
        var postData = req.body
        models.users(postData).save().then(function (result) {
            res.status(200).json({
                status: "success",
                result: result
            })
        }).catch(function (err) {
            res.status(200).json({
                status: false,
                error: err
            })
        })
    },
    getUsers: function (req, res) {
        var condition = {_id: req.params.id}
        models.users.findOne(condition).exec(function (err , result) {
            if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    getAllUsers: function (req, res) {
        models.users.find().exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    editUsers: function (req, res) {
        var condition = {_id: req.params.id}
        var updateData = req.body
        models.users.findOneAndUpdate(condition, updateData, {new : true}).exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    deleteUsers: function (req, res) {
        var condition = {_id: req.params.id}
        models.users.findOne(condition).exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                models.users.remove(condition).then(function () {
                    res.status(200).json({
                        status: "success",
                        message: "User deleted successfully"
                    })
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    /*
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     * @desc : Login Using Google or social Login
     */
    login: function (req, res) {
        var type = req.body.type;
        var requiredParams = ['email'];
        helper.validateRequiredParams(req, res, requiredParams).then(function (response) {
            var modelName = models.users;
            var condition = {
                email: req.body.email
            }
            var fields = [""];
            //console.log(req.body, 'req.body');
            modelName.findOne(condition).select(fields).exec(function (err, data) {
                if (typeof data != 'undefined' && data != '' && data != null) {
                        /*
                         * JWT token generation
                         */
                        var token = jwt.sign(data, process.env.JWT_SECRET_KEY);
                        res.setHeader('x-access-token', token);
                        var response = [];
                        response.data = data;
                        helper.formatResponse(response, res, '');
                    
                } else {
                    var error = {
                        msg : "user not found."
                    }
                    helper.formatResponse('', res, error);
                }

            }).catch(function (error) {
                helper.formatResponse('', res, error);
            });
        });
    },

}