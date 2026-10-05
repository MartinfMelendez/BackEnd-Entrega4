import {
    getAllBookings,
    getBookingById,
    addBooking,
    addServiceToReservation,
    deleteBooking
} from '../managers/BookingsManager.js'


async function getBookings(req, res) {

    try {

        const bookings = await getAllBookings()

        res.status(200).json(bookings)

    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener las reservas',
            message: error.message
        })
    }
}


async function getBooking(req, res) {

    try {

        const { id } = req.params

        const booking = await getBookingById(id)

        res.status(200).json(booking)

    } catch (error) {

        res.status(404).json({
            error: error.message
        })
    }
}


async function createBooking(req, res) {

    try {

        const {
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        } = req.body

        const newBooking = await addBooking(
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        )

        res.status(201).json(newBooking)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}


async function addService(req, res) {

    try {

        const { bookingId, serviceId } = req.params

        const booking = await addServiceToReservation(
            bookingId,
            serviceId
        )

        res.status(200).json(booking)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}


async function removeBooking(req, res) {

    try {

        const { id } = req.params

        const result = await deleteBooking(id)

        res.status(200).json(result)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}


export {
    getBookings,
    getBooking,
    createBooking,
    addService,
    removeBooking
}
