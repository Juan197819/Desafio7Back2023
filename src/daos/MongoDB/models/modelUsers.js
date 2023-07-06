import mongoose from 'mongoose'
const schemaUsers = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    email:  {type:String, required: true, unique:true},
    age: {type: Number, required: true},
    password:  {type:String, required: true},
    role: {type:String, default:'user'}
}, {versionKey: false})
export const ModelUsers = mongoose.model('users', schemaUsers) 