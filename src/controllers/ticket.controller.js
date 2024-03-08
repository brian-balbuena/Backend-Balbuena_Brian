import ServiceTicket from "../dao/servicesMongo/serviceticket.js";
import ServiceProduct from "../dao/servicesMongo/serviceproduct.js";

const serviceproduct = new ServiceProduct();
const serviceTicket = new ServiceTicket();


export const createTicket = async (req, res, stock) => {

    const { user } = req.session;
    const code = await createCodeTicket(15);
    const amount = await amountTicket(stock);
    const purchaser =  user.email;

    const ticket = await serviceTicket.addTicketService(code, amount.total, purchaser);

    return ticket
};

export const deleteTicket = async (id) => {

    const ticketDelete = await serviceTicket.deleteTicketService(id);
    return res.status(ticketDelete.status).send(ticketDelete.send);
};

const createCodeTicket = async (codeLength) => {

    let acceptedCode = false;
    let code = '';
    while (!acceptedCode) {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let generatedCode = '';

        for (let i = 0; i < codeLength; i++) {
            let indice = Math.floor(Math.random() * characters.length);
            generatedCode += characters.charAt(indice);
        }

        const chekCode = await serviceTicket.checkCodeService(generatedCode);
        acceptedCode = chekCode;
        code = generatedCode;
    }

    return code;

};

const amountTicket = async(stock) => {
    let total = 0;

    let responses = await Promise.all(stock.map(async element => {
        const product = await serviceproduct.getProductIdService(element.ID);
        const { send: { productId: { price } } } = product;
        
        const subtotal = price * element.QUANTITY;
        total += subtotal;
      
        return {
           
            subtotal: subtotal
        };
    }));
    const response = {
        total: total,
        items: responses 
    };

    return response;

};