let token: string | null = localStorage.getItem('token');

export const setToken = (newToken: string | null) => {
    token = newToken;
    if (newToken) {
        localStorage.setItem('token', newToken);
    } else {
        localStorage.removeItem('token');
    }
};

export const getToken = () => token;
