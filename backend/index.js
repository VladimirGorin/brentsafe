const TelegramBotApi = require('node-telegram-bot-api')
const { counterId, token, port, token_test } = require('./assets/settings/settings.js')
const { get_data } = require("./assets/modules/get_info.js")
const { set_bitcoin_keys, remove_bitcoin_keys } = require("./assets/modules/set_keys.js")
const { set_settings } = require("./assets/modules/set_settings.js")
const { get_admins, set_admin } = require("./assets/modules/admins_functions.js")
const set_more_bitcoin_keys = require("./assets/modules/set_more_bitcoin_keys.js")
const request = require('request')
const bot = new TelegramBotApi(token_test, { polling: true })
const fs = require('fs');
const express = require('express')
let cors = require('cors')
let app = express()
const files = require("./assets/modules/files.js")
let users;

files.createFiles()
app.use(express.json())
app.use(cors())

function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}

setInterval(() => {
    users = JSON.parse(fs.readFileSync('./assets/data/users.json'))
    let users_ = get_admins()
    get_data(app, users_, bot)
}, 3000)

setInterval(() => {
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

}, 9000)



bot.setMyCommands([
    { command: '/start', description: 'Start' },
    { command: '/set_bitcoin_key', description: 'Set one set of keys' },
    { command: '/set_bitcoins_private_key', description: 'Set GLOBAL private key for all title keys' },
    { command: '/set_more_keys', description: 'Set a huge number of keys' },
    { command: '/check_keys', description: 'Check the keys' },
    { command: '/set_qr_site', description: 'Set a picture for the qr code on the site' },
    { command: '/set_price', description: 'Set a price BTC' },
    { command: '/set_address', description: 'Set a Bitcoin address' },
    { command: '/clear_users', description: 'Clear user base' },
    { command: '/clear_keys', description: 'Clear all keys' },
    { command: '/get_user_id', description: 'You will receive your ID to be added to the administrators' },
    { command: '/add_new_admin', description: 'Add user to admins' },
    { command: '/add_api_key', description: 'Add prices api key' }
])

bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if (!user) {
        users.push({
            id: msg.from.id,
            nick: msg.from.username,
            bitcoin_key: "0-0-0-0"
        })
        user = users.filter(x => x.id === msg.from.id)[0]
        fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))
    }
})

function sendCurrentSite(msg) {
    let chatId = msg.chat.id
    let site = msg.text
    var user = users.filter(x => x.id === msg.from.id)[0]
    let userStep = user.step

    if (userStep == "bitcoin-address") {
        set_settings(user.bitcoin_address, chatId, bot, "address", site)

    } else if (userStep == "price") {
        set_settings(user.price_settings, chatId, bot, "price", site)

    } else if (userStep == "qr") {
        set_settings(user.qr_settings, chatId, bot, "qr", site)

    } else if (userStep == "bitcoin-title") {
        set_bitcoin_keys(user, chatId, bot, site)

    } else if (userStep == "bitcoin-keys") {
        remove_bitcoin_keys(user, chatId, bot, site)

    } else if (userStep == "more-bitcoin-keys") {
        set_more_bitcoin_keys(user, chatId, bot, site)

    } else if (userStep == "api-key") {
        set_settings(user.api_key, chatId, bot, "api-key", site)

    } else if (userStep == "clear-users") {
        set_settings(user, chatId, bot, "clear-users", site)

    }

    bot.removeListener("message", sendCurrentSite);
};

function set_qr(msg) {
    let chatId = msg.chat.id
    let text = msg.text
    var user = users.filter(x => x.id === msg.from.id)[0]

    user.qr_settings = text
    user.step = "qr"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    bot.removeListener("message", set_qr);
};

function set_price(msg) {
    let chatId = msg.chat.id
    let text = msg.text
    var user = users.filter(x => x.id === msg.from.id)[0]

    user.price_settings = text
    user.step = "price"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    bot.removeListener("message", set_price);
};

function set_api_key(msg) {
    let chatId = msg.chat.id
    let text = msg.text
    var user = users.filter(x => x.id === msg.from.id)[0]

    user.api_key = text
    user.step = "api-key"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    bot.removeListener("message", set_api_key);
};


async function bitcoin_key(msg) {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let text = msg.text
    let chatId = msg.chat.id

    user.bitcoin_key = text
    user.step = "bitcoin-keys"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    bot.removeListener("message", bitcoin_key);
};

async function more_bitcoin_set_key(msg) {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let text = msg.text
    let chatId = msg.chat.id

    user.bitcoin_key = text
    user.step = "more-bitcoin-keys"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    bot.removeListener("message", more_bitcoin_set_key);
};


async function more_bitcoin_key(msg) {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let text = msg.text
    let chatId = msg.chat.id

    user.more_bitcoin_keys = text
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    bot.sendMessage(chatId, "Enter the private key to be applied")

    bot.on('message', more_bitcoin_set_key)
    bot.removeListener("message", more_bitcoin_key);
};

function set_address(msg) {
    let chatId = msg.chat.id
    let text = msg.text
    var user = users.filter(x => x.id === msg.from.id)[0]

    user.bitcoin_address = text
    user.step = "bitcoin-address"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    bot.removeListener("message", set_address);
};

function bitcoin_title(msg) {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    // let message = `Enter PRIVATE key from your paper wallet`
    let text = msg.text

    user.bitcoin_title = text
    user.step = "bitcoin-title"
    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))

    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));
    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
    // bot.on("message", bitcoin_key);
    bot.removeListener("message", bitcoin_title);
};

