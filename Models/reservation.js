const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateReservation: {
        type: Date,
        default: Date.now,
        required: true
    },
    // Ajoutez d'autres champs de réservation selon vos besoins
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
