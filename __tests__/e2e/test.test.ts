import req from 'supertest'
import { app } from '../../server/index'

const initialField: any = {
    type: `text`,
    name: `Оглавление`,
    description: `Какое-то описание`
}

const updatedField: any = {
    type: `textarea`,
    name: `Оглавление`,
    description: `Какое-то описание`,
    default: `Хорошая заявка`
}

const initialOrder = {
    data: {
        greeting: `Hi`
    }
}

const updatedOrder = {
    data: {
        greeting: `Hello`
    }
}

test('field', initialField, updatedField)
test('order', initialOrder, updatedOrder)


function test (modelName, initialExample, updatedExample) {
    let isCreated: boolean, id: string, isUpdated: boolean, isDeleted: boolean

    describe(`POST /${modelName}`, () => {
        it(`should return 200`, async () => {
            const { body } = await req(app).post(`/${modelName}`).send(initialExample).expect(200)
            if (body) {
                isCreated = true
                id = body._id
                Object.entries(initialExample).map(([key, value]) => {
                    expect(body[key]).toEqual(value)
                })
            }
        })
        it(`should return 400`, async () => {
            await req(app).post(`/${modelName}`).send({}).expect(400)
        })
    })


    describe(`GET /${modelName}`, () => {
        it(`should return 200`, async () => {
            if (isCreated) {
                const { body } = await req(app).get(`/${modelName}`).expect(200)
                if (body) {
                    const item = body.find((i: { _id: string }) => i._id === id)
                    Object.entries(initialExample).map(([key, value]) => {
                        expect(item[key]).toEqual(value)
                    })
                }
            }
        })
    })

    describe(`GET /${modelName}/:id`, () => {
        it(`should return 200`, async () => {
            if (isCreated) {
                const { body } = await req(app).get(`/${modelName}/${id}`).expect(200)
                if (body) {
                    Object.entries(initialExample).map(([key, value]) => {
                        expect(body[key]).toEqual(value)
                    })
                }
            }
        })

        it(`should return 400`, async () => {
            if (isCreated) {
                const res = await req(app).get(`/${modelName}/bad-id`).expect(400)
            }
        })
        it(`should return 404`, async () => {
            if (isDeleted) {
                console.log(`isDeleted`)
                await req(app).get(`/${modelName}/${id}`).expect(404)
            }
        })
    })

    describe(`PUT /${modelName}/:id`, () => {
        it(`should return 200`, async () => {
            if (isCreated) {

                const { body } = await req(app).put(`/${modelName}/${id}`).send(updatedExample).expect(200)
                if (body) {
                    isUpdated = true
                    Object.entries(updatedExample).map(([key, value]) => {
                        expect(body[key]).toEqual(value)
                    })
                }
            }
        })

        it(`should return 400`, async () => {
            if (isCreated) {
                 await req(app).get(`/${modelName}/bad-id`).expect(400)
            }
        })
    })

    describe(`DELETE /${modelName}/:id`, () => {
        it(`should return 200`, async () => {
            if (isUpdated) {
                const { body } = await req(app).delete(`/${modelName}/${id}`).expect(200)
                if (body) {
                    isDeleted = true
                    Object.entries(updatedExample).map(([key, value]) => {
                        expect(body[key]).toEqual(value)
                    })
                }
            }

        })
        it(`should return 400`, async () => {
            if (isDeleted) {
                await req(app).delete(`/${modelName}/${id}`).expect(400)
            }
        })
    })
}




