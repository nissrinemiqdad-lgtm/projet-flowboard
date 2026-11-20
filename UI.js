
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

function chargerCartes() {
    return fetch("https://flowboard-api-virid.vercel.app/cards")
        .then((res) => {
           
            return res.json();
        })
        .then((donnees) => {
            loading.style.display = "none";

            console.log(donnees)
            return donnees

        });
}
chargerCartes()

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

    // category
    const category = document.createElement("p");
    category.textContent = `Catégorie : ${card.tags}`;

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

    body.append(titre, description, assignee, category, date, priority);
    div.appendChild(body);
    colonne.appendChild(div);
}


