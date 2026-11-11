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
function loadCards() {
    state.loading = true;
    state.error = null;
    displayState();
    getCards()
        .then((donnees) => {
            state.cards = donnees;
            state.loading = false;
            state.error = null;
            displayState();
            displayCards(state.cards);
        })
        .catch((error) => {
            state.loading = false;
            state.error = "Impossible de charger les cartes.";
            displayState();
        });
}
function displayState() {
    loadingElement.classList.toggle("d-none", !state.loading);
    errorMessage.textContent = state.error || "";
    errorElement.classList.toggle("d-none", !state.error);
}

const retryBtn = document.querySelector("#retry-btn");
retryBtn.addEventListener("click", loadCards);
loadCards();

const addCardBtn = document.querySelector("#add-card-btn");
const modalElement = document.querySelector("#addCardModal");
const addCardForm = document.querySelector("#add-card-form");

const cardTitle = document.querySelector("#card-title");
const cardDescription = document.querySelector("#card-description");
const cardPriority = document.querySelector("#card-priority");
const cardAssignee = document.querySelector("#card-assignee");
const cardDate = document.querySelector("#card-date");
const cardStatus = document.querySelector("#card-status");

addCardBtn.addEventListener("click", () => {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
});
addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const card = {
        id: Date.now(),
        title: cardTitle.value.trim(),
        description: cardDescription.value.trim(),
        priority: cardPriority.value,
        assignee: cardAssignee.value.trim(),
        dueDate: cardDate.value,
        status: cardStatus.value,
        tags: []
    };
    if (!validateCard(card)) {
        console.log("Veuillez remplir tous les champs !");
        return;
    }
    state.cards.push(card);
    displayCards(state.cards);

});
function validateCard(card) {
    if (!card.title || !card.description || !card.assignee || !card.dueDate) {
        return false;
    }

    return true;
}