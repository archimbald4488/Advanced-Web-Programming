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

    let list = { name: "", instructions: [], ingredients: []}

    const addIng = document.getElementById("add-ingredient")
    const addIns = document.getElementById("add-instruction")
    const newName = document.getElementById("name-text")
    const submitData = document.getElementById("submit")

    addIng.addEventListener("click", function() { // Ingredients button
        list.name = newName.value
        const text = document.getElementById("ingredients-text")
        list.ingredients.push(text.value)
        console.log("Added ingredient:" + list.name + list.ingredients[0])
    })

    addIns.addEventListener("click", function() { // Instructions button
        list.name = newName.value
        const text = document.getElementById("instructions-text")
        list.instructions.push(text.value)
        console.log("Added instruction:" + list.name + list.instructions[0])
    })

    submitData.addEventListener("click", function() { // submit button
        fetch("http://localhost:3000/recipe/", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(list)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    })


}