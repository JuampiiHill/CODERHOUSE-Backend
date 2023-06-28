import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
		default: [],
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
				},
                quantity: {
                    type: Number,                    
                }
			},
		],
	},
})

cartsSchema.pre('find', function () {
    this.populate('products.product');
});

cartsSchema.pre('findOne', function () {
    this.populate('products.product');
});
const cartsModel = mongoose.model('carts', cartsSchema);

export default cartsModel;