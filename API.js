export function getCards(params = new URLSearchParams()) {
    return fetch("https://flowboard-api-virid.vercel.app/cards?" + params.toString())
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
