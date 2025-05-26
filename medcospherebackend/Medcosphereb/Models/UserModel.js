import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength:[5,'Password must be atleast 8 characters']
        
    },
   
    role: {
        type: String,
        enum:['GENERAL','ADMIN'],
        default: 'GENERAL'
    }, avatar:{
        public_id:{
            type: String
        },
        secure_url:{
            type: String
        }

    }

}, {
    timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;
