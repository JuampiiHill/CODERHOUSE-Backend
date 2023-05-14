class UserController {
    #users;
    constructor() {
        this.#users = [
            {
                name: "Juan",
                surname: "Hillcoat",
                edad: "28",
                correo: "juanpablohillcoat@gmail.com",
                tel: 232323232323,
                rol: "admin"
            },
            {
                name: "Milagros",
                surname: "Valido",
                edad: "25",
                correo: "milu_valido@hotmail.com",
                tel: 2323336744,
                rol: "admin"
            },
            {
                name: "Esteban",
                surname: "Proto",
                edad: "48",
                correo: "estebanproto@algo.com",
                tel: 2323987654,
                rol: "user"
            },
            {
                name: "Manuel",
                surname: "Martinez",
                edad: "56",
                correo: "mmartinez@net.com",
                tel: 1123249967,
                rol: "user"
            },
            {
                name: "Maria",
                surname: "Mansa",
                edad: "38",
                correo: "mansamaria@gmail.com",
                tel: 1156734611,
                rol: "user"
            }
        ]
    }

    addUser(user) {
        this.#users.push(user);
    }

    getRandomUser() {
    let random = this.#users[Math.floor(Math.random() * this.#users.length)];
        return random;
    }
}

export const userController = new UserController();