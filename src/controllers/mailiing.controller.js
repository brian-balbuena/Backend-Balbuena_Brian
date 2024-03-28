import MailingService from "../services/mailing.js";

export const sendMail = async (req, res) => {
    const { user } = req.session;
   
   const mailingService = new MailingService();
    await mailingService.sendMail({
        from: 'ecommerce',
        to: user.email,
        subject: 'Recuperar contraseña',
        html: `
        
        <div>
         <a href="http://localhost:8080/restorePassword">Cambiar contraseña</a>
        </div>
        
        
        `
    })
    res.send({status: "success", message: "password recovery email sent"})
}

    
