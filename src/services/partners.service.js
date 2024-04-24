import PartnersRepository from '../repositories/partners.repository.js';
import { Partners } from '../dao/factory.js';
import { PartnerAlreadyExists } from '../utils/custom.exceptions.js';
import { htmlNewRegister } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';

const partnersDao = new Partners();
const partnersRepository = new PartnersRepository(partnersDao);

const register = async(partner) => {
    const partnerByEmail = await partnersRepository.getByEmail(partner.email);
    if(partnerByEmail) {
        throw new PartnerAlreadyExists('partner already exists');
    }
    const emailNewRegister = {
        to: partner.email,
        subject: 'Registro exitoso',
        html: htmlNewRegister
    }
    await sendEmail(emailNewRegister);
    const result = await partnersRepository.save(partner);
    return result;
}

export {
    register
}