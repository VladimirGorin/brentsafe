let navbarBrandName = "Amecacoin wallet"
let brandNameAbbreviated = "Amecacoin wallet"
let brandNameEmail = "support@amecacoin.com"


for (let navBarBrand in document.getElementsByClassName("navbar-brand__name")) {
    document.getElementsByClassName("navbar-brand__name")[navBarBrand].textContent = navbarBrandName
}

for (let brandAbbreviated in document.getElementsByClassName("brand-name__abbreviated")) {
    document.getElementsByClassName("brand-name__abbreviated")[brandAbbreviated].textContent = brandNameAbbreviated
}

for (let brandEmail in document.getElementsByClassName("brand-name__email")) {
    document.getElementsByClassName("brand-name__email")[brandEmail].textContent = brandNameEmail
}

