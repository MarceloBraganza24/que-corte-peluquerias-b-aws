import ShiftsRepository from '../repositories/shifts.repository.js';

const shiftsManager = new ShiftsRepository();

const getAll = async () => {
    const shifts = await shiftsManager.getAll();
    return shifts;
}
const getById = async (id) => {
    const shift = await shiftsManager.getById(id);
    return shift;
}
const save = async (first_name, last_name, date, schedule) => {
    const shift = {
        first_name,
        last_name,
        date,
        schedule,
        shift_datetime:  new Date().toLocaleString()
    }
    const shiftSaved = await shiftsManager.save(shift);
    return shiftSaved;
}

export {
    getAll,
    getById,
    save
}