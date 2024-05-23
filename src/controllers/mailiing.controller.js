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
};

export const sendMailSessionExpired = async (email) => {
    try {
        const mailingService = new MailingService();
        await mailingService.sendMail({
            from: 'ecommerce',
            to: email,
            subject: 'Su cuenta ah sido eliminada',
            html: `
            <div>
                <p>Su cuenta ah sido eliminada po inactividad. Por favor, cree una nueva cuenta para continuar utilizando nuestros servicios.</p>
            </div>
            `
        });
    } catch (error) {
        throw new Error(`Error al enviar el correo electrónico de ceunta inactiva a ${email}: ${error.message}`);
    }
};

    
