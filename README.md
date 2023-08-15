# Tercera Entrega: Proyecto Final

## LEIBLICH Ezequiel Gaston

## Comisión 43345 - Programación Backend


Tercera Entrega: Proyecto Final
Este repositorio marca la tercera entrega de nuestro proyecto final, donde hemos profundizado en los roles de los usuarios, las autorizaciones y la lógica de compra. Además, hemos mejorado la arquitectura general del servidor para una mayor profesionalización.

Objetivos
------------------------------------------------
Generales
* Profesionalizar el servidor en términos de estructura y funcionalidad.
------------------------------------------------
Específicos
* Implementar una arquitectura profesional en el servidor, incorporando prácticas como patrones de diseño, mailing y variables de entorno.
------------------------------------------------
Modificaciones Realizadas
* Capa de Persistencia: Hemos modificado la capa de persistencia para aplicar conceptos como Factory (opcional), DAO y DTO. Ahora, el DAO seleccionado puede ser devuelto por una Factory para ser utilizado por la capa de negocio.

* Patrón Repository: Hemos implementado el patrón Repository para facilitar la interacción entre la capa de negocio y el DAO.

* Ruta /current: Hemos modificado la ruta /current para enviar un DTO del usuario con solo la información necesaria, evitando exponer información sensible.

* Middleware de Autorización: Se ha creado un middleware que trabaja junto con la estrategia "current" para implementar un sistema de autorización y restringir el acceso a ciertos endpoints:

- Solo el administrador puede crear, actualizar y eliminar productos.
- Solo el usuario puede enviar mensajes al chat.
- Solo el usuario puede agregar productos a su carrito.
* Modelo de Ticket: Hemos creado un modelo llamado "Ticket" para formalizar las compras. Este modelo incluye campos como code, purchase_datetime, amount y purchaser.

*Ruta de Compra: Hemos implementado la ruta /carts/:cid/purchase en el router de carritos, permitiendo finalizar el proceso de compra del carrito. La compra verifica el stock de los productos al momento de finalizarse:

- Si el producto tiene suficiente stock, se resta del stock y se continúa.
- Si el producto no tiene suficiente stock, no se agrega al proceso de compra.
* Servicio de Tickets: Utilizamos el servicio de Tickets para generar un ticket con los datos de la compra. En caso de una compra no completada, se devuelve un arreglo con los IDs de los productos que no pudieron procesarse. El carrito del usuario comprador solo contendrá los productos no comprados.

  ---------------------------------------------------

Instrucciones:
  
1- Clona este repositorio en tu máquina local.

2- Configura las variables de entorno en un archivo .env para mantener la seguridad de los datos comprometidos.

4- Instala las dependencias necesarias utilizando npm install.

5- Ejecuta el servidor con npm start o el comando correspondiente según tu configuración.

¡Listo! El proyecto ha sido profundamente mejorado para una experiencia de usuario más sólida y segura.

Si tienes alguna pregunta o necesitas asistencia, no dudes en comunicarte con nosotros. ¡Gracias por revisar esta tercera entrega de nuestro proyecto final!
