const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('./Models/event'); // Utilisation du modèle Event (pas d'array destructuring)
const Reservation = require('./Models/reservation');
const User = require('./Models/user');



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello MERN!');
});

// Endpoint pour ajouter un nouvel événement
// Endpoint pour ajouter un nouvel événement
app.get("/event/ajouter", async (req, res) => {
    try {
        const nouvelEvenement = new Event({ 
            id: "5",
            titre: "hhhihiu",
            dateDebut: new Date(), // Utilisation de la date actuelle comme date de début par défaut
            dateFin: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Utilisation de la date actuelle + 7 jours comme date de fin par défaut
            description: "aaaadfgg",
        });
        const event = await nouvelEvenement.save(); 
        res.json(event); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Endpoint pour modifier un événement existant
app.put('/modifier-evenement/:id', async (req, res) => { // Utilisation de la méthode HTTP PUT pour la modification
    const id = req.params.id;
    const modifications = req.body;
    try {
        const evenementModifie = await Event.findByIdAndUpdate(id, modifications, { new: true }); // Modification de l'événement dans la base de données
        res.json(evenementModifie); // Envoi de la réponse JSON avec l'événement modifié
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint pour supprimer un événement existant
app.delete('/supprimer-evenement/:id', async (req, res) => { // Utilisation de la méthode HTTP DELETE pour la suppression
    const id = req.params.id;
    try {
        const evenementSupprime = await Event.findByIdAndDelete(id); // Suppression de l'événement dans la base de données
        res.json(evenementSupprime); // Envoi de la réponse JSON avec l'événement supprimé
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Endpoint pour ajouter une nouvelle réservation
app.post('/reservation/ajouter', async (req, res) => {
    try {
        const { eventId, userId } = req.body; // Assurez-vous que les données de la réservation sont envoyées dans le corps de la requête
        const nouvelleReservation = new Reservation({ eventId, userId });
        const reservation = await nouvelleReservation.save();

        res.status(201).json({ message: 'Réservation ajoutée avec succès', reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/user/ajouter', async (req, res) => {
    try {
        // Les valeurs sont fournies dans le corps de la requête ou vous pouvez les définir comme des chaînes statiques
        const { username, email, password } = req.body; // Assurez-vous que les données de l'utilisateur sont envoyées dans le corps de la requête
        // Créez un nouvel utilisateur avec les données fournies
        const newUser = new User({ 
            username: "ghegheg",
            email: "ghe@125.com",
            password: "password123"
        });
        // Enregistrez l'utilisateur dans la base de données
        const user = await newUser.save();
        // Réponse avec l'utilisateur ajouté
        res.status(201).json({ message: 'Utilisateur ajouté avec succès', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
