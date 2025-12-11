// frontend/src/services/eventoService.js

import { getToken } from './authService'; 

// URL base da sua API para eventos
const API_URL = "http://localhost:3000/api/eventos";

/**
 * Cria um novo evento.
 * @param {object} eventData - Dados do novo evento.
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
 * Lista todos os eventos disponíveis para inscrição.
 * @returns {Array} Lista de eventos.
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

/**
 * Registra o usuário logado em um evento específico.
 * 🛑 FUNÇÃO ADICIONADA PARA INSCRIÇÃO
 * @param {string} eventId - O ID do evento no qual o usuário quer se inscrever.
 * @returns {object} Confirmação de sucesso da inscrição.
 */
export const enrollInEvent = async (eventId) => {
    const token = getToken();
    
    if (!token) {
        throw new Error('Usuário não autenticado. Faça login para se inscrever.');
    }

    // Endpoint sugerido: POST /api/eventos/inscrever
    const response = await fetch(`${API_URL}/inscrever`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Autentica o usuário
        },
        body: JSON.stringify({ eventId }), // Envia o ID do evento no corpo
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Falha ao realizar a inscrição no evento.');
    }

    return data;
};