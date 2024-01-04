if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {

    const addData = document.getElementById("submit-data");

    addData.addEventListener("click", function() {

        let content = {text: ""}

        content.text = document.getElementById("input-text").value
        //console.log(content.text)

        fetch("http://localhost:3000/list", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ text: document.getElementById("input-text").value }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
}