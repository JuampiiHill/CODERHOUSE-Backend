export default class FoodController {
    #foods;
    constructor() {
        this.#foods = [
            {name: 'Sopa', price: 1},
            {name: 'Fideo', price: 2},
            {name: 'Bondiola', price: 3},
            {name: 'Milanesa', price: 4},
            {name: 'Berenjenas', price: 34}
        ];
    };

    getFoods() {
        return this.#foods;
    }
}

export const foodsController = new FoodController();