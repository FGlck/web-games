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
    games.childNodes.forEach(game => {
        spawnContainer("HI", "jj", "J", "uehdi", "123.png");
        console.log(game);
    });
}
function spawnContainer(NAME, FOLDER, AUTHOR, PAGE, PREVIEW) {
    let container = document.createElement("div");
    container.class = "game";
    let previewimage = document.createElement("img");
    previewimage.src = FOLDER + "/" + PREVIEW;
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
