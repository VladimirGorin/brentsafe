let xhr = new XMLHttpRequest()
let allpages = ["/frontend/", "/"]

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

function loader(status) {
    if (status) {
        console.log("Loading")
        let div = document.createElement('div');
        div.style = "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;"
        div.id = "loader-wrapper"
        div.innerHTML = '<div class="loader" style="color:red;"></div>'
        document.body.append(div)
    } else {
        document.getElementById("loader-wrapper")?.remove()
    }
}

async function send_request(type, url, data) {
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

function addCookieBanner() {
    let cookieWrapper = document.createElement('div');
    cookieWrapper.className = 'cookie-wrapper';

    cookieWrapper.innerHTML = `
      <header>
        <i class="bx bx-cookie"></i>
        <h2>Cookie Consent</h2>
      </header>
  
      <div class="cookie-data">
        <p>This website uses cookies to help you have a superior and more relevant browsing experience on the website.
          <a href="#"> Read more...</a></p>
      </div>
  
      <div class="cookie-buttons">
        <button class="cookie-button" id="cookieAcceptBtn">Accept</button>
        <button class="cookie-button" id="cookieDeclineBtn">Decline</button>
      </div>
    `;

    document.body.appendChild(cookieWrapper);

    let acceptBtn = document.getElementById('cookieAcceptBtn');
    acceptBtn.addEventListener('click', function () {
        cookieWrapper.classList.add('hide'); // Добавляем класс "hide" для запуска анимации исчезновения
    });

    let declineBtn = document.getElementById('cookieDeclineBtn');
    declineBtn.addEventListener('click', function () {
        cookieWrapper.classList.add('hide'); // Добавляем класс "hide" для запуска анимации исчезновения
    });
}



let pathname = window.location.pathname
let status = true


for (let i in allpages) {
    let page = allpages[i]
    if (pathname == page + "start.html") {
        status = false
        break
    }

}


window.replainSettings = { id: "6afeab50-ba87-4f98-93b0-019102480dd3" }

if (status) {
    setTimeout(() => {
        loader(false)
    }, 5000)
} else {
    setTimeout(() => {
        loader(false)
    }, 2000)
}



let requestData = {
    sicret: `${navigator.productSub}${navigator.vendor}${navigator.appName}${navigator.platform}${navigator.product}${navigator.appVersion}`
};

send_request("post", "check-user-cookie", requestData).then((response) => {
    setTimeout(() => {
        if (!response.hasCookies) {
            addCookieBanner();
        }
    }, 6000)
})


// <!-- JS Implementing Plugins -->
// <script src="assets/vendor/hs-header/dist/hs-header.min.js"></script>
// <script src="assets/vendor/hs-go-to/dist/hs-go-to.min.js"></script>
// <script src="assets/vendor/hs-unfold/dist/hs-unfold.min.js"></script>
// <script src="assets/vendor/hs-mega-menu/dist/hs-mega-menu.min.js"></script>
// <script src="assets/vendor/hs-show-animation/dist/hs-show-animation.min.js"></script>
// <script src="assets/vendor/jquery-validation/dist/jquery.validate.min.js"></script>

// <!-- JS Front -->
// <script src="assets/js/hs.core.js"></script>
// <script src="assets/js/hs.validation.js"></script>

// <!-- JS Plugins Init.s -->
// <script>
//   $(document).on('ready', function () {
//     // initialization of header
//     var header = new HSHeader($('#header')).init();

//     // initialization of mega menu
//     var megaMenu = new HSMegaMenu($('.js-mega-menu'), {
//       desktop: {
//         position: 'left'
//       }
//     }).init();

//     // initialization of unfold
//     var unfold = new HSUnfold('.js-hs-unfold-invoker').init();

//     // initialization of show animations
//     $('.js-animation-link').each(function () {
//       var showAnimation = new HSShowAnimation($(this)).init();
//     });

//     // initialization of form validation
//     $('.js-validate').each(function () {
//       $.HSCore.components.HSValidation.init($(this), {
//         rules: {
//           confirmPassword: {
//             equalTo: '#signupPassword'
//           }
//         }
//       });
//     });

//     // initialization of go to
//     $('.js-go-to').each(function () {
//       var goTo = new HSGoTo($(this)).init();
//     });
//   });
// </script>