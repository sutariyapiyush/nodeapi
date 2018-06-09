/*
 * sample model to check master component
 */
var sample = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
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
var collectionName = 'sample';
var sample = mongoose.model('sample', sample, collectionName);

module.exports = sample