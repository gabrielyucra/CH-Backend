import cartModel from "../models/cartModel.js"
import { fechaHora } from "./cartContenerdor.js"

class containerCartMongo {

    createCart = async () => {
        const newCart = {
            timestamp: fechaHora(),
            products: []
        }
        try {
            let response = await cartModel.create(newCart)
            return { message: "Created new cart", response }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    getCarts = async () => {
        let carts = await cartModel.find({}, { __v: 0 })
        if (carts.length > 0) {
            return {
                status: "success",
                carts
            }
        } else {
            return {
                status: "Error",
                message: "Carts not fount"
            }
        }
    }

    getCartById = async(id)=>{
        let cart =await cartModel.findOne({_id: id}, {__v:0})
        return cart
        }

    addProduct = async (idCart, product) => {
        try {
            let sendProd = await cartModel.updateOne({_id: idCart}, {$push: {products: product}})
            if (sendProd.modifiedCount > 0) {
                return {
                    status: "Success",
                    message: "Product added successfully"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Unadded product"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    deleteCartById = async (id) => {
        try {
            let response = await cartModel.deleteOne({ _id: id })
            if (response.deletedCount > 0) {
                return {
                    status: "Success",
                    message: "Cart deleted successfully"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Cart not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    async cleanCartById(id) { 
        await cartModel.updateOne({_id: id}, {$set: {products: []}})
    }

    deleteProduct = async (cid, pid) => {
        try {
            let data = await cartModel.updateOne({ _id: cid }, { $pull: { products: { id: pid } } })
            if (data.modifiedCount > 0) {
                return {
                    status: "Success",
                    message: "Product removed from cart"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Product not found in cart"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
}

export default containerCartMongo