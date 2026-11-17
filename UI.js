
const todo = document.querySelector("#todo-list")
const progress = document.querySelector("#inprogress-list")
const done = document.querySelector("#done-list")
const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#inprogress-count");
const doneCount = document.querySelector("#done-count");
const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const errorMessage = document.querySelector("#error-message");

export function displayCards(donnees) {
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
            couleur = "bg-warning "
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

export function displayState(state) {
    loadingElement.classList.toggle("d-none", !state.loading);
    errorMessage.textContent = state.error || "";
    errorElement.classList.toggle("d-none", !state.error);
}
const filtre_assignee = document.querySelector("#filter-assignee");

export function displayAssignees(responsables) {
    filtre_assignee.innerHTML = '<option value="">Tous les responsables</option>';

    responsables.forEach((responsable) => {
        const option = document.createElement("option");
        option.textContent = responsable;
        option.value = responsable;
        filtre_assignee.appendChild(option);
    });
}


// AJOUTE DU CARD
const modalElement = document.querySelector("#addCardModal");
const cardTitle = document.querySelector("#card-title");
const cardDescription = document.querySelector("#card-description");
const cardPriority = document.querySelector("#card-priority");
const cardAssignee = document.querySelector("#card-assignee");
const cardDate = document.querySelector("#card-date");
const cardStatus = document.querySelector("#card-status");


export function openCardModal() {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

export function closeCardModal() {
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}


export function readCardForm() {
    const card = {
        title: cardTitle.value.trim(),
        description: cardDescription.value.trim(),
        priority: cardPriority.value,
        assignee: cardAssignee.value.trim(),
        dueDate: cardDate.value,
        status: cardStatus.value,
        tags: []
    };

    return card;
}

export function validateCard(card) {
    if (!card.title || !card.description || !card.assignee || !card.dueDate) {
        return false;
    }

    return true;
}

