import {
    displayCards,
    displayState,
    validateCard,
    openCardModal,
    readCardForm,
    displayAssignees,
    closeCardModal,
    fillCardForm,
    changeModalTitle,
} from "./UI.js";
import { getCards, updateCard } from "./API.js";


const state = {
    cards: [],
    loading: true,
    error: null
};

let cardToEdit = null;

const search = document.querySelector("#search-task");
const filtre_priority = document.querySelector("#filter-priority");
const filtre_assignee = document.querySelector("#filter-assignee");
const addCardBtn = document.querySelector("#add-card-btn");
const retryBtn = document.querySelector("#retry-btn");
const addCardForm = document.querySelector("#add-card-form");

//  charger les carte au demarage : 

function loadCards() {

    // recuperation des cards depuis API : 

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

// filtrers les resultats :

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
}

addCardBtn.addEventListener("click", () => {
    cardToEdit = null;
    changeModalTitle("Ajouter une nouvelle tâche");
    openCardModal();
});


retryBtn.addEventListener("click", loadCards);

search.addEventListener("input", Filters);
filtre_priority.addEventListener("change", Filters);
filtre_assignee.addEventListener("change", Filters);

loadCards();


const creerCardBtn = document.querySelector("#terminé");

addCardForm.addEventListener("submit", async (event) => {
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

    if (cardToEdit) {
        creerCardBtn.disabled = true;

        try {
            await updateCard(cardToEdit.id, card);
            cardToEdit = null;
            loadCards();

            closeCardModal();
            addCardForm.reset();

        } finally {
            creerCardBtn.disabled = false;
        }
    }
    else {
        state.cards.push(card);
        displayCards(state.cards);

        closeCardModal();
        addCardForm.reset();
    }

});

// Modification :

document.addEventListener("click", (event) => {

    if (event.target.className.includes("btn-modifier")) {

        const id = event.target.dataset.id;

        const carte = state.cards.find((carte) => {
            return String(carte.id) === id;
        });

        cardToEdit = carte;
        fillCardForm(cardToEdit);
        changeModalTitle("Modifier une tâche");
        openCardModal();

        console.log(cardToEdit);
    }

});


