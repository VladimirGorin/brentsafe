const { VONAGE_API_SECRET , VONAGE_API_KEY} = require('../settings/settings.js')
const fs = require('fs')
const { Vonage } = require('@vonage/server-sdk')

async function sendSMS(vonage, to, from, text) {
  await vonage.sms.send({to, from, text})
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}


module.exports.send_message = async (phone, site) => {
  const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET
  })

  let from = "INCORRECT"
  let to = phone
  let text = 'CHANGE SITE!!!'

  const pathToFolder = `./assets/data/sites/${site}/`
  fs.access(`../data/sites/${site}/`, function(error){
      if (error) {
        const info = JSON.parse(fs.readFileSync(`${pathToFolder}phone_settings.json`))
        from = info["from"]
        text = info["text"]

        sendSMS(vonage, to, from, text);
        
      } else {
          console.log("Файл найден sms");
      }
  });

}
