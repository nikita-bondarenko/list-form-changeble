import { Router } from 'express'
import Field from '../models/field'
import { CollectionControl } from '../classes'

const router = Router()


class FieldsControl extends CollectionControl {
    constructor(req) {
        super({ req, model: Field, modelName: 'field' })
    }
}

router.get('/', async (req, res) => {

 const fn = () => new FieldsControl(req).read()
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
    const fn = () => new FieldsControl(req).readOne()
    await new Go(
        fn, res
    ).try()
})

router.post("/", async (req, res) => {

    const fn = () => new FieldsControl(req).create()

    await new Go(
        fn, res
    ).try()
})

router.put("/:id", async (req, res) => {

    const fn = () => new FieldsControl(req).update()

    await new Go(
        fn, res
    ).try()
})

router.delete("/:id", async (req, res) => {
    const fn = () =>  new FieldsControl(req).delete()
     await new Go(
        fn, res
    ).try()
})

export default router