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

    const container = document.getElementById("recipes")

/*     fetch("http://localhost:3000/recipe/pasta") //document.getElementById("name").innerText)
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);

            const nametext = document.createElement("h3") // name
            nametext.innerText = data.name
            container.appendChild(nametext)

            const instructionsText = document.createElement("div") // instructions
            const instructionsTitle = document.createElement("h3")
            instructionsTitle.innerText = "Instructions:"
            container.appendChild(instructionsTitle)
            data.instructions.forEach(task => {
                const tasks = document.createElement("p")
                tasks.innerText = task
                instructionsText.appendChild(tasks)
            });
            container.append(instructionsText)

            const ingredientsText = document.createElement("div") // ingredients
            const ingredientsTitle = document.createElement("h3")
            ingredientsTitle.innerText = "Ingredients:"
            container.appendChild(ingredientsTitle)
            data.ingredients.forEach(food => {
                const foodies = document.createElement("p")
                foodies.innerText = food
                ingredientsText.appendChild(foodies)
            });
            container.append(ingredientsText)

        })
        .catch((error) => {
            console.error("Error:", error);
        }); */


    // Other stuff ---------------------------------------------------------
    let list = { name: "", ingredients: [], instructions: [] }

    const searchbutton = document.getElementById("s-button");

    let input = document.getElementById("search-bar");

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("s-button").click();
        }
        });

    searchbutton.addEventListener("click", function() { // Searched recipe!!!!
        console.log(document.getElementById("search-bar").innerText)
        fetch("http://localhost:3000/recipe/" + document.getElementById("search-bar").value)
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);

            let child = container.lastElementChild; // remove existing recipe elements 
            while (child) { 
                container.removeChild(child); 
                child = container.lastElementChild; 
            } 

            const nametext = document.createElement("h3") // name
            nametext.innerText = data.name
            container.appendChild(nametext)

            const instructionsText = document.createElement("div") // instructions
            const instructionsTitle = document.createElement("h3")
            instructionsTitle.innerText = "Instructions:"
            container.appendChild(instructionsTitle)
            data.instructions.forEach(task => {
                const tasks = document.createElement("p")
                tasks.innerText = task
                instructionsText.appendChild(tasks)
            });
            container.append(instructionsText)

            const ingredientsText = document.createElement("div") // ingredients
            const ingredientsTitle = document.createElement("h3")
            ingredientsTitle.innerText = "Ingredients:"
            container.appendChild(ingredientsTitle)
            data.ingredients.forEach(food => {
                const foodies = document.createElement("p")
                foodies.innerText = food
                ingredientsText.appendChild(foodies)
            });
            container.append(ingredientsText)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    })

    const addIng = document.getElementById("add-ingredient")
    const addIns = document.getElementById("add-instruction")
    const newName = document.getElementById("name-text")
    const submitData = document.getElementById("submit")
    const images = document.getElementById("image-input")

    addIng.addEventListener("click", function() { // Ingredients button
        const text = document.getElementById("ingredients-text")
        list.ingredients.push(text.value)
        console.log("Added ingredient:" + list.name + list.ingredients[0])
    })

    addIns.addEventListener("click", function() { // Instructions button
        const text = document.getElementById("instructions-text")
        list.instructions.push(text.value)
        console.log("Added instruction:" + list.name + list.instructions[0])
    })

    submitData.addEventListener("click", function() { // submit button
        list.name = newName.value
          
        fetch("http://localhost:3000/recipe/", { // recipe
            method: "post",
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify(list)
            })
            .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

            list.instructions.length = 0
            list.ingredients.length = 0
        });


/*         const formData = new FormData();        // images
        const pics = document.getElementById("image-input").files
        for (let i = 0; i < pics.length; i++) {
            formData.append("images", pics[i]);
        }
    
        fetch("http://localhost:3000/images", { // images
            method: "post",
            body: formData,
            headers: {
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            }); */

}