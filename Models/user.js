const mongoose = require('mongoose');

// Schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Assure que chaque nom d'utilisateur est unique
    },
    email: {
        type: String,
        required: true,
        unique: true // Assure que chaque adresse e-mail est unique
    },
    password: {
        type: String,
        required: true
    },
    // Autres champs utilisateur selon vos besoins
});

// Modèle pour les utilisateurs basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
