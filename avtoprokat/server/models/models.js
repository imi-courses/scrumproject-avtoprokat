const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  phone_number: { type: DataTypes.STRING, allowNull: true },
  last_name: { type: DataTypes.STRING, allowNull: true },
  first_name: { type: DataTypes.STRING, allowNull: true },
  middle_name: { type: DataTypes.STRING, allowNull: true },
  img: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Application = sequelize.define("application", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ApplicationCar = sequelize.define("application_car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_start: { type: DataTypes.DATE, allowNull: false },
  date_end: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "WAITING" },
});

const Car = sequelize.define("car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const CarInfo = sequelize.define("car_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Rating);
Rating.belongsTo(User);

Type.hasMany(Car);
Car.belongsTo(Type);

Brand.hasMany(Car);
Car.belongsTo(Brand);

Car.hasMany(Rating);
Rating.belongsTo(Car);

Car.hasMany(CarInfo, { as: "info" });
CarInfo.belongsTo(Car);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

User.hasMany(Application);
Application.belongsTo(User);

Application.hasMany(ApplicationCar, { as: "application_cars" });
ApplicationCar.belongsTo(Application);

Car.hasMany(ApplicationCar);
ApplicationCar.belongsTo(Car);

module.exports = {
  User,
  Car,
  Type,
  Brand,
  Rating,
  TypeBrand,
  CarInfo,
  Application,
  ApplicationCar,
};
