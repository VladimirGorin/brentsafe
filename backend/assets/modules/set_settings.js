const settings = require('../settings/settings.js')
const fs = require('fs');

module.exports.set_settings = (link, chatId, bot, step, site) => {
    let pathToFolder = `./assets/data/sites/${site}/`

    fs.access(`../data/sites/${site}/`, function(error){
        if (error) {
            switch (step) {
                case "qr":
                    let message1 = `Excellent! The qr has been saved in site`
                    fs.writeFileSync(`${pathToFolder}qr_settings.json`, JSON.stringify({qr_code_link: link}, null, '\t'))
                
                    bot.sendMessage(chatId, message1)
                    break;
                case "price":
                    let message2 = `Excellent! The price has been saved in site`
                    fs.writeFileSync(`${pathToFolder}price_settings.json`, JSON.stringify({price_euro: link}, null, '\t'))
                
                    bot.sendMessage(chatId, message2)
                    break;
                case "address":
                    let message3 = `Excellent! The address has been saved in site`
                    fs.writeFileSync(`${pathToFolder}address_settings.json`, JSON.stringify({address: link}, null, '\t'))
                
                    bot.sendMessage(chatId, message3)
                    break;

                case "api-key":
                    let message4 = `Excellent! The api has been saved in site`
                    fs.writeFileSync(`${pathToFolder}api_key.json`, JSON.stringify({api_key: link}, null, '\t'))
                
                    bot.sendMessage(chatId, message4)
                    break;

                case "clear-users":
                    let message5 = `Excellent! The keys has been deleted`
                    fs.writeFileSync(`${pathToFolder}users-keys.json`, "[]")
                
                    bot.sendMessage(chatId, message5)
                    break;
                default:
                    break;
            }
        } else {
            bot.sendMessage(chatId, "You have entered an invalid site, please try again")
        }
    });

}

