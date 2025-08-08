import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
        lowercase: true,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    businessType: {
        type: String,
        required: [true, 'Business type is required'],
        enum: ['E-commerce', 'Agency', 'SaaS', 'Retail', 'Other'] // you can adjust these options
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Lead = mongoose.model('Lead', leadSchema);
