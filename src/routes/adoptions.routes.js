import { Router } from 'express'
import { adoptionController } from '../controllers/Adoption/Adoption.controller'

const router = Router()

router.get('/:aid', adoptionController.getAdoptionById)
router.get('/', adoptionController.getPaginatedAdoptions)
router.post('/', adoptionController.createAdoption)
router.put('/', adoptionController.updateAdoptionStatus)
router.delete('/', adoptionController.deleteAdoption)

export default router