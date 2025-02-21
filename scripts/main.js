function processInput(request) {
    console.log("Processing Request...");
    if (request.readyState != XMLHttpRequest.DONE) {
        console.error("The Request is not ready yet!");
        return;
    }
    if (request.status != 200) {
        console.error("The Server has responsed with an Error Code ", request.status, "!");
        return;
    }
    return request.responseXML;
}
function processXML(xml) {
    console.log("Processing XML...");
    let games = xml.getElementsByTagName("GAME");
    for (i = 0; i < games.length; i++) {
        let game = games.item(i);
        let name = game.getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
        let folder = game.getElementsByTagName("FOLDER")[0].childNodes[0].nodeValue;
        let author = game.getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue;
        let page = game.getElementsByTagName("PAGE")[0].childNodes[0].nodeValue;
        let preview = game.getElementsByTagName("PREVIEW")[0].childNodes[0].nodeValue;
        spawnContainer(name, folder, author, page, preview);
    }
    console.log("Processed XML!");
}
function spawnContainer(NAME, FOLDER, AUTHOR, PAGE, PREVIEW) {
    let container = document.createElement("div");
    container.classList.add("game");
    let previewimage = document.createElement("img");
    previewimage.src = FOLDER + "/" + PREVIEW;
    previewimage.addEventListener("click", () => {
        location.href = FOLDER + "/index.html";
    });
    container.appendChild(previewimage);
    let title = document.createElement("h1");
    title.innerText = NAME;
    container.appendChild(title);
    let subtitle = document.createElement("a");
    subtitle.href = PAGE;
    subtitle.innerText = AUTHOR;
    container.appendChild(subtitle);
    document.body.appendChild(container);
}

let request = new XMLHttpRequest();
request.open("GET", "games.xml", true);
request.overrideMimeType("text/xml");
request.addEventListener("load", () => {
    let xml = processInput(request);
    if (xml != null) {
        processXML(xml);
    } else {
        console.error("Failed to Process Request!");
    }
});
request.send();
