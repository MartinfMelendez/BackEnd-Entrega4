import fs from 'fs/promises'
import raiz from '../utils/path.js'

const PATH = raiz + '/data/services.json'


async function getAllServices() {

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


async function getServiceById(id) {

    const services = await getAllServices()

    const service = services.find(
        service => service.id === Number(id)
    )

    if (!service) {
        throw new Error('Servicio no encontrado')
    }

    return service
}


async function addService(
    name,
    description,
    duration,
    price,
    category,
    available
) {

    if (
        !name ||
        !description ||
        !duration ||
        !price ||
        !category ||
        available === undefined
    ) {
        throw new Error('Todos los campos son obligatorios')
    }

    if (isNaN(price) || Number(price) <= 0) {
        throw new Error('El precio debe ser un número positivo')
    }

    const services = await getAllServices()

    const newId = services.length > 0
        ? Math.max(...services.map(service => service.id)) + 1
        : 1

    const newService = {
        id: newId,
        name,
        description,
        duration,
        price,
        category,
        available
    }

    services.push(newService)

    await fs.writeFile(
        PATH,
        JSON.stringify(services, null, 2),
        'utf-8'
    )

    return newService
}


async function updateService(id, data) {

    const services = await getAllServices()

    const index = services.findIndex(
        service => service.id === Number(id)
    )

    if (index === -1) {
        throw new Error('Servicio no encontrado')
    }

    const { id: ignoredId, ...rest } = data

    const updatedService = {
        ...services[index],
        ...rest,
        id: services[index].id
    }

    services[index] = updatedService

    await fs.writeFile(
        PATH,
        JSON.stringify(services, null, 2),
        'utf-8'
    )

    return updatedService
}


async function deleteService(id) {

    const services = await getAllServices()

    const index = services.findIndex(
        service => service.id === Number(id)
    )

    if (index === -1) {
        throw new Error('Servicio no encontrado')
    }

    const serviceDeleted = services.splice(index, 1)

    await fs.writeFile(
        PATH,
        JSON.stringify(services, null, 2),
        'utf-8'
    )

    return serviceDeleted[0]
}


export {
    getAllServices,
    getServiceById,
    addService,
    updateService,
    deleteService
}


