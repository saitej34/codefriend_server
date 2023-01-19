const nodemailer = require('nodemailer')


const transportmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:"saiteja6734.yelagandula@gmail.com",
        pass:"ebxdjxymtvpfjgyr"
    }
});

module.exports = transportmail;