import CartDAO from "../daos/mongodb/CartMongo.dao.js";
import ProductService from "./products.service.js";

export default class CartService {
    constructor() {
        this.cartDao = new CartDAO();
        this.productService = new ProductService();
    }

    // Métodos CartService:
    async createCartService() {
        let response = {};
        try {
            const result = await this.cartDao.createCart();
            response.status = "success";
            response.message = "Carrito creado exitosamente.";
            response.result = result;
            response.statusCode = 200;
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo crear el carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async getCartByIdService(cid) {
        let response = {};
        try {
            const result = await this.cartDao.getCartById(cid);
            if (!result) {
                response.status = "error";
                response.message = `El carrito con ID ${cid}, no se ha encontrado.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Carrito obtenido exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo obtener el carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async getAllCartsService() {
        let response = {};
        try {
            const result = await this.cartDao.getAllCarts();
            if (!result) {
                response.status = "error";
                response.message = "Carritos no encontrados.";
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Carritos obtenidos exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo obtener los carritos.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async addProductToCartService(cid, pid, quantity) {
        let response = {}
        try {
            const product = await this.productService.getProductByIdService(pid)
            if (!product) {
                response.status = "error";
                response.message = `No se pudo obtener el producto con ID ${pid}.`;
                response.statusCode = 404;
            } else {
                const soloProduct = product.result
                const result = await this.cartDao.addProductToCart(cid, soloProduct, quantity);
                if (!result) {
                    response.status = "error";
                    response.message = "No fue posible agregar el producto al carrito.";
                    response.statusCode = 400;
                } else {
                    response.status = "success";
                    response.message = "Producto agregado al carrito exitosamente.";
                    response.result = result;
                    response.statusCode = 200;
                }
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo agregar el producto al carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async deleteProductFromCartService(cid, pid) {
        let response = {};
        try {
            const result = await this.cartDao.deleteProductFromCart(cid, pid);
            if (result.deletedCount === 0) {
                response.status = "error";
                response.message = `No se encontró ningún producto con el ID ${pid} en el carrito ${cid}`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Producto eliminado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al eliminar el producto.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response
    };

    async deleteAllProductFromCartService(cid) {
        let response = {};
        try {
            const result = await this.cartDao.deleteAllProductsFromCart(cid);
            if (result.n === 0) {
                response.status = "error";
                response.message = `No se encontró ningún carrito con el ID ${cid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Los productos del carrito se han eliminado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al eliminar todos los productos del carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async updateCartService(cid, updatedCartFields) {
        const response = {};
        try {
            const result = await this.cartDao.updateCart(cid, updatedCartFields)
            if (result.n === 0) {
                response.status = "error";
                response.message = `No se encontró ningún carrito con el ID ${cid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Carrito actualizado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al actualizar el carrito.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async updateProductInCartService(cid, pid, updatedProdInCart) {
        let response = {};
        try {
            const result = await this.cartDao.updateProductInCart(cid, pid, updatedProdInCart)
            if (result.n === 0) {
                response.status = "error";
                response.message = "No se ha podido actualizar el producto.";
                response.statusCode = 400;
            } else {
                response.status = "success";
                response.message = "Producto actualizado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al actualizar el producto.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };
}