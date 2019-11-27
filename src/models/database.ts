import Dexie from 'dexie';

export class CarDataBase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  cars: Dexie.Table<Car, number>;  // number = type of the primkey
  // ...other tables goes here...

  constructor() {
    super('test-db1');
    this.version(1).stores({
      cars: '++id, manufacturer, model, registrationYear',
      // ...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    // this.cars = this.table('cars');
  }
}

interface Car {
  id?: number;
  manufacturer: string;
  model: string;
  registrationYear: number;
}
