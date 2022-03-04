const nodemailer = require('nodemailer');
const {getHtmlFromTemplate} = require('./templates/handel.template');

const smtpTransporter = nodemailer.createTransport(
    process.env.MAILER_DSN, {from: 'noreplay@groupomania.com'}
);

/**
 * 
 * @param {string} to 
 * @param {string} subject 
 * @param {string} template 
 */
exports.sendEmail = async(to, subject, template, replacements, from = 'noreplay@groupomania.com') => {

    try {
        const html = getHtmlFromTemplate(template, replacements);
        await smtpTransporter.sendMail({
            to: to,
            subject: subject,
            html: html
        });
    } catch (error) {
        
        if(error.name === 'HandleTemplateError'){
            throw error
        }else{
            throw new Error('Email not send!. Connexion error')
        }
        
    }
    
}