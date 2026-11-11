export function getCards() {
    return fetch("https://flowboard-api-virid.vercel.app/cards")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Erreur lors du chargement des cartes");
            }

            return res.json();
        })
        .then((donnees) => {
            return donnees;
        });
}
