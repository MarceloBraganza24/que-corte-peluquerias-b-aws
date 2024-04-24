import { ticketsModel } from '../dbManagers/models/tickets.model.js'

export default class TicketsDao {
    getAll = async() => {
        const tickets = await ticketsModel.find().lean();
        return tickets;
    }
    getById = async(id) => {
        const ticket = await ticketsModel.findById(id).lean();
        return ticket;
    }
    save = async(ticket) => {
        const ticketSaved = await ticketsModel.create(ticket);
        return ticketSaved;
    }
}