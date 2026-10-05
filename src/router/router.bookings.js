import express from 'express'

import {
    getBookings,
    getBooking,
    createBooking,
    addService,
    removeBooking
} from '../controllers/booking.controller.js'

const router = express.Router()


router.get('/', getBookings)

router.get('/:id', getBooking)

router.post('/', createBooking)

router.post('/:bookingId/services/:serviceId', addService)

router.delete('/:id', removeBooking)


export default router
