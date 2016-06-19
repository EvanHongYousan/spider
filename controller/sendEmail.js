/**
 * Created by yantianyu on 2016/6/16 0016.
 */
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var smtpConfig = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '1370204201@qq.com',
        pass: 'ztiywvqnjxdwidgc'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '1370204201@qq.com', // sender address
//     to: '1370204201@qq.com', // list of receivers
//     subject: '服务器重启', // Subject line
//     html: '<b>'+new Date()+'</b>' // html body
// };

// send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log('服务器重启通知发送失败');
//         return console.log(error);
//     }
//     console.log('服务器重启通知发送成功');
// });

module.exports = function(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        console.log('当前时间：'+new Date());
        if(error){
            console.log('邮件日报发送失败');
            console.log(error);
            return;
        }
        console.log('邮件日报发送成功');
    });
};