import {Component, OnInit} from '@angular/core';

import Dexie from 'dexie';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarDataBase} from '../models/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  carFormGroup = new FormGroup({
    carControlManufacturer: new FormControl( '', Validators.required),
    carControlModel: new FormControl( '', Validators.required),
    carControlYear: new FormControl( '', Validators.required)
  });
  db = new CarDataBase();
  allCars = [];
  foundCar = [];

  ngOnInit(): void {
    this.db.version(2).stores({cars: '++id, manufacturer, model, registrationYear'});
    this.getAllCars();
    /*db.version(1).stores({contacts: '++id, first, last'});
    db.version(2).stores({cars: '++id, manufacturer, model, year'});
    db.table('contacts').put({first: 'first name', last: 'Last name'});
    db.table('cars').put({manufacturer: 'Audi', model: 'A6', year: 2017});*/
  }

  createCar() {
    if (this.carFormGroup.valid) {
      this.db.cars.put({
        manufacturer: this.carFormGroup.controls.carControlManufacturer.value,
        model: this.carFormGroup.controls.carControlModel.value,
        registrationYear: this.carFormGroup.controls.carControlYear.value
      });
      this.getAllCars();
    }
  }

  searchCar(id: number) {
    this.foundCar = [];
    this.db.cars.get(Number(id)).then(searchedCar => {
      this.foundCar.push(searchedCar);
    });
  }

  searchManufacturer(manufacturerName) {
    this.foundCar = [];
    this.db.cars.where('manufacturer').equalsIgnoreCase(manufacturerName).each(car => {
      this.foundCar.push(car);
    }).catch(error => {
      console.error(error);
    });
  }

  getAllCars() {
    this.allCars = [];
    this.db.cars.each(car => {
      this.allCars.push(car);
    });
  }

  deleteCar(id) {
    this.db.cars.delete(id).then(() => {
      alert('delete succesfull');
    });
    this.getAllCars();
  }
}
