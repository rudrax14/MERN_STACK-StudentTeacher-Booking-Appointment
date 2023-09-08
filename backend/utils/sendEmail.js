const nodeMailer = require('nodemailer')

module.exports=async (email,subject,message)=>{
   const transport = nodeMailer.createTransport ({
      
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "827dfe0313db6c",
              pass: "81546355d9d120"
            }
          
    })

    const info = await transport.sendMail({
        from:"abutalhasheik33@gmail.com",
        to:email,
        subject:subject,
        text:message
    })
}