import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        index: true,
    },
    category: {
        type: String,
        index: true,
    },
})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model('products', productsSchema);

export default productsModel;