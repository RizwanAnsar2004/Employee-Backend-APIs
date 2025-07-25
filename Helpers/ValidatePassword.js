function validatePassword(password){
    if(!password){
        throw new Error("Enter password");
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error("Password must be at least 8 characters and include both letters and numbers.");
    }
}

module.exports={ validatePassword }