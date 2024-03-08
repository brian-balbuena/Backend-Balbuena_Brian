import { ticketModel } from "../models/ticket.model.js";

class ServiceTicket {

    async addTicketService(code, amount, purchaser) {
            
        try {
            
            const purchase_datetime = new Date();

           const ticket =  await ticketModel.create({ code, purchase_datetime, amount, purchaser });
            return { status: (201), send: ({ message: 'Ticket created' }), ticket: ticket };

        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'Could not create a ticket' }) };
        }
    };


    async checkCodeService(code) {

        try {
            const check = await ticketModel.findOne({code: code});

            if(!check){
                return true;
            }
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
    };

    async deleteTicketService(id) {

        try {
            const ticketDeleted = await ticketModel.deleteOne({ _id: id });

            if (!ticketDeleted.deletedCount) {
                return {status:(404), send:({ message: 'Deleted not found' })};
            };
            return {status:(200), send:({ message: 'Ticket deleted' })};
        } catch (error) {
            console.error(error);
            return {status:(400), error: error, send:({ message: 'could not delete ticket' })};
        }
    };
};

export default ServiceTicket;