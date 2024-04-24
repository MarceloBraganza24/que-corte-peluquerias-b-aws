import { shiftsModel } from '../dbManagers/models/shifts.model.js'

export default class ShiftsDao {
    getAll = async() => {
        const shifts = await shiftsModel.find().lean();
        return shifts;
    }
    getById = async(id) => {
        const shift = await shiftsModel.findById(id).lean();
        return shift;
    }
    save = async(shift) => {
        const shiftSaved = await shiftsModel.create(shift);
        return shiftSaved;
    }
}