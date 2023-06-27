import passport from "passport";
import local from "passport-local";
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
            return done(null, false, { message: "User not found" });
          }
          if (!comparePassword(user, password)) {
            return done(null, false, { message: "User or pass invalid" });
          }

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

export default inicializePassport;