 import { Router } from 'express'
import { petController } from '../controllers/Pet/Pet.controller.js'

const router = Router()

router.get('/', petController.getAllPets)
router.get('/', petController.getPetById)
router.post('/', petController.createPet)
router.put('/', petController.updatePetStatus)
router.delete('/', petController.deletePet)

export default router