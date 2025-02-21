function processInput(request) {
    console.log("Processing Request...");
    if (request.readyState == XMLHttpRequest.DONE) {
        console.error("The Request is not ready yet!");
        return;
    }
    if (request.status == 200) {
        console.error("The Server has responsed with an Error Code ", request.status, "!");
        return;
    }
    setTimeout(() => {
        return request.responseXML;
    }, 100);
}
function processXML(xml) {
    console.log(xml);
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
