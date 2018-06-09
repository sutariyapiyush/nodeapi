/* 
 * Users Schema
 */
var users = new mongoose.Schema({
    name: {type: String},
    email :{type :String,required: true, unique: true,lowercase: true},
    profilepic : {
        fileName: String,
        fileSize: String,
        folderName: String
    },
    gender  :{type : String , length : 1 },
    isActive: {type: Boolean, default: true},
    isDelete: {type: Boolean, default: false},
    
},
{
    timestamps: true,
    versionKey : false
})
///* getting related schema*/
//users.statics.getRelatedSchema = function (cb) {
//    cb([
//        {modelName: models.products , fieldName: "reviews._id"},
//    ]);
//};
/*
 * defining modelName for Schema
 */
var collectionName = 'users';
var users = mongoose.model('users', users, collectionName);

module.exports = users