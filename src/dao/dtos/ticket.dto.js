
class TicketDTO {

    constructor(code, amount, purchaser, purchase_datetime){
        this.code = code;
        this.purchase_datetime = purchase_datetime.toLocaleDateString();;
        this.amount = amount; 
        this.purchaser = purchaser
        
    };
};

export default TicketDTO;