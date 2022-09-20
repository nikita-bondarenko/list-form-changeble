import { Router } from 'express'
import Order from '../models/order'
import { CollectionControl } from '../classes'

const router = Router()


class OrdersControl extends CollectionControl {
    constructor(req) {
        super({ req, model: Order, modelName: 'order' })
    }
}

router.get('/', async (req, res) => {

 const fn = () => new OrdersControl(req).read()
   await new Go(
        fn, res
    ).try()
})


class Go {
    fn
    res
    constructor(fn, res) {
        this.fn = fn
        this.res = res
    }

    async try() {
        try {
            const result = await this.fn()
            this.res.json(result)
        } catch (err: any) {
            this.res.sendStatus(err.status)
        }
    }
}

router.get('/:id', async (req, res) => {
    const fn = () => new OrdersControl(req).readOne()
    await new Go(
        fn, res
    ).try()
})

router.post("/", async (req, res) => {

    const fn = () => new OrdersControl(req).create()

    await new Go(
        fn, res
    ).try()
})

router.put("/:id", async (req, res) => {

    const fn = () => new OrdersControl(req).update()

    await new Go(
        fn, res
    ).try()
})

router.delete("/:id", async (req, res) => {
    const fn = () =>  new OrdersControl(req).delete()
     await new Go(
        fn, res
    ).try()
})

export default router