const login = async (email, password) => {
    try {
        // Perform authentication logic here...
        // For example, make an API call to validate the user's credentials
        const response = await fetch('/api/login', {
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
        localStorage.setItem('token', data.token); // Store token in local storage
        return data.token;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

// Function to handle user logout
const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; // Check if token exists
};

// Export the functions for use in other files
export { login, logout, isAuthenticated };