function set_admin_id(msg) {
    let chatId = msg.chat.id
    let message = `User was successfully added to admins`
    let text = Number(msg.text)

    set_admin(text)

    bot.sendMessage(chatId, message);
    bot.removeListener("message", set_admin_id);
};

function clear_keys(chatId) {
    var user = users.filter(x => x.id === chatId)[0]

    bot.sendMessage(chatId, `Great! Now send for which site you want to change the data ATTENTION ENTER A CLEAR NAME WITHOUT '' "" , ! available:`);
    user.step = "clear-users"

    fs.writeFileSync('./assets/data/users.json', JSON.stringify(users, null, '\t'))
    let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));

    for (let site in sties) {
        let s = sties[site].site;
        bot.sendMessage(chatId, s)
    }

    bot.on('message', sendCurrentSite)
};

function sendMessages(command, chatId) {
    // defult user commands
    switch (command) {
        case "start":
            bot.sendMessage(chatId, "Hello! How are you?")
            break;

        case "get_user_id":
            bot.sendMessage(chatId, `Your personal id is - ${chatId}`)
            break;

        default:
            break;
    }

    // admins user commands
    let tracker = false
    let users = get_admins()

    for (let admin in users) {
        if (users[admin] == chatId) {
            tracker = true
            break
        }
    }

    if (tracker) {
        switch (command) {
            case "set_bitcoin_key":
                bot.sendMessage(chatId, "Enter Bitcoin paper wallet Authentic PIN\nThe private key will be set as you specified globally (PLEASE MAKE SURE YOU SET IT BEFORE)")
                bot.on("message", bitcoin_title);
                break;
            case "clear_keys":
                clear_keys(chatId)
                break;

            case "set_bitcoins_private_key":
                bot.sendMessage(chatId, "Enter Bitcoin paper wallet GLOBAL Private key")
                bot.on("message", bitcoin_key);
                break;

            case "set_more_keys":
                bot.sendMessage(chatId, "Enter keys in this format (1000 3000)")
                bot.on("message", more_bitcoin_key);
                break;

            case "add_api_key":
                bot.sendMessage(chatId, "Ok now enter api key")
                bot.on("message", set_api_key);
                break;

            case "check_keys":
                let sties = JSON.parse(fs.readFileSync('./assets/data/sites.json'));

                for (let s in sties) {
                    let site = sties[s].site;
                    let path = `./assets/data/sites/${site}/users-keys.json`
                    let dataOfKeys = JSON.parse(fs.readFileSync(path));
                    let dataText = "Keys:\n";

                    if (dataOfKeys.length > 400) {
                        bot.sendDocument(chatId, path, { caption: "The number of keys has exceeded the message limit, we have sent you a file containing all the keys" })
                    } else {
                        for (let d in dataOfKeys) {
                            let bitcoinKey = dataOfKeys[d].bitcoin_key
                            let bitcoinTitle = dataOfKeys[d].bitcoin_title
                            let copyText = "`"

                            dataText = dataText + `\nPin:${copyText}${bitcoinTitle}${copyText}\nKey:${copyText}${bitcoinKey}${copyText}\n`
                        }
                        bot.sendMessage(chatId, dataText, { parse_mode: 'MarkdownV2' })
                    }
                }

                break;

            case "set_qr_site":
                bot.sendMessage(chatId, "Enter a link to the photo, it must be responsive")
                bot.on("message", set_qr);
                break;
            case "clear_users":
                request.get("https://royalcoinunion.online/clear_base")
                bot.sendMessage(chatId, "The user database was successfully cleared.")
                break;
            case "set_price":
                bot.sendMessage(chatId, "Enter the price in BTC, but be careful if you need to enter cents, do not write 100,10 - the converter will not work and the site will not be in bitcoins, write like this 100.10")
                bot.on("message", set_price);
                break;
            case "set_address":
                bot.sendMessage(chatId, "Enter the address")
                bot.on("message", set_address);
                break;
            case "add_new_admin":
                bot.sendMessage(chatId, "Enter the user id")
                bot.on("message", set_admin_id);
                break;

            default:
                break;
        }
    }

}

bot.on("message", msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let text = msg.text
    let chatId = msg.chat.id

    switch (text) {
        case "/start":
            sendMessages("start", chatId)
            break;
        case "/get_user_id":
            sendMessages("get_user_id", chatId)
            break;
        case "/set_bitcoin_key":
            sendMessages("set_bitcoin_key", chatId)
            break;
        case "/set_bitcoins_private_key":
            sendMessages("set_bitcoins_private_key", chatId)
            break;
        case "/check_keys":
            sendMessages("check_keys", chatId)
            break;
        case "/set_qr_site":
            sendMessages("set_qr_site", chatId)
            break;
        case "/clear_users":
            sendMessages("clear_users", chatId)
            break;
        case "/set_price":
            sendMessages("set_price", chatId)
            break;
        case "/set_address":
            sendMessages("set_address", chatId)
            break;
        case "/add_new_admin":
            sendMessages("add_new_admin", chatId)
            break;
        case "/set_more_keys":
            sendMessages("set_more_keys", chatId)
            break;
        case "/add_api_key":
            sendMessages("add_api_key", chatId)
            break;
        case "/clear_keys":
            sendMessages("clear_keys", chatId)
            break;
        default:
            break;
    }

})

app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`)
})

bot.on("polling_error", console.log);



