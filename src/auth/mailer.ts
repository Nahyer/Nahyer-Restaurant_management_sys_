import nodemailer from "nodemailer";
import  "dotenv/config";

export const generateConfirmationCode = async (): Promise<string | null> => {
    const array = new Uint32Array(10);
    return crypto.getRandomValues(array).toString().slice(0, 6);
}
export const sendMail = async (email: string, confirmation_code: string) => {
    const transport =nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: process.env.EMAIL,
             pass: process.env.PASSWORD
         }
    })
    const mailOption = {
        from:process.env.EMAIL,
        to: email,
        subject : "Confirmation Code",
        text: `Your confirmation code is ${confirmation_code}`
 }
    transport.sendMail(mailOption, (err, info) => {
        if(err){
            console.log(err)
        }else{
            console.log(`Email sent: ${info.response}`)
        }
    })
}