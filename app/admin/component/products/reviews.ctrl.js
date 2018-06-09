module.exports = {
    addReview: function (req, res) {
        var condition = {
            _id: req.params.id
        }
        models.products.find(condition).then(function (result) {
            if (result.length > 0) {
                var reviewData = {
                    $push: {reviews: req.body}
                }
                models.products.findOneAndUpdate(condition, reviewData, {new : true}).exec(function (err, data) {
                    if (err) {
                        res.status(200).json({
                            status: false,
                            error: err
                        })
                    } else if (data) {
                        res.status(200).json({
                            status: true,
                            message: "success",
                            result: data
                        })
                    } else {
                        res.status(200).json({
                            status: false,
                            message: "No records Avialable"
                        })
                    }
                })

            } else {
                res.status(200).json({
                    status: false,
                    message: "No records Avialable"
                })
            }
        })
    },
    updateReview: function (req, res) {
        var condition = {'reviews._id': req.params.id ,'_id' : req.params.postId}
        var updateData = {'reviews.$.description': req.body.description}
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
    deleteReview: function (req, res) {
        var condition = {'reviews._id': req.params.id , '_id' : req.params.postId}
        var reviewData = {
            $pull: {'reviews': {'_id': req.params.id}}
        }
        models.products.findOneAndUpdate(condition, reviewData).exec(function (err, data) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (data) {
                res.status(200).json({
                    status: "success",
                    message: "reviews deleted successfully"
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


