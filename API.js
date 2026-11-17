export async function getCards(params = {}) {
    try {
        const response = await axios.get("https://flowboard-api-virid.vercel.app/cards?" , { params : params})
        return response.data
    }
    catch(error){
        console.error("erreur dans la récupération du data ");
        throw error;
    }
          
}


// .then((res) => {
//         if (!res.ok) {
//             throw new Error("Erreur lors du chargement des cartes");
//         }

//         return res.json();
//     })

//         .then((donnees) => {
//             return donnees;
//         })
