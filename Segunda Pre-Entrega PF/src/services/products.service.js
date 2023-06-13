import productsModel from "../models/products.model.js";

class ProductsService {
  constructor() {
    this.model = productsModel;
  }

  async getAllProducts(limit = 100, page = 1, category = false, sort) {
    const paginateArg = { lean: true, limit, page }
    let filter = {}
    if (category) {
           filter = { category };
      }
    if (sort === "asc") {
      paginateArg.sort = {price: 1};
    }
    if (sort === "desc") {
      paginateArg.sort = {price: -1};
    }
    return this.model.paginate(filter, paginateArg);
  }

  async getProductById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      return "Product not found";
    }
  }

  async addProduct(product) {
    try {
      return await this.model.create(product);
    } catch (err) {
      return err;
    }
  }

  async deleteProduct(id) {
    try {
      const supr = await this.model.deleteOne({ _id: id });
      if (supr.deletedCount === 0) {
        return null;
      }
      return "Borrado";
    } catch (err) {
      return `Error ${err}`;
    }
  }

  async updateProduct(id, data) {
    try {
      const updated = await this.model.updateOne({ _id: id }, data);
      if (updated.modifiedCount === 0) {
        return null;
      }
      return "Modificado";
    } catch (err) {
      throw err;
    }
  };

  // async getAllProductsForView(limit = 10000, page = 1, category = false) {
  //   var filter = {}
  //   if (category) {
  //     filter = { category };
  //   }
  //   return this.model.paginate(filter, {lean: true, page, limit });
  // }

}

const ps = new ProductsService();
export default ps;
