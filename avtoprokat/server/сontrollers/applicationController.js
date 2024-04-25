const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");
const { User, Application, ApplicationCar } = require("../models/models");

class ApplicationController {
  async getApplications(req, res) {
    const userId = req.user.id;
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let applications = await Application.findAndCountAll({
      where: { userId: userId },
      limit,
      offset,
      include: [
        { model: User, as: "user" },
        { model: ApplicationCar, as: "application_cars" },
      ],
    });
    return res.json(applications);
  }

  async getAdminApplications(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let applications = await Application.findAndCountAll({
      limit,
      offset,
      include: [
        { model: User, as: "user" },
        { model: ApplicationCar, as: "application_cars" },
      ],
    });
    return res.json(applications);
  }

  async getOneApplication(req, res) {
    const { id } = req.params;
    const application = await Application.findOne({
      where: { id },
      include: [
        { model: User, as: "user" },
        { model: ApplicationCar, as: "application_cars" },
      ],
    });
    return res.json(application);
  }

  async createApplication(req, res, next) {
    try {
      const userId = req.user.id;
      let { cars } = req.body;
      const application = await Application.create({
        userId,
      });

      if (cars) {
        cars = JSON.parse(cars);
        cars.forEach((car) =>
          ApplicationCar.create({
            date_start: car.date_start,
            date_end: car.date_end,
            carId: car.carId,
            applicationId: application.id,
          })
        );
      }

      return res.json(application);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async changeApplicationStatus(req, res, next) {
    try {
      const { id } = req.params;
      let { status } = req.body;
      const applicationCar = await ApplicationCar.update(
        {
          status: status,
        },
        { where: { id } }
      );

      return res.json(applicationCar);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ApplicationController();
