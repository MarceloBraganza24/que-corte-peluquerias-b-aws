import config from '../config/config.js';

export let Users;
//export let Tickets;
export let Shifts;
export let Partners;

const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Working with MongoDB persistence');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import('./dbManagers/users.manager.js');
        //const { default: TicketsMongo } = await import('./dbManagers/tickets.manager.js');
        const { default: ShiftsMongo } = await import('./dbManagers/shifts.manager.js');
        const { default: PartnersMongo } = await import('./dbManagers/partners.manager.js');
        Users = UsersMongo;
        //Tickets = TicketsMongo;
        Shifts = ShiftsMongo;
        Partners = PartnersMongo;
        break;
    case 'FILE':
        /* const { default: UsersFile } = await import('./fileManagers/users.manager.js');
        Users = UsersFile; */
        break;
}