import mongoose from 'mongoose'

const schemaCarts = new mongoose.Schema({
  products: [{
    product:{type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    quantity: {type: Number, required:true}
  }]
}, {versionKey: false})

export const ModelCarts = mongoose.model('carts', schemaCarts)