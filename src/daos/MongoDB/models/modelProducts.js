import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const schemaProducts = new mongoose.Schema({
          title: {type:String, required: true},
          description: {type:String, required: true},
          status: {type: Boolean, default: true},
          stock: {type: Number, required: true},
          category:  {type:String, required: true},
          code:  {type:String, required: true},
          thumbnail: [
            {type:String}
          ],
          price: {type: Number, required: true}        
}, {versionKey: false})
schemaProducts.plugin(mongoosePaginate)
export const ModelProducts = mongoose.model('products', schemaProducts)