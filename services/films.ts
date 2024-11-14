import api from "./api";

export interface Film {
    id: string,
    title: string,
    description: string
}

export const getAllFilms = async () =>{
    return await api.get("/films");
}

export const getFilmById = async (filmId: string) => {
    try{
        const response = await api.get(`/films/${filmId}`);
        return response.data.films;
    } catch(error){
        console.error(`Erro ao obter filme com ID: ${filmId}`);
        throw new Error(`Erro ao obter um grupo com ID: ${filmId}`);
    }
}

export const addFilm = async (id: string, title: string, description: string, isVoted: boolean) => {
    try {
        const response = await api.post("/films", {
            id,
            title,
            description,
            isVoted
        });
        return response.data;
    } catch(error){
        console.error("Erro ao adicinonar o filme", error);
        throw error;
    }
}