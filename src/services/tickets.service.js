import TicketDAO from "../daos/mongodb/TicketMongo.dao.js";

export default class TicketService {
    constructor() {
        this.ticketDao = new TicketDAO();
    };

    // Métodos TicketService: 
    async createTicketService() {
        let response = {};
        try {
            const result = await this.ticketDao.createTicket();
            response.status = "success";
            response.message = "Se ha creado la colección de tickets exitosamente.";
            response.result = result;
            response.statusCode = 200;
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo crear la colección de tickets.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async getTicketsByIdService(tid) {
        let response = {};
        try {
            const result = await this.ticketDao.getTicketsByID(tid);
            if (!result) {
                response.status = "error";
                response.message = `No se pudo encontrar la colección de tickets con ID ${tid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Se han obtenido los tickets del usuario exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo obtener la colección de tickets - Service.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async addTicketToTicketsService(tid, ticket) {
        let response = {};
        try {
            const result = await this.ticketDao.addTicketToTickets(tid, ticket);
            if (!result) {
                response.status = "error";
                response.message = "No se pudo agregar el nuevo ticket a la colección de tickets.";
                response.statusCode = 400;
            } else {
                response.status = "success";
                response.message = "El nuevo ticket se ha agregado exitosamente a la lista de tickets del usuario.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo agregar el ticket a la colección de tickets.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };
}
