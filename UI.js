
// const todo = document.querySelector("#todo-list")
// const progress = document.querySelector("#inprogress-list")
// const done = document.querySelector("#done-list")
// const todoCount = document.querySelector("#todo-count");
// const progressCount = document.querySelector("#inprogress-count");
// const doneCount = document.querySelector("#done-count");
// const loadingElement = document.querySelector("#loading");
// const errorElement = document.querySelector("#error");
// const errorMessage = document.querySelector("#error-message");

// //  afficher les cartes par colonne : 

// export function displayCards(donnees) {
//     todo.innerHTML = "";
//     progress.innerHTML = "";
//     done.innerHTML = "";
//     donnees.forEach((carte) => {
//         let priorite = "";
//         let couleur = "";

//         if (carte.priority === "high") {
//             priorite = "Haute";
//             couleur = "bg-danger";
//         }
//         else if (carte.priority === "medium") {
//             priorite = "Moyenne";
//             couleur = "bg-warning "
//         }
//         else if (carte.priority === "low") {
//             priorite = "Basse";
//             couleur = "bg-success";
//         }

//         const cardHTML = `
//         <div class="card task-card mb-3">
//             <div class="card-body">
//                 <h5 class="card-title">${carte.title}</h5>
//                 <p class="card-text">${carte.description}</p>
//                 <p class="card-text"> Responsable : ${carte.assignee} </p>
//                 <p class="card-text"> Date limite : ${carte.dueDate}</p>
//                 <span class="badge ${couleur}">${priorite}</span>

//                  ${carte.status !== "todo" ? `
//                 <button class="btn btn-secondary btn-deplacer" data-id="${carte.id}" data-direction="gauche"> ← </button> ` : ""}

//                 ${carte.status !== "done" ? `
//                 <button class="btn btn-secondary btn-deplacer" data-id="${carte.id}" data-direction="droite"> → </button>  ` : ""}

//                 <button class="btn bg-secondary text-white  p-0.5  btn-modifier" data-id="${carte.id}" > Modifier </button>
//             </div>
//         </div>`;

//         if (carte.status === "todo") {
//             todo.innerHTML += cardHTML;
//         }
//         else if (carte.status === "in-progress") {
//             progress.innerHTML += cardHTML;
//         }
//         else if (carte.status === "done") {
//             done.innerHTML += cardHTML;
//         }
//         // console.log(carte.status);

//     });
//     todoCount.textContent = todo.children.length;
//     progressCount.textContent = progress.children.length;
//     doneCount.textContent = done.children.length;

// }
// //  afficher ou cacher les erreur et les chargements : 

// export function displayState(state) {
//     loadingElement.classList.toggle("d-none", !state.loading);
//     errorMessage.textContent = state.error || "";
//     errorElement.classList.toggle("d-none", !state.error);
// }

// const filtre_assignee = document.querySelector("#filter-assignee");

// // afficher les responsables : 

// export function displayAssignees(responsables) {
//     filtre_assignee.innerHTML = '<option value="">Tous les responsables</option>';

//     responsables.forEach((responsable) => {
//         const option = document.createElement("option");
//         option.textContent = responsable;
//         option.value = responsable;
//         filtre_assignee.appendChild(option);
//     });
// }


// // 
// const modalElement = document.querySelector("#addCardModal");
// const cardTitle = document.querySelector("#card-title");
// const cardDescription = document.querySelector("#card-description");
// const cardPriority = document.querySelector("#card-priority");
// const cardAssignee = document.querySelector("#card-assignee");
// const cardDate = document.querySelector("#card-date");
// const cardStatus = document.querySelector("#card-status");

// // ouverture de modal : 

// export function openCardModal() {
//     const modal = new bootstrap.Modal(modalElement);
//     modal.show();
// }

// //  fermeture de modal : 

// export function closeCardModal() {
//     const modal = bootstrap.Modal.getInstance(modalElement);
//     modal.hide();
// }

// // recuperation des valeurs formulaire : 

// export function readCardForm() {
//     const card = {
//         title: cardTitle.value.trim(),
//         description: cardDescription.value.trim(),
//         priority: cardPriority.value,
//         assignee: cardAssignee.value.trim(),
//         dueDate: cardDate.value,
//         status: cardStatus.value,
//         tags: []
//     };

//     return card;
// }

// // validation des champs : 

// export function validateCard(card) {
//     if (!card.title || !card.description || !card.assignee || !card.dueDate) {
//         return false;
//     }

//     return true;
// }

// // Modification :

// export function fillCardForm(carte) {
//     cardTitle.value = carte.title;
//     cardDescription.value = carte.description;
//     cardPriority.value = carte.priority;
//     cardAssignee.value = carte.assignee;
//     cardDate.value = carte.dueDate;
//     cardStatus.value = carte.status;
// }

