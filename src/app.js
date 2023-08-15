// PAQUETES Y MODULOS

import express, { urlencoded } from 'express';
import __dirname from './utils.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import config from './config.js';

// RUTAS

import routerProducts from "./routes/products.router.js"
import routerCarts from "./routes/cart.router.js"
import routerViews from "./routes/views.router.js"
import routerSession from "./routes/session.router.js"
import routerMessage from "./routes/message.router.js"

// CONTROLLERS

import ViewsController from './controllers/viewsController.js';

// PASSPORT
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassportLocal } from './config/local.passport.js';
import { initializePassportGitHub } from './config/gitHub.passport.js';
import { initializePassportJWT } from './config/jwt.passport.js';

// SERVER EXPRESS

const app = express();

// MONGOOSE

const connection = mongoose.connect(
  config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MIDDLEWARES

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// PASSPORT

app.use(cookieParser());
initializePassportLocal();
initializePassportJWT();
initializePassportGitHub();
app.use(passport.initialize());

// SERVER HTTP EXPRESS

const expressServer = app.listen(config.PORT, () => {
  console.log("Servidor levantado");
})

// SERVER SOCKET.IO

const socketServer = new Server(expressServer)

// VIEWS CONTROLLER

let viewsController = new ViewsController;

// SERVER SOCKET.IO EVENTS

socketServer.on("connection", async (socket) => {
  console.log("¡Nuevo cliente conectado!", socket.id)
  
  // PRODUCTS

  // Se envian todos los productos al conectarse
  const productsResponse = await viewsController.getAllProductsControllerV();
  const productList = productsResponse.result;
  socket.emit('products', productList);

  // Recibo los filtros de main.js en busquedaProducts:
  socket.on('busquedaFiltrada', async (busquedaProducts) => {
    const {
      limit,
      page,
      sort,
      filtro,
      filtroVal
    } = busquedaProducts;
    const productsResponse = await viewsController.getAllProductsControllerV(limit, page, sort, filtro, filtroVal);
    const productsFilter = productsResponse.result
    socket.emit('products', productsFilter);
  });

  // MESSAGES: 

  // Enviamos todos los mensajes al usuario:
  const messages = await viewsController.getAllMessageControllerV();
  const messageResult = messages.result;
  socket.emit("messages", messageResult);

  // CARTS

  // Enviamos los carritos a los usuarios: 
  socket.on('cartid', async (cartID) => {
    const cart = await viewsController.getCartByIdV(cartID);
    const cartResult = cart.result;
    socket.emit('cartuser', cartResult);
  });
  
});

// MIDDLEWARE (all requests have access to socket server)

app.use((req, res, next) => {
  req.socketServer = socketServer;
  next();
})

// ROUTES

app.use("/", routerViews);
app.use("/api/chat", routerMessage);
app.use("/api/carts", routerCarts);
app.use("/api/sessions", routerSession);
app.use("/api/products", routerProducts);
