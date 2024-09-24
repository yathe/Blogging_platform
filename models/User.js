const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: { type: String },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    let user = this
    if (user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash
            return next()
        })
    } else {
        return next();
    }
})

UserSchema.methods.comparePassword = function (password, next) {
    console.log("com");
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            return next(err, false);
        }
        return next(null, match);
    });
};
module.exports = mongoose.model('User', UserSchema);
