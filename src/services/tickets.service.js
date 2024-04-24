import TicketsRepository from '../repositories/tickets.repository.js';
import { Tickets } from '../dao/factory.js';

const ticketsDao = new Tickets();
const ticketsRepository = new TicketsRepository(ticketsDao);

const getAll = async () => {
    const tickets = await ticketsRepository.getAll();
    return tickets;
}
const getById = async (id) => {
    const ticket = await ticketsRepository.getById(id);
    return ticket;
}
const save = async (purchaser, amount) => {
    const code = Date.now() + Math.floor(Math.random() * 100000 + 1);
    const ticket = {
        code,
        purchase_datetime:  new Date().toLocaleString(),
        amount, 
        purchaser
    }
    const ticketSaved = await ticketsRepository.save(ticket);
    return ticketSaved;
}

export {
    getAll,
    getById,
    save
}