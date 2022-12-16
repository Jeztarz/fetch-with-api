const userSchema = new mongoose.Schema(
    {
        
    }
);

const UserModel = mongoose.model('user', userSchema, 'users');

module.exports = UserModel;