import fs from 'fs';

export default class CartsManager {
    #id = 1;
    constructor() {
        if (!existsSync('./carts.json')) {
            fs.writeFileSync('./carts.json', JSON.stringify([]));
        }
        this.path = './carts.json';
    }

    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return err;
            
        }
    }
}
