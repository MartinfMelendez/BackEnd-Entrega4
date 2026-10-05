import fs from 'fs/promises'
import raiz from '../utils/path.js'
import { getAllServices } from './ServiceManager.js'

const PATH = raiz + '/data/bookings.json'

async function getBookingsFromFile() {
    try {
        const fileContent = await fs.readFile(PATH, 'utf-8')
        return JSON.parse(fileContent)

    } catch (error) {

        if (error.code === 'ENOENT') {
            await fs.writeFile(PATH, '[]')
            return []
        }

        throw error
    }
}

const bookings = await getBookingsFromFile()

class Booking {

    static id = bookings.length > 0
        ? Math.max(...bookings.map(booking => booking.id)) + 1
        : 1

    constructor(
        clientName,
        clientEmail,
        date,
        time,
        status,
        services = []
    ) {
        this.id = Booking.id++
        this.clientName = clientName
        this.clientEmail = clientEmail
        this.date = date
        this.time = time
        this.status = status
        this.services = services
    }
}

async function getAllBookings() {

    try {
        const fileContent = await fs.readFile(PATH, 'utf-8')
        return JSON.parse(fileContent)

    } catch (error) {

        return {
            error: 'Error al leer el archivo',
            message: error.message
        }
    }
}

async function getBookingById(id) {

    try {

        const bookings = await getAllBookings()

        const booking = bookings.find(
            booking => booking.id === Number(id)
        )

        if (!booking) {
            throw new Error('Reserva no encontrada')
        }

        return booking

    } catch (error) {

        return {
            error: 'Error al obtener la reserva',
            message: error.message,
            status: 404
        }
    }
}

async function addBooking(
    clientName,
    clientEmail,
    date,
    time,
    status,
    services = []
) {

    try {

        if (!clientName || !clientEmail || !date || !time || !status) {
            throw new Error('Todos los campos son obligatorios')
        }

        const bookings = await getAllBookings()

        const existingBooking = bookings.find(
            booking =>
                booking.clientEmail === clientEmail &&
                booking.date === date &&
                booking.time === time
        )

        if (existingBooking) {
            throw new Error('La reserva que intenta ingresar ya existe')
        }

        const newBooking = new Booking(
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        )

        bookings.push(newBooking)

        await fs.writeFile(
            PATH,
            JSON.stringify(bookings, null, 2)
        )

        return newBooking

    } catch (error) {

        return {
            error: 'Error al agregar la reserva',
            message: error.message,
            status: 400
        }
    }
}

async function addServiceToReservation(bookingId, serviceId) {

    try {

        const services = await getAllServices()

        const service = services.find(
            service => service.id === Number(serviceId)
        )

        if (!service) {
            throw new Error('El servicio ingresado no existe')
        }

        const bookings = await getAllBookings()

        const booking = bookings.find(
            booking => booking.id === Number(bookingId)
        )

        if (!booking) {
            throw new Error('La reserva no existe')
        }

        const bookingService = booking.services.find(
            service => service.service === Number(serviceId)
        )

        if (!bookingService) {

            booking.services.push({
                service: service.id,
                quantity: 1
            })

        } else {

            bookingService.quantity += 1
        }

        await fs.writeFile(
            PATH,
            JSON.stringify(bookings, null, 2)
        )

        return booking

    } catch (error) {

        return {
            error: 'Error al agregar el servicio a la reserva',
            message: error.message,
            status: 400
        }
    }
}

async function deleteBooking(id) {

    try {

        const bookings = await getAllBookings()

        const bookingIndex = bookings.findIndex(
            booking => booking.id === Number(id)
        )

        if (bookingIndex === -1) {
            throw new Error('Reserva no encontrada')
        }

        bookings.splice(bookingIndex, 1)

        await fs.writeFile(
            PATH,
            JSON.stringify(bookings, null, 2)
        )

        return {
            message: 'Reserva eliminada correctamente'
        }

    } catch (error) {

        return {
            error: 'Error al eliminar la reserva',
            message: error.message,
            status: 400
        }
    }
}

export {
    getAllBookings,
    getBookingById,
    addBooking,
    addServiceToReservation,
    deleteBooking
}