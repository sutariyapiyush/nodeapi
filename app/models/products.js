/* 
 * products Schema
 */
var products = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    images: {
        fileName: String,
        fileSize: String,
        folderName: String
    },
    reviews: [{
            description: {type: String}
        }],
    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    isActive: {type: Boolean, default: true},
    isDelete: {type: Boolean, default: false}
},
        {
            timestamps: true,
            versionKey: false
        })
/*
 * defining modelName for Schema
 */
var collectionName = 'products';
var products = mongoose.model('products', products, collectionName);

module.exports = products