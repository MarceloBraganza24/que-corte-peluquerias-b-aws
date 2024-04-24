//import { Tickets } from '../dao/factory.js';

export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = async () => {
        const tickets = await this.dao.getAll();
        return tickets;
    }
    getById = async (id) => {
        const ticket = await this.dao.getById(id);
        return ticket;
    }
    save = async (ticket) => {
        const ticketSaved = await this.dao.save(ticket);
        return ticketSaved;
    }
}