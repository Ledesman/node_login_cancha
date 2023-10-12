
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const htmls= 
     `<!DOCTYPE html>
    <html lang="en">
    <h1>Registro asegurado </h1>
    

    </body>
</html>
    `;

    async function main(){
        const transport = nodemailer.createTransport({
    host:'ledesmanicolas079@gamil.com',
    port: 465,
    secure: true ,
    auth: {
        user:'ledesmanicolas079@gamil.com',
    pass:'Nicoalasle26'
    }

}); 
    const info = await transport.sendMail({
        from:"<ledesmanicolas079@gamil.com>",
        to:"direccion",
        subject: "Verificacion de la cuenta",
        html: htmls
    })

    console.log("Mensaje de verificacion correcta" + info.messageId)
}




main()

