const path = require('path')
const fs = require('fs');
const handlebars = require('handlebars');
const HandleTemplateErorr = require('./HandleTemplateError')

/**
 * 
 * @param {string} template 
 * @param {object} replacements
 */
exports.getHtmlFromTemplate = (template = null, replacements = {}) =>{
    
    try {
        const filePath = path.join(__dirname, `${template}`);
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const compiledTemplate = handlebars.compile(source);
        return compiledTemplate(replacements);
        // 'password.reset.html'
    } catch (error) {
        throw new HandleTemplateErorr(`Template not found`)
    }
    
}
  