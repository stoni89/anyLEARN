var sendMail = {
  sendmail: function(req, res) {

    var server  = email.server.connect({
       user:    "senderemail",
       password:"senderpassword",
       host:    "<email server url>",
       ssl:     true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
       text:    "You have signed up",
       from:    "sender email",
       to:      req.body.name,
       subject: "Welcome to my app",
       attachment:
       [
          {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
          {path:"pathtofile.zip", type:"application/zip", name:"renamed.zip"}
       ]
    }, function(err, message) {
        if(err)
        console.log(err);
        else
        res.json({success: true, msg: 'sent'});
     });
  }
}

module.exports = sendMail;
