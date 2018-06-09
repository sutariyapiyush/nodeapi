module.exports = {
    addProduct: function (req, res) {
        var postData = req.body
        postData.createdBy = requestUserId;
        postData.updatedBy = requestUserId;
        models.products(postData).save().then(function (result) {
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
    getProduct: function (req, res) {
        var condition = {_id: req.params.id}
        models.products.findOne(condition).exec(function (err, result) {
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
    getAllProduct: function (req, res) {
        var condition = {
            isDelete : false
        }
        models.products.find(condition).exec(function (err, result) {
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
    editProduct: function (req, res) {
        var condition = {_id: req.params.id}
        var updateData = req.body
        updateData.updatedBy = requestUserId;
        models.products.findOneAndUpdate(condition, updateData, {new : true}).exec(function (err, result) {
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
    deleteProduct: function (req, res) {
        var condition = {_id: req.params.id}
        models.products.findOne(condition).exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                models.products.remove(condition).then(function () {
                    res.status(200).json({
                        status: "success",
                        message: "product deleted successfully"
                    })
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    }
}