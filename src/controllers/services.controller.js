import {
    getAllServices,
    getServiceById,
    addService,
    updateService,
    deleteService
} from '../managers/ServiceManager.js'


async function getServices(req, res) {

    try {

        const services = await getAllServices()

        res.status(200).json(services)

    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener los servicios',
            message: error.message
        })
    }
}


async function getService(req, res) {

    try {

        const { id } = req.params

        const service = await getServiceById(id)

        res.status(200).json(service)

    } catch (error) {

        res.status(404).json({
            error: error.message
        })
    }
}


async function createService(req, res) {

    try {

        const {
            name,
            description,
            duration,
            price,
            category,
            available
        } = req.body

        const newService = await addService(
            name,
            description,
            duration,
            price,
            category,
            available
        )

        res.status(201).json(newService)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}


async function editService(req, res) {

    try {

        const { id } = req.params

        const data = req.body

        const updatedService = await updateService(
            id,
            data
        )

        res.status(200).json(updatedService)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}


async function removeService(req, res) {

    try {

        const { id } = req.params

        const serviceDeleted = await deleteService(id)

        res.status(200).json(serviceDeleted)

    } catch (error) {

        res.status(404).json({
            error: error.message
        })
    }
}


export {
    getServices,
    getService,
    createService,
    editService,
    removeService
}
