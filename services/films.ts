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

export const addFilm = async (id: string, title: string, description: string, isVoted: boolean, genreIds: number[]) => {
    try {
        const response = await api.post("/films", {
            id,
            title,
            description,
            isVoted,
            genreIds
        });
        return response.data;
    } catch(error){
        console.error("Erro ao adicinonar o filme", error);
        throw error;
    }
}

export const markAsWatched = async (userId: string, filmId: string, groupId: string) => {
    try {
        const url = `/films/${filmId}/watched`;
        const data = { userId, groupId }; 
        const response = await api.post(url, data); 
        return response.data;

    } catch (error) {  
        console.error("Erro ao marcar cmomo assistido:", error);
    }
};

export const getWatchedFilms = async () => {
    try {
        const response = await api.get("/films/watched"); 
        return response.data.watchedFilms;
    } catch (error) {
        console.error("Erro ao buscar filmes assistidos:", error);
        throw error; 
    }
};

export const rateFilm = async (filmId: string, rating: number) => {
    try {
        const response = await api.post(`/films/${filmId}/rate`, { rating });
        return response.data;
    } catch (error) {
        console.error("Erro ao avaliar o filme:", error);
        throw error;
    }
};

export const getUserFilmRating = async (filmId: string) => {
    try {
        const response = await api.get(`/films/${filmId}/rate`);
        return response.data.rating ? response.data.rating.rating :  null;
    } catch (error) {
        console.error("Erro ao obter a avaliação:", error);
        throw error;
    }
};