import fs from 'fs/promises'
import raiz from '../utils/path.js'
import { getAllServices } from './ServiceManager.js'

const PATH = raiz + '/data/bookings.json'


async function getAllBookings() {

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


async function getBookingById(id) {

    const bookings = await getAllBookings()

    const booking = bookings.find(
        booking => booking.id === Number(id)
    )

    if (!booking) {
        throw new Error('Reserva no encontrada')
    }

    return booking
}


async function addBooking(
    clientName,
    clientEmail,
    date,
    time,
    status,
    services = []
) {

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

    const newId = bookings.length > 0
        ? Math.max(...bookings.map(booking => booking.id)) + 1
        : 1

    const newBooking = {
        id: newId,
        clientName,
        clientEmail,
        date,
        time,
        status,
        services
    }

    bookings.push(newBooking)

    await fs.writeFile(
        PATH,
        JSON.stringify(bookings, null, 2)
    )

    return newBooking
}


async function addServiceToReservation(bookingId, serviceId) {

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
}


async function deleteBooking(id) {

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
}


export {
    getAllBookings,
    getBookingById,
    addBooking,
    addServiceToReservation,
    deleteBooking
}
