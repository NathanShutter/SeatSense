const login = async (email, password) => {
    try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL; // Get the backend URL from environment variables

        const response = await fetch(`${backendUrl}/login`, { // Use the backend URL in the fetch call
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        sessionStorage.setItem('token', data.token); // Store token in session storage
        sessionStorage.setItem('userId', data.userId); // Store userId in session storage
        sessionStorage.setItem('role', data.role) // Store role in session storage
        return data.token;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};


// Function to handle user logout
const logout = () => {
    sessionStorage.removeItem('token'); // Remove token from session storage
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null; // Check if token exists
};

// Export the functions for use in other files
export { login, logout, isAuthenticated };