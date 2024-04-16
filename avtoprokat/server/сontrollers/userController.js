const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getOneUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({
      where: { id },
    });
    return res.json(user);
  }

  async createUserData(req, res, next) {
    try {
      let { first_name, last_name, middle_name, phone_number, id } = req.body;
      if (req.files != null) {
        const { img } = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static/userImgs", fileName));
        const user = User.update(
          {
            phone_number: phone_number,
            last_name: last_name,
            first_name: first_name,
            middle_name: middle_name,
            img: "userImgs/" + fileName,
          },
          { where: { id } }
        );
        return res.json(user);
      } else {
        const user = User.update(
          {
            phone_number: phone_number,
            last_name: last_name,
            first_name: first_name,
            middle_name: middle_name,
          },
          { where: { id } }
        );
        return res.json(user);
      }

      //const user = await User.update({ where: _id });
      // return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
