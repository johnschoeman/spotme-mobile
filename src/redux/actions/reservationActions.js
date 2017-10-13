export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
export const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';

export const receiveReservation = (reservation) => ({
    type: RECEIVE_RESERVATION,
    reservation,
});

export const receiveReservations = (reservations) => ({
    type: RECEIVE_RESERVATIONS,
    reservations,
});
