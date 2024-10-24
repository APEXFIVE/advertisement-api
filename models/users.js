import { Schema, model } from 'mongoose';
import { toJSON } from "@reis/mongoose-to-json";

// Define the User schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },  // Optional field for storing user avatar
    role: {
        type: String,
        default: 'user', // Default role is 'user'
        enum: ['user', 'vendor', 'admin']
    },
    // Vendor-specific fields
    businessName: { type: String },  // For vendors only
    product: { type: String },  // For vendors only
    category: { type: String },  // For vendors only
    contactNumber: { type: String }  // For vendors only
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Apply the toJSON plugin to control how the user data is returned (like excluding sensitive fields)
userSchema.plugin(toJSON);

// Pre-save middleware to handle conditional validation for vendors
userSchema.pre('save', function(next) {
    // If the role is vendor, ensure that vendor fields are filled
    if (this.role === 'vendor') {
        if (!this.businessName || !this.product || !this.category || !this.contactNumber) {
            return next(new Error('All vendor-specific fields must be filled when registering as a vendor.'));
        }
    }
    next();
});

const User = model('User', userSchema);
export const UserModel = User;
export default User;


