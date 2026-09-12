
fetch("./dataBase.json")
.then(response => response.json())
.then(data => {

    // HEADER LOGO
    let companyLogo = document.querySelector(".logo");
    companyLogo.src = data.logo
    // Hero Banner 
    let heroBanner = document.querySelector(".hero-banner");
    heroBanner.src = data.hbanner

    // Products 
    let productsArea = document.querySelector(".products-area");
    data.properties.forEach(pr => {
        // CreateElement
        let prCard = document.createElement("div")
        let prName = document.createElement("p")
        let prPrice = document.createElement("p")
        let prType = document.createElement("p")
        let prImage = document.createElement("img")
        let prlocation = document.createElement("p")
        prCard.id = `property-${pr.id}`;
        // Contents!
        prName.textContent = pr.title
        prPrice.textContent = `$${pr.price.toLocaleString()}`
        prType.textContent = pr.type
        prlocation.textContent = `Location: ${pr.location}`
        prImage.src = pr.image
        // Classes !
        prCard.className =
        "group overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer";

        prImage.className =
        "h-64 w-full object-cover transition duration-500 group-hover:scale-105";

        prName.className =
        "mt-5 mx-5 text-xl font-semibold text-[#25221D] inline-block relative after:absolute after:content-[''] after:-left-full after:bottom-0 after:bg-[#A6814C] group-hover:after:left-0 after:w-full after:h-[2px] overflow-hidden after:transition-all after:duration-400 after:ease-in-out property-name";

        prType.className =
        "mt-2 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#A6814C]";

        prPrice.className =
        "mt-4 px-5 text-lg font-bold text-[#25221D]";

        prlocation.className =
        "mt-2 px-5 pb-5 text-sm text-[#777067]";

        productsArea.appendChild(prCard)
        prCard.append(prImage , prName , prType, prPrice, prlocation)
// Inspect-CARD-EVENT!!!

let inspectArea = document.querySelector(".inspect-card");
let inspectContent = document.querySelector(".inspect-content");
prCard.addEventListener("click", () => {
    inspectArea.classList.remove("hidden");
    inspectArea.classList.add("flex");

    inspectContent.innerHTML = `

        <button
            class="close-btn absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 pb-2 text-2xl leading-none text-white backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-black/60 hover:rotate-90 "
        >
            ×
        </button>

        <img
            src="${pr.image}"
            alt="${pr.title}"
            class="h-72 w-full object-cover sm:h-96"
        >

        <div class="p-6 sm:p-8">

            <span class="text-xs product-type font-semibold uppercase tracking-[0.2em] text-[#A6814C]">
                ${pr.type}
            </span>

            <h2 class="mt-2 product-title text-2xl font-bold text-[#25221D] sm:text-3xl">
                ${pr.title}
            </h2>

            <p class="mt-2 product-location text-sm text-[#777067]">
                ${pr.location}
            </p>

            <p class="mt-6 text-2xl font-bold text-[#25221D]">
                $${pr.price.toLocaleString()}
            </p>

            <div class="mt-6 grid grid-cols-3 gap-3 border-t border-black/10 pt-6">

                <div class="rounded-2xl bg-white/60 p-4 text-center">
                    <span class="block text-xs text-[#777067]">Beds</span>
                    <strong class="mt-1 block text-lg text-[#25221D]">
                        ${pr.beds}
                    </strong>
                </div>

                <div class="rounded-2xl bg-white/60 p-4 text-center">
                    <span class="block text-xs text-[#777067]">Baths</span>
                    <strong class="mt-1 block text-lg text-[#25221D]">
                        ${pr.baths}
                    </strong>
                </div>

                <div class="rounded-2xl bg-white/60 p-4 text-center">
                    <span class="block text-xs text-[#777067]">Area</span>
                    <strong class="mt-1 block text-lg text-[#25221D]">
                        ${pr.area}m²
                    </strong>
                </div>

            </div>

        </div>
    `;
    let closeBtn = inspectContent.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        inspectContent.innerHTML = ""
        inspectArea.classList.add("hidden");
        inspectArea.classList.remove("flex");
            })
        });
    });
    // search & type & location search/filter system
    let propertySearch = document.querySelector("#property-search");
    let propertyType = document.querySelector("#property-type");
    let propertyLocation = document.querySelector("#property-location");
    let resultContainer = document.querySelector(".search-result");

    function filterProperties() {

    let searchValue = propertySearch.value.toLowerCase().trim();
    let selectedType = propertyType.value.toLowerCase();
    let selectedLocation = propertyLocation.value.toLowerCase();
    console.log({
    searchValue,
    selectedType,
    selectedLocation
});
    let filteredProperties = data.properties.filter(pr => {

        let matchesSearch =
            pr.title.toLowerCase().includes(searchValue);

        let matchesType =
            selectedType === "all" ||
            pr.type.toLowerCase() === selectedType;

        let matchesLocation =
            selectedLocation === "all" ||
            pr.location.toLowerCase().includes(selectedLocation);

        return matchesSearch && matchesType && matchesLocation;
    });
    resultContainer.innerHTML = "";
    resultContainer.classList.remove("hidden");
filteredProperties.forEach(pr => {

    let result = document.createElement("div");

    result.className =
        "cursor-pointer border-b border-black/5 px-4 py-3 text-sm text-[#25221D] transition-all duration-200 last:border-b-0 hover:bg-[#A6814C]/10 hover:pl-5";

    result.textContent = pr.title;

    result.addEventListener("click", () => {

        propertySearch.value = pr.title;
        resultContainer.classList.add("hidden");

        let targetCard = document.querySelector(`#property-${pr.id}`);

        targetCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

    resultContainer.append(result);
});
    
}
propertySearch.addEventListener("input", filterProperties);

propertyType.addEventListener("change", filterProperties);

propertyLocation.addEventListener("change", filterProperties);
// aboutBanner
let aboutBanner = document.querySelector(".about-banner");
aboutBanner.src = data.aboutBanner
// locationsBanners
let creal = document.querySelector(".creal");
creal.src = data.realS1
let freal = document.querySelector(".freal");
freal.src = data.realS2
let nreal = document.querySelector(".nreal");
nreal.src = data.realS3
// footerLogo
let logoF = document.querySelector(".logof");
logoF.src = data.logo
})
// moblieResposiveHeader
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
// LOGIN MODAL

let loginBtn = document.querySelector("#login-btn");
let loginModal = document.querySelector("#login-modal");
let loginClose = document.querySelector("#login-close");

loginBtn.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");
});

loginClose.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    loginModal.classList.remove("flex");
});

