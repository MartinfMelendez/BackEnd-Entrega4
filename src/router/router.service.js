import express from 'express'

import {
    getServices,
    getService,
    createService,
    editService,
    removeService
} from '../controllers/services.controller.js'

const router = express.Router()


router.get('/', getServices)

router.get('/:id', getService)

router.post('/', createService)

router.put('/:id', editService)

router.delete('/:id', removeService)


export default router
