
import { getToken } from './authService'; 

const API_URL = "http://localhost:3000/api/eventos";

/**
 * @param {object} eventData 
 */
export const createEvent = async (eventData) => {
    const token = getToken();

    if (!token) {
        throw new Error('Usuário não autenticado. Faça login como Organizador.');
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (response.ok) {
        return data; 
    } else {
        throw new Error(data.message || 'Falha ao criar evento.');
    }
};

/**
 * @returns {Array} 
 */
export const listAllAvailableEvents = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao buscar eventos disponíveis.');
        }

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error("Erro no serviço ao listar eventos:", error);
        throw error;
    }
};

