
import {Schema, model} from 'mongoose';
import {toJSON} from "@reis/mongoose-to-json";

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    // avatar: {type:String},
    // role: {
    //     type: String, default: 'user',
    //     enum: ['user','vendor','admin']}
} ,{
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('User',userSchema);