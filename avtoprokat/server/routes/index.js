const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const carRouter = require('./carRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const editRouter = require('./editRouter')

router.use('/user',userRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/car',carRouter)
router.use('/edit',editRouter)

module.exports = router