export interface Crud {
        create: () => void;
        read: () => void;
        update: () => void;
        delete: () => void;
}

export class CollectionControl implements Crud {
        params: any;
        body: any;
        query: any;
        id: any;
        Model: any;
        modelName: string;
        notFoundMessage: string;
        setId() {
                const { id } = this.params;
                this.notFoundMessage = `Unknown ${this.modelName} with id ${this.id}`;
                this.id = id;
        }
        async create() {
                const newOrder = new this.Model(this.body);
                try {
                        const data = await newOrder.save();
                        return data;

                } catch (err) {
                        throw { status: 400 }
                }
        }

        async read() {
                const data = await this.Model.find();
                return data;
        }

        async readOne() {
                this.setId();
                try {
                        const data = await this.Model.findById(this.id);
                        if (!data) throw { status: 404, message: this.notFoundMessage };
                        return data;
                } catch {
                        throw { status: 400 };
                }
        }
        async update() {
                this.setId();
                try {
                        const response: any = await this.Model.findByIdAndUpdate(
                                this.id,
                                this.body
                        );
                        if (!response) throw { status: 404, message: this.notFoundMessage };
                        const data = { ...response._doc, ...this.body };
                        console.log("update", JSON.stringify(data));

                        return data;
                } catch {
                        throw { status: 400 };
                }
        }
        async delete() {
                try {
                        this.setId();
                        const data = await this.Model.findByIdAndDelete(this.id);
                        if (!data) throw { status: 404, message: this.notFoundMessage };
                        return data;
                } catch {
                        throw { status: 400 };
                }
        }
        constructor({ req, model, modelName }) {
                this.body = req.body;
                this.query = req.query;
                this.params = req.params;
                this.Model = model;
                this.modelName = modelName;
        }
}
