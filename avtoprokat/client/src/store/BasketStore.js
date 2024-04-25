import { makeAutoObservable } from "mobx";
export default class BasketStore {
  constructor() {
    let oldCars = localStorage.getItem("basket_cars");
    this._basketCars = JSON.parse(oldCars) ?? [];
    makeAutoObservable(this);
  }

  setCars(cars) {
    this._basketCars = cars;
    localStorage.setItem("basket_cars", JSON.stringify(this._basketCars));
  }

  addCar(car) {
    if (
      this._basketCars.filter((basketCar) => basketCar.car.id === car.id)
        ?.length === 0
    ) {
      this._basketCars = [...this._basketCars, car];
    }
    localStorage.setItem("basket_cars", JSON.stringify(this._basketCars));
  }

  editCar(car) {
    let newIndex = this._basketCars.findIndex(
      (basketCar) => basketCar.car.id === car.car.id
    );
    this._basketCars[newIndex] = car;
    localStorage.setItem("basket_cars", JSON.stringify(this._basketCars));
  }

  removeCar(id) {
    this._basketCars = this._basketCars.filter(
      (basketCar) => basketCar.car.id !== id
    );
    localStorage.setItem("basket_cars", JSON.stringify(this._basketCars));
  }

  get basketCars() {
    return this._basketCars;
  }
}
