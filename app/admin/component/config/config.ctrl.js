/**
* This is the config class.
* It contains all the methods of config
* @class configWebController
*/

var defaultMasterData = require('../../../helpers/default.schema');
var asyncLoop = require('node-async-loop');
var bcrypt = require("bcrypt-nodejs");
var randomstring = require("randomstring");

module.exports = {

    /**
    * Action for inserting default master data
    *
    * @method insterDefaultMasterData
    * @param {req} request
    * @param {res} response
    * @return {status} res -If it returns error then the status is false otherwise true. 
    */
   
    insterDefaultMasterData: function (req, res) {
        var masterCountor = 0;
        var modelName = req.params.modelName;
        if (typeof modelName != 'undefined' && modelName != '') {
            _mongoose.bulkSave(modelName, defaultMasterData[modelName]).then(function () {
                res.json({
                    success: true
                });
            }).catch(function (error) {
                winston.log('error');
                helper.formatResponse('', res, error.error);
            });
        } else {
            _.each(defaultMasterData, function (elm, ind) {
                _mongoose.bulkSave(ind, elm).then(function () {

                    masterCountor++;
                    if (_.size(defaultMasterData) == masterCountor) {
                        res.json({
                            success: true
                        });
                    }
                }).catch(function (error) {
                    helper.formatResponse('', res, error.error);
                });
            });
        }
    },

    /**
    * Action for inserting bulk data
    *
    * @method bulkUserInsert
    * @param {req} request
    * @param {res} response
    * @return {status} res -If it returns error then the status is false otherwise true. 
    */
   
    bulkUserInsert: function (req, res) {
        var data = [];
        asyncLoop(data, function (item, next) {
            var insertData = new models.users({
                name: item.name,
                type: item.type,
                email: item.email,
                password: bcrypt.hashSync(item.password),
                udid: item.udid,
                deviceType: item.deviceType,
                country: item.country,
                state: item.state,
                city: item.city,
                isVerified: item.isVerified,
                preferredCity: item.city,
                profilePic: {fileName: 'user-profile-default-icon.png', fileSize: '1024', folderName: 'profile/users/'}
            });
            _mongoose.save(insertData).then(function (outputData) {
                var bubData = new models.bubs({
                    createdBy: outputData._id,
                    updatedBy: outputData._id,
                    name: item.bubName,
                    dob: item.dob,
                    petType: item.petType,
                    petSize: item.petSize,
                    breed: item.breed,
                    gender: item.gender,
                });
                _mongoose.save(bubData).then(function () {
                    next();
                }).catch(function (error) {
                    winston.log(error);
                    next();
                });

            }).catch(function (error) {
                winston.log(error);
                next();
            });
        }, function (error) {
            if (error) {
                helper.formatResponse('', res, error);
            }
            var response = {};
            response = appMessage.common.success.fileImport;
            helper.formatResponse(response, res, '');
        });


    }
};
