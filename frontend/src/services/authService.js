

const API_URL = "http://localhost:3000/auth";


const saveUserData = (data) => {
   
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
};

export const getToken = () => {
    return localStorage.getItem('token');
};


export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        saveUserData(data); 
    } else {
        throw new Error(data.message || 'Falha no login');
    }

    return data;
};

export const register = async (name, email, password, isOrganizador) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isOrganizador }),
    });

    const data = await response.json();

    if (response.ok) {
        saveUserData(data); 
    } else {
        throw new Error(data.message || 'Falha no registro');
    }

    return data;
};

// Função de Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};