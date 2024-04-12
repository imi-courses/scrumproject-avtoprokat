const Router = require('express')
const router = new Router()
const carController = require('../сontrollers/carController')

router.post('/', carController.create)
router.get('/',carController.getAll)
router.get('/:id',carController.getOne)
router.delete('/:id',carController.deleteOne)

module.exports = router