// const modalTitle = document.querySelector("#modal-title");

// export function changeModalTitle(title) {
//     modalTitle.textContent = title;
// }

const loading = document.querySelector("#loading");
const todo = document.querySelector("#todo-list")
const progress = document.querySelector("#inprogress-list")
const done = document.querySelector("#done-list")
const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#inprogress-count");
const doneCount = document.querySelector("#done-count");
const titleCard = document.querySelector("#card-title");
const descriptionCard = document.querySelector("#card-description");
const priorityCard = document.querySelector("#card-priority");
const assigneeCard = document.querySelector("#card-assignee");
const DateCard = document.querySelector("#card-date");
const statusCard = document.querySelector("#card-status");
const Modal = document.querySelector("#addCardModal");
const buttonTerminée = document.querySelector("#terminé");
const form = document.querySelector("#add-card-form");

let cards = [];
let cardModifier = null;
// charger les données depuis API 

function chargerCartes() {
    return fetch("https://flowboard-api-virid.vercel.app/cards")
        .then((res) => {

            if (!res.ok) {
                throw new Error("Erreur lors du chargement des cartes");
            }
            return res.json();

        })
        .then((donnees) => {
            loading.style.display = "none";
            console.log(donnees);
            cards = donnees
            affichercards(donnees);
        })
        .catch((erreur) => {
            console.error(erreur);
            loading.textContent = "Impossible de charger les cartes.";
        });

}
chargerCartes()

// la creation du card

function creationcard(card, colonne) {
    const div = document.createElement("div");
    div.className = "card mb-3";

    const body = document.createElement("div");
    body.className = "card-body";

    const titre = document.createElement("h5");
    titre.textContent = card.title;

    const description = document.createElement("p");
    description.textContent = card.description;

    // assignee
    const assignee = document.createElement("p");
    assignee.textContent = `Responsable : ${card.assignee}`;

    // date
    const date = document.createElement("p");
    date.textContent = `Date limite : ${card.dueDate}`;

    // priority 
    const priority = document.createElement("span")

    if (card.priority === "high") {
        priority.textContent = "Haute";
        priority.className = "badge bg-danger";
    }
    else if (card.priority === "medium") {
        priority.textContent = "Moyenne";
        priority.className = "badge bg-warning ";
    }
    else {
        priority.textContent = "Basse";
        priority.className = "badge bg-success";
    }

    const modifier = document.createElement("button");

    modifier.textContent = "Modifier";
    modifier.className = "btn btn-secondary m-1 btn-modifier";
    modifier.dataset.id = card.id;
    modifier.addEventListener("click", () => {

        const id = Number(modifier.dataset.id);

        const card = cards.find((element) => {
            return element.id === id;
        });
        titleCard.value = card.title
        descriptionCard.value = card.description
        priorityCard.value = card.priority
        assigneeCard.value = card.assignee
        DateCard.value = card.dueDate
        statusCard.value = card.status

        console.log(card);
        cardModifier = card.id
        console.log(cardModifier);

        const modal = new bootstrap.Modal(Modal);
        modal.show();

        buttonTerminée.addEventListener('click', () => {
            const modal = bootstrap.Modal.getInstance(Modal)
            modal.hide()

        })

    });



    body.append(titre, description, assignee, date, priority, modifier);
    div.appendChild(body);
    colonne.appendChild(div);
}

// affichage du card 

function affichercards(cards) {

    todo.innerHTML = "";
    progress.innerHTML = "";
    done.innerHTML = "";

    const cardsTodo = cards.filter((card) => {
        return card.status === "todo";
    });
    const cardsprogress = cards.filter((card) => {
        return card.status === "in-progress"
    });
    const cardsdone = cards.filter((card) => {
        return card.status === 'done'
    });

    cardsTodo.forEach((card) => creationcard(card, todo));
    cardsprogress.forEach((card) => creationcard(card, progress));
    cardsdone.forEach((card) => creationcard(card, done));

    todoCount.textContent = cardsTodo.length;
    progressCount.textContent = cardsprogress.length;
    doneCount.textContent = cardsdone.length;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nouvelleCarte = {
        title: titleCard.value,
        description: descriptionCard.value,
        priority: priorityCard.value,
        assignee: assigneeCard.value,
        dueDate: DateCard.value,
        status: statusCard.value
    };
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === cardModifier) {
            cards[i].title = nouvelleCarte.title;
            cards[i].description = nouvelleCarte.description;
            cards[i].priority = nouvelleCarte.priority;
            cards[i].assignee = nouvelleCarte.assignee;
            cards[i].dueDate = nouvelleCarte.Date;
            cards[i].status = nouvelleCarte.status;
        }
    }
    affichercards(cards)

    console.log(cardModifier);

});
