import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2';
import userService from "../services/user.service.js";
import { comparePassword, hashPassword } from "../utils/encript.util.js";

const LocalStrategy = local.Strategy;
const inicializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, username, password, done) => {
        const { first_name, last_name, img } = req.body;
        try {
          const user = await userService.getByEmail(username);
          if (user) {
            return done(null, false, { message: "User already exists" });
          }
          const hashedPassword = await hashPassword(password);
          const newUser = await userService.createUser({
            first_name,
            last_name,
            email: username,
            password: hashedPassword,
            img,
          });
          return done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    try {
      done(null, user._id);
    } catch (err) {
      throw err;
    }
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.getUserById(id);
      // console.log(user);
      // if (
      //   user.email === "adminCoder@coder.com" /*&&
      //   user.password === "adminCod3r123"*/
      // ) {
      //   user.role = "admin";
      // } else {
      //   user.role = "usuario";
      // }
      done(null, user);
    } catch (err) {
      throw err;
    }
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userService.getByEmail(username);
          if (!user) {
            return done(null, false, { message: "No se encontro el usuario" });
          }
          if (!comparePassword(user, password)) {
            return done(null, false, { message: "Usuario o contraseña incorrecta" });
          }

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

  passport.use(
    "github",
    new GitHubStrategy(
      //En esta primera parte es con la que le decimos a gitHubStrategy con que se va a identificar
      {
        clientID: "Iv1.7560c723c8d1ddfa",
        clientSecret: "0a978cab9a13c2021987ac31fdd399235f0bf6d7",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // console.log(profile);
          let user = await userService.getByEmail(profile._json.email);
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
              img: profile._json.avatar_url,
            };
            user = await userService.createUser(newUser);
            done(null, user);
          } else {
            // Si entra aca es porque el usuario ya existe
            done(null, user);
          }
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  //Aca dentro definimos el serialize que lo que recibe para sserializar es el usuario y el done
  passport.serializeUser((user, done) => {
    try {
      // Recibo el usario? OK me quedo con el ID
      done(null, user._id);
    } catch (err) {
      throw err;
    }
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // para desarializar recibimos un id y obtenos el usuario meidante ese id
      const user = await userService.getUserById(id);
      done(null, user);
    } catch (err) {
      throw err;
    }
  });

export default inicializePassport;