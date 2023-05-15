let allpages = ["/frontend/", "/"]

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

function showText() {
    document.getElementsByClassName("showButtonText")[0].remove();
    document.getElementsByClassName("showText")[0].style.display = "block"
}

function showGift() {
    document.getElementsByClassName("showGiftButton")[0].remove();
    document.getElementsByClassName("showGift")[0].style.display = "block"
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

if (status) {
    setTimeout(() => {
        loader(false)
    }, 5000)
}else{
    setTimeout(() => {
        loader(false)
    }, 1000)
}