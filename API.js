export async function getCards(params = {}) {
    try {
        const response = await axios.get("https://flowboard-api-virid.vercel.app/cards?", {
            headers: {
                'X-Workspace': 'public',
            },
            params: {
                'password': '1234'
            },
            params: params
        })
        return response.data
    }
    catch (error) {
        console.error("erreur dans la récupération du data ");
        throw error;
    }

}

export async function updateCard(id, card) {
    try {
        const response = await axios.put(
            `https://flowboard-api-virid.vercel.app/cards/${id}`, card,
            {
                headers: {
                    'X-Workspace': 'public'
                },
                params: {
                    'password': '1234'
                }
            }
        );

        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la modification de la carte");
        throw error;
    }
}



