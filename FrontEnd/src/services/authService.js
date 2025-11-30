

const API_BASE_URL = 'http://localhost:4000/api/auth';


export const registerUser = async (name, email, password, country) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, country }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en el registro de usuario.');
    }

    return data; 
};


export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error de credenciales.');
    }

    return data; 
};

export const changePassword = async (passwords, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(passwords), 
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error desconocido al cambiar contraseña.');
    }
    return data;
};

export const requestPasswordReset = async (email) => {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al solicitar restablecimiento.');
    return data;
};

export const submitNewPassword = async (token, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al establecer nueva contraseña.');
    return data;
};