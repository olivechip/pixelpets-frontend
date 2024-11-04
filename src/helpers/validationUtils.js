const validateUsername = (username) => {
    const trimmedUsername = username.trim();
    const allowedChars = /^[a-zA-Z0-9_-]+$/;
  
    if (!trimmedUsername || username === "") {
        return "Username cannot be empty.";
    } else if (trimmedUsername.length > 50) {
        return "Username cannot exceed 50 characters.";
    } else if (trimmedUsername.length < 3) {
        return "Username must be at least 3 characters long.";
    } else if (!allowedChars.test(trimmedUsername)) {
        return "Username can only contain letters, numbers, underscores, and hyphens.";
    }
    return null;
};
  
const validateEmail = (email) => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  
    if (!trimmedEmail || email === "") {
        return "Email cannot be empty.";
    } else if (!emailRegex.test(trimmedEmail)) {
        return "Please enter a valid email address.";
    } else if (trimmedEmail.length > 255) {
        return "Email cannot exceed 255 characters.";
    }
    return null;
};
  
const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    } else if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    return null;
};

const validatePetName = (petName) => {
    const trimmedPetName = petName.trim();
    const allowedChars = /^[a-zA-Z0-9_-]+$/;
  
    if (!trimmedPetName || petName === "") {
        return "Pet name cannot be empty.";
    } else if (trimmedPetName.length > 16) {
        return "Pet name cannot exceed 16 characters.";
    } else if (trimmedPetName.length < 3) {
        return "Pet name must be at least 3 characters long.";
    } else if (!allowedChars.test(trimmedPetName)) {
        return "Pet name can only contain letters, numbers, underscores, and hyphens.";
    }
    return null;
};

export { validateUsername, validateEmail, validatePassword, validatePetName };