import productModel from "../models/productsModel.js";

class containerProductMongo {

    save = async (product) => {
        product.code= Math.floor(Math.random()*99999)
        let response = await productModel.create(product)
        console.log(response)
        return response
    }

    getProductsById = async(id)=> { 
        const product = await productModel.find({_id: id})
        console.log(product)
        return product.length === 0 ? null : product
    }

    getAll = async () => {
        let products = await productModel.find({}, { __v: 0})
        console.log(products)
        if (products.length != 0) {
            return {
                status: "success",
                products: products
            }
        } else {
            return {
                status: "Error",
                message: "No hay productos agregados"
            }
        }
    }

    updateItem = async (object, id) => {
        try {
            let newProd = { title: object.title, 
                            description: object.description,   
                            code: object.code,
                            price: object.price,
                            stock: object.stock
                        }
            let response = await productModel.updateOne({ _id: id }, newProd)
            if (response.modifiedCount > 0) {
                return {
                    status: "success",
                    message: "Product updated successfully",
                    newProd
                }
            } else if (response.matchedCount > 0) {
                return {
                    status: "Error",
                    Message: "unmodified product"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Product not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    deleteById = async (id) => {
        try {
            let response = await productModel.deleteOne({ _id: id })
            if (response.deletedCount > 0) {
                return {
                    status: "success",
                    message: "Product deleted successfully"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Product not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    deleteAll = async ()=> { 
        await productModel.deleteMany({})
    }
}

export default containerProductMongo