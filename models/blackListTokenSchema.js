const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    expiresAt:{type:Date,required:true}
},{timestamps: true});

blackListTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('BlackListToken', blackListTokenSchema);