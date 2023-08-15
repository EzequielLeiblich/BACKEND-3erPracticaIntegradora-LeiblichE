import CartService from "../services/carts.service.js";

import mongoose from 'mongoose';

export default class CartController {
    constructor() {
        this.cartService = new CartService()
    }

    // Métodos CartController:

    async createCartController(req, res) {
        let response = {};
        try {
            const responseService = await this.cartService.createCartService();
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: "Error al crear el carrito: " + error.message
            });
        };
    };

    async getCartByIdController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID proporcionado no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.getCartByIdService(cid);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: 'Error al consultar el carrito: ' + error.message
            });
        };
    };

    async getAllCartsController(req, res) {
        let response = {};
        try {
            const responseService = await this.cartService.getAllCartsService();
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: "Error al crear el carrito: " + error.message
            });
        };
    };

    async addProductInCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.params.quantity; 
            if(!quantity){
                response.status = "error";
                response.message = `No se proporcionó cuantas Unds. del producto se desea comprar.`;
                response.statusCode = 400;
            } else if (!pid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de producto.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(pid)) {
                response.status = "error";
                response.message = `El ID de producto proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado, no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.addProductToCartService(cid, pid, quantity);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al agregar el producto del carrito: " + error.message
            });
        };
    };

    async deleteProductFromCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            if (!pid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de producto.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(pid)) {
                response.status = "error";
                response.message = `El ID de producto proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado, no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.deleteProductFromCartService(cid, pid);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al eliminar un producto del carrito: " + error.message
            });
        };
    };

    async deleteAllProductsFromCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID proporcionado no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.deleteAllProductFromCartService(cid);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al eliminar todos los productos del carrito: " + error.message
            });
        };
    };

    async updateCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const updatedCartFields = req.body;
            if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID proporcionado no es válido.`;
                response.statusCode = 400;
            } else if (!updatedCartFields) {
                response.status = "error";
                response.message = `No se proporcionó ningún cuerpo para el carrito.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.updateCartService(cid, updatedCartFields);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al actualizar el carrito: " + error.message
            });
        };
    };

    async updateProductInCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const updatedProdInCart = req.body;
            if (!pid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de producto.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(pid)) {
                response.status = "error";
                response.message = `El ID de producto proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!updatedProdInCart) {
                response.status = "error";
                response.message = `No se proporcionó ningún cuerpo para la actualización del producto.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.updateProductInCartService(cid, pid, updatedProdInCart);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                }
                if (responseService.status === "error") {
                    response.error = responseService.error;
                }
            }
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al actualizar el producto en el carrito: " + error.message
            });
        }
    }
}