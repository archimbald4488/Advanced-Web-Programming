const container = document.getElementById("containerID");
const imgbreeds = ["hound", "african", "beagle", "cockapoo", "dingo"];
const wikibreeds = ["Hound", "Africanis", "Beagle", "Cockapoo", "Dingo"]

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
    fetchData();
}

async function fetchData () {
    //onsole.log(imgUrl)
    const APIurl = "";

    for (let i = 0; i < 5; i++) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("wiki-item");

        const breedName = document.createElement("h1");
        breedName.classList.add("wiki-header");
        breedName.innerText = wikibreeds[i];

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("wiki-content");

        const textP = document.createElement("p");
        textP.classList.add("wiki-text")
        const pUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + wikibreeds[i];
        const pPromise = await fetch(pUrl);
        const pJSON = await pPromise.json();
        textP.innerText = pJSON.extract;

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("img-container");

        const imgBreed = document.createElement("img");
        imgBreed.classList.add("wiki-img")
        const imgUrl = "https://dog.ceo/api/breed/" + imgbreeds[i] + "/images/random";
        const imgPromise = await fetch(imgUrl);
        const imgJSON = await imgPromise.json();
        imgBreed.src = imgJSON.message;

        imageDiv.appendChild(imgBreed);
        contentDiv.appendChild(imageDiv)
        contentDiv.appendChild(textP);
        itemDiv.appendChild(breedName);
        itemDiv.appendChild(contentDiv);

        container.appendChild(itemDiv);

    }

}