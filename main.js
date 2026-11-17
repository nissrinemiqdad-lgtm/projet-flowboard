import {
    displayCards,
    displayState,
    validateCard,
    openCardModal,
    readCardForm,
    displayAssignees,
    closeCardModal,
} from "./UI.js";
import { getCards } from "./API.js";


const state = {
    cards: [],
    loading: true,
    error: null
};


const search = document.querySelector("#search-task");
const filtre_priority = document.querySelector("#filter-priority");
const filtre_assignee = document.querySelector("#filter-assignee");
const addCardBtn = document.querySelector("#add-card-btn");
const retryBtn = document.querySelector("#retry-btn");
const addCardForm = document.querySelector("#add-card-form");

function loadCards() {
    state.loading = true;
    state.error = null;
    displayState(state);
    getCards()
        .then((donnees) => {
            state.cards = donnees;
            const responsables = [];

            state.cards.forEach((carte) => {
                if (!responsables.includes(carte.assignee)) {
                    responsables.push(carte.assignee);
                }
            });

            displayAssignees(responsables);

            state.loading = false;
            state.error = null;
            displayState(state);
            displayCards(state.cards);
        })
        .catch((error) => {
            state.loading = false;
            state.error = "Impossible de charger les cartes.";
            displayState(state);
        });

}


function Filters() {
    const params = new URLSearchParams();

    if (search.value !== "") {
        params.append("q", search.value);
    }

    if (filtre_priority.value !== "") {
        params.append("priority", filtre_priority.value);
    }

    if (filtre_assignee.value !== "") {
        params.append("assignee", filtre_assignee.value);
    }

    getCards(params)
        .then((donnees) => {
            state.cards = donnees;
            displayCards(state.cards);
        })
        .catch((error) => {
            state.error = "Impossible de filtrer les cartes.";
            displayState(state);
        });
}



addCardBtn.addEventListener("click", openCardModal);

retryBtn.addEventListener("click", loadCards);

search.addEventListener("input", Filters);
filtre_priority.addEventListener("change", Filters);
filtre_assignee.addEventListener("change", Filters);

loadCards();



addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Le formulaire est envoyé !");

    const card = readCardForm();

    if (!validateCard(card)) {
        Swal.fire({
            icon: "error",
            title: "Champs obligatoires",
            text: "Veuillez remplir tous les champs !"
        });
        return;
    }

    state.cards.push(card)
    closeCardModal();
    addCardForm.reset();
    displayCards(state.cards);


});
