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
    const container = document.getElementById("queries")
    const addData = document.getElementById("submit-data");
    const searchUser = document.getElementById("search");
    //let first = document.getElementById("input-name").value;
    //let second = document.getElementById("input-task").value;

    addData.addEventListener("click", function() {

        fetch("http://localhost:3000/todo", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ name: document.getElementById("input-name").value, task: document.getElementById("input-task").value }),
        })
            .then((response) => response.json())
            .then((data) => {
                // spagetti for task 2
                console.log("Success:", data);
                const message = document.createElement("p")
                message.innerText = "user added";
                container.appendChild(message)

                const message2 = document.createElement("p")
                message2.innerText = "todo added";
                container.appendChild(message2)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    searchUser.addEventListener("click", function() {

        //let name = document.getElementById("search-name").value;

        fetch("http://localhost:3000/user/" + document.getElementById("search-name").value)
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);

                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                  }

                const user = document.createElement("h3");
                user.innerText = data.name + "'s tasks:"
                const text = document.createElement("p")
                text.innerText = data.todos
                container.appendChild(user)
                container.appendChild(text)

                // todo buttons
                if (data.todos) {
                    data.todos.forEach(todo => {
                        const todobutton = document.createElement("button")
                        todobutton.setAttribute("class", "delete-task")
                        todobutton.setAttribute("id", todo)
                        todobutton.innerText = "Delete task"
                        container.appendChild(todobutton)

                        todobutton.addEventListener("click", function() {
                            fetch('http://localhost:3000/user',  { 
                                method: "PUT",
                                headers: {
                                    "Content-type": "application/json"
                                },
                                body: JSON.stringify({ name: data.name, task: todo }),
                            })
                            .then(response => response.json())
                            .then((data) => {
                                console.log("Success:", data);
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                        })
                    });
                }

                //del button
                const del = document.createElement("button")
                del.setAttribute("id", "delete-user")
                del.innerText = "Delete user"
                container.appendChild(del)

                del.addEventListener("click", function() {
                    fetch('http://localhost:3000/user/' + document.getElementById("search-name").value, { 
                        method: 'DELETE' 
                    })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Success:", data);
                        while (container.firstChild) {
                            container.removeChild(container.firstChild);
                          }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
                })

            })
            .catch((error) => {
                console.error("Error:", error);
            });

    })



}