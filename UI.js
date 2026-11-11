import { getCards } from "./API.js";
const state = {
    cards: [],
    loading: true,
    error: null
};

const todo = document.querySelector("#todo-list")
const progress = document.querySelector("#inprogress-list")
const done = document.querySelector("#done-list")
const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#inprogress-count");
const doneCount = document.querySelector("#done-count");
const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const errorMessage = document.querySelector("#error-message");

function displayCards(donnees) {
    todo.innerHTML = "";
    progress.innerHTML = "";
    done.innerHTML = "";
    donnees.forEach((carte) => {
        let priorite = "";
        let couleur = "";

        if (carte.priority === "high") {
            priorite = "Haute";
            couleur = "bg-danger";
        }
        else if (carte.priority === "medium") {
            priorite = "Moyenne";
            couleur = "bg-warning text-dark"
        }
        else if (carte.priority === "low") {
            priorite = "Basse";
            couleur = "bg-success";
        }

        const cardHTML = `
        <div class="card task-card mb-3">
            <div class="card-body">
                <h5 class="card-title">${carte.title}</h5>
                <p class="card-text">${carte.description}</p>
                <p class="card-text"> Responsable : ${carte.assignee} </p>
                <p class="card-text"> Date limite : ${carte.dueDate}</p>
                <span class="badge ${couleur}">${priorite}</span>
            </div>
        </div>`;

        if (carte.status === "todo") {
            todo.innerHTML += cardHTML;
        }
        else if (carte.status === "in-progress") {
            progress.innerHTML += cardHTML;
        }
        else if (carte.status === "done") {
            done.innerHTML += cardHTML;
        }
        // console.log(carte.status);

    });
    todoCount.textContent = todo.children.length;
    progressCount.textContent = progress.children.length;
    doneCount.textContent = done.children.length;

}
