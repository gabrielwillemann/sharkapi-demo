import axios from 'axios';

let url = 'http://localhost:3000/graphql';

function graphql(query: string): Promise<any> {
  return axios.post(url, { query });
}

describe('graphql', () => {
  describe('create', () => {
    test('create countries', async () => {
      let res;
      res = await graphql('mutation { createCountry(input: { name: "USA" }) { name } }');
      expect(res.data.data.createCountry.name).toBe('USA');

      res = await graphql('mutation { createCountry(input: {name: "Germany"}) { name } }');
      expect(res.data.data.createCountry.name).toBe('Germany');

      res = await graphql('mutation { createCountry(input: {name: "Italy"}) { name } }');
      expect(res.data.data.createCountry.name).toBe('Italy');
    });

    test('create cities', async () => {
      let res;
      res = await graphql('mutation { createCity(input: {name: "New York", CountryId: 1}) { name, CountryId }}');
      expect(res.data.data.createCity.name).toBe('New York');
      expect(res.data.data.createCity.CountryId).toBe(1);

      res = await graphql('mutation { createCity(input: {name: "Munich", CountryId: 2}) { name, CountryId }}');
      expect(res.data.data.createCity.name).toBe('Munich');
      expect(res.data.data.createCity.CountryId).toBe(2);

      res = await graphql('mutation { createCity(input: {name: "Roma", CountryId: 3}) { name, CountryId }}');
      expect(res.data.data.createCity.name).toBe('Roma');
      expect(res.data.data.createCity.CountryId).toBe(3);
    });

    test('create people', async () => {
      let res;
      res = await graphql('mutation { createPerson(input: { name: "Gabriel", CityId: 1 }) { name, CityId }}');
      expect(res.data.data.createPerson.name).toBe('Gabriel');
      expect(res.data.data.createPerson.CityId).toBe(1);

      res = await graphql('mutation { createPerson(input: { name: "John", CityId: 2 }) { name, CityId }}');
      expect(res.data.data.createPerson.name).toBe('John');
      expect(res.data.data.createPerson.CityId).toBe(2);

      res = await graphql('mutation { createPerson(input: { name: "Paul", CityId: 2 }) { name, CityId }}');
      expect(res.data.data.createPerson.name).toBe('Paul');
      expect(res.data.data.createPerson.CityId).toBe(2);
    });

    test('create brands', async () => {
      let res;
      res = await graphql('mutation { createBrand(input: { name: "Goodyear", CountryId: 1 }) {name, CountryId}}');
      expect(res.data.data.createBrand.name).toBe('Goodyear');
      expect(res.data.data.createBrand.CountryId).toBe(1);

      res = await graphql('mutation { createBrand(input: { name: "Volkswagen", CountryId: 2 }) {name, CountryId}}');
      expect(res.data.data.createBrand.name).toBe('Volkswagen');
      expect(res.data.data.createBrand.CountryId).toBe(2);

      res = await graphql('mutation { createBrand(input: { name: "Fiat", CountryId: 3 }) {name, CountryId}}');
      expect(res.data.data.createBrand.name).toBe('Fiat');
      expect(res.data.data.createBrand.CountryId).toBe(3);
    });

    test('create cars', async () => {
      let res;
      res = await graphql(
        'mutation { createCar(input: { name: "Passat", BrandId: 2, PersonId: 1 }) {name, BrandId, PersonId}}'
      );
      expect(res.data.data.createCar.name).toBe('Passat');
      expect(res.data.data.createCar.BrandId).toBe(2);
      expect(res.data.data.createCar.PersonId).toBe(1);

      res = await graphql(
        'mutation { createCar(input: { name: "F-500", BrandId: 3, PersonId: 2 }) {name, BrandId, PersonId}}'
      );
      expect(res.data.data.createCar.name).toBe('F-500');
      expect(res.data.data.createCar.BrandId).toBe(3);
      expect(res.data.data.createCar.PersonId).toBe(2);

      res = await graphql(
        'mutation { createCar(input: { name: "Tiggo", BrandId: 2, PersonId: 3 }) {name, BrandId, PersonId}}'
      );
      expect(res.data.data.createCar.name).toBe('Tiggo');
      expect(res.data.data.createCar.BrandId).toBe(2);
      expect(res.data.data.createCar.PersonId).toBe(3);
    });

    test('create tyres', async () => {
      let res;
      res = await graphql(
        'mutation { createTyre(input: { name: "front right", BrandId: 1, CarId: 1 }) {name, BrandId, CarId}}'
      );
      expect(res.data.data.createTyre.name).toBe('front right');
      expect(res.data.data.createTyre.BrandId).toBe(1);
      expect(res.data.data.createTyre.CarId).toBe(1);

      res = await graphql(
        'mutation { createTyre(input: { name: "front left", BrandId: 1, CarId: 1 }) {name, BrandId, CarId}}'
      );
      expect(res.data.data.createTyre.name).toBe('front left');
      expect(res.data.data.createTyre.BrandId).toBe(1);
      expect(res.data.data.createTyre.CarId).toBe(1);

      res = await graphql(
        'mutation { createTyre(input: { name: "rear right", BrandId: 1, CarId: 1 }) {name, BrandId, CarId}}'
      );
      expect(res.data.data.createTyre.name).toBe('rear right');
      expect(res.data.data.createTyre.BrandId).toBe(1);
      expect(res.data.data.createTyre.CarId).toBe(1);

      res = await graphql(
        'mutation { createTyre(input: { name: "rear left", BrandId: 1, CarId: 1 }) {name, BrandId, CarId}}'
      );
      expect(res.data.data.createTyre.name).toBe('rear left');
      expect(res.data.data.createTyre.BrandId).toBe(1);
      expect(res.data.data.createTyre.CarId).toBe(1);
    });
  });

  describe('update', () => {
    test('update countries', async () => {
      let res;
      res = await graphql('mutation { updateCountry(id: 1, input: {name: "USA - Updated"}) { name }}');
      expect(res.data.data.updateCountry.name).toBe('USA - Updated');
    });

    test('update cities', async () => {
      let res;
      res = await graphql('mutation { updateCity(id: 1, input: {name: "New York - Updated"}) { name }}');
      expect(res.data.data.updateCity.name).toBe('New York - Updated');
    });

    test('update people', async () => {
      let res;
      res = await graphql('mutation { updatePerson(id: 3, input: {name: "Paul - Updated"}) { name }}');
      expect(res.data.data.updatePerson.name).toBe('Paul - Updated');
    });

    test('update brands', async () => {
      let res;
      res = await graphql('mutation { updateBrand(id: 2, input: {name: "Volkswagen - Updated"}) { name }}');
      expect(res.data.data.updateBrand.name).toBe('Volkswagen - Updated');
    });

    test('update cars', async () => {
      let res;
      res = await graphql('mutation { updateCar(id: 1, input: {name: "Passat - Updated"}) { name }}');
      expect(res.data.data.updateCar.name).toBe('Passat - Updated');
    });

    test('update tyres', async () => {
      let res;
      res = await graphql('mutation { updateTyre(id: 1, input: {name: "front right - Updated"}) { name }}');
      expect(res.data.data.updateTyre.name).toBe('front right - Updated');
    });
  });

  describe('delete', () => {
    test('delete car', async () => {
      let res;
      res = await graphql('mutation { deleteCar(id: 3) { name, BrandId, PersonId }}');
      expect(res.data.data.deleteCar.name).toBe('Tiggo');
      expect(res.data.data.deleteCar.BrandId).toBe(2);
      expect(res.data.data.deleteCar.PersonId).toBe(3);
    });
  });

  describe('index', () => {
    test('index countries with sort', async () => {
      let res;
      res = await graphql('{ countries(sort: [id_desc]) {totalCount nodes {name}}}');
      expect(res.data.data.countries.totalCount).toBe(3);
      expect(res.data.data.countries.nodes).toHaveLength(3);
      expect(res.data.data.countries.nodes[0].name).toBe('Italy');
      expect(res.data.data.countries.nodes[1].name).toBe('Germany');
      expect(res.data.data.countries.nodes[2].name).toBe('USA - Updated');
    });

    test('index countries with filter/hook', async () => {
      let res;
      res = await graphql('{ countries(filter: {name_like: "Updated"}) {totalCount nodes {name }}}');
      expect(res.data.data.countries.totalCount).toBe(1);
      expect(res.data.data.countries.nodes).toHaveLength(1);
      expect(res.data.data.countries.nodes[0].name).toBe('USA - Updated');
    });

    test('index cities with sort', async () => {
      let res;
      res = await graphql('{ cities(sort: [name]) {totalCount nodes {name CountryId}}}');
      expect(res.data.data.cities.totalCount).toBe(3);
      expect(res.data.data.cities.nodes).toHaveLength(3);
      expect(res.data.data.cities.nodes[0].name).toBe('Munich');
      expect(res.data.data.cities.nodes[0].CountryId).toBe(2);
      expect(res.data.data.cities.nodes[1].name).toBe('New York - Updated');
      expect(res.data.data.cities.nodes[1].CountryId).toBe(1);
      expect(res.data.data.cities.nodes[2].name).toBe('Roma');
      expect(res.data.data.cities.nodes[2].CountryId).toBe(3);
    });

    test('index cities with sort/hook', async () => {
      let res;
      res = await graphql('{ cities(sort: [country_name]) {totalCount nodes {name CountryId Country {name}}}}');
      expect(res.data.data.cities.totalCount).toBe(3);
      expect(res.data.data.cities.nodes).toHaveLength(3);
      expect(res.data.data.cities.nodes[0].name).toBe('Munich');
      expect(res.data.data.cities.nodes[0].CountryId).toBe(2);
      expect(res.data.data.cities.nodes[0].Country.name).toBe('Germany');

      expect(res.data.data.cities.nodes[1].name).toBe('Roma');
      expect(res.data.data.cities.nodes[1].CountryId).toBe(3);
      expect(res.data.data.cities.nodes[1].Country.name).toBe('Italy');

      expect(res.data.data.cities.nodes[2].name).toBe('New York - Updated');
      expect(res.data.data.cities.nodes[2].CountryId).toBe(1);
      expect(res.data.data.cities.nodes[2].Country.name).toBe('USA - Updated');
    });

    test('index people with sort', async () => {
      let res;
      res = await graphql('{ people(sort: [id]) {totalCount nodes {name CityId}}}');
      expect(res.data.data.people.totalCount).toBe(3);
      expect(res.data.data.people.nodes).toHaveLength(3);
      expect(res.data.data.people.nodes[0].name).toBe('Gabriel');
      expect(res.data.data.people.nodes[0].CityId).toBe(1);
      expect(res.data.data.people.nodes[1].name).toBe('John');
      expect(res.data.data.people.nodes[1].CityId).toBe(2);
      expect(res.data.data.people.nodes[2].name).toBe('Paul - Updated');
      expect(res.data.data.people.nodes[2].CityId).toBe(2);
    });

    test('index people with sort and filter', async () => {
      let res;
      res = await graphql('{ people(filter: {CityId: 2}, sort: [id_desc]) {totalCount nodes {name CityId}}}');
      expect(res.data.data.people.totalCount).toBe(2);
      expect(res.data.data.people.nodes).toHaveLength(2);
      expect(res.data.data.people.nodes[0].name).toBe('Paul - Updated');
      expect(res.data.data.people.nodes[0].CityId).toBe(2);
      expect(res.data.data.people.nodes[1].name).toBe('John');
      expect(res.data.data.people.nodes[1].CityId).toBe(2);
    });

    test('index brands with sort', async () => {
      let res;
      res = await graphql('{ brands(sort: [name_desc]) {totalCount nodes {name CountryId}}}');
      expect(res.data.data.brands.totalCount).toBe(3);
      expect(res.data.data.brands.nodes).toHaveLength(3);
      expect(res.data.data.brands.nodes[0].name).toBe('Volkswagen - Updated');
      expect(res.data.data.brands.nodes[0].CountryId).toBe(2);
      expect(res.data.data.brands.nodes[1].name).toBe('Goodyear');
      expect(res.data.data.brands.nodes[1].CountryId).toBe(1);
      expect(res.data.data.brands.nodes[2].name).toBe('Fiat');
      expect(res.data.data.brands.nodes[2].CountryId).toBe(3);
    });

    test('index cars with sort', async () => {
      let res;
      res = await graphql('{ cars(sort:[id]) {totalCount nodes {name PersonId BrandId}}}');
      expect(res.data.data.cars.totalCount).toBe(2);
      expect(res.data.data.cars.nodes).toHaveLength(2);
      expect(res.data.data.cars.nodes[0].name).toBe('Passat - Updated');
      expect(res.data.data.cars.nodes[0].PersonId).toBe(1);
      expect(res.data.data.cars.nodes[0].BrandId).toBe(2);

      expect(res.data.data.cars.nodes[1].name).toBe('F-500');
      expect(res.data.data.cars.nodes[1].PersonId).toBe(2);
      expect(res.data.data.cars.nodes[1].BrandId).toBe(3);
    });

    test('index cars with filter', async () => {
      let res;
      res = await graphql('{ cars(filter: {name: "F-500"}) {totalCount nodes {name PersonId BrandId}}}');
      expect(res.data.data.cars.totalCount).toBe(1);
      expect(res.data.data.cars.nodes).toHaveLength(1);
      expect(res.data.data.cars.nodes[0].name).toBe('F-500');
      expect(res.data.data.cars.nodes[0].PersonId).toBe(2);
      expect(res.data.data.cars.nodes[0].BrandId).toBe(3);
    });

    test('index cars with filter and relationship', async () => {
      let res;
      res = await graphql(
        `
          {
            cars(filter: { name: "F-500" }) {
              totalCount
              nodes {
                name
                PersonId
                Person {
                  name
                  CityId
                  City {
                    name
                    CountryId
                    Country {
                      name
                    }
                  }
                }
                BrandId
                Brand {
                  name
                  CountryId
                  Country {
                    name
                  }
                }
              }
            }
          }
        `
      );
      expect(res.data.data.cars.totalCount).toBe(1);
      expect(res.data.data.cars.nodes).toHaveLength(1);
      expect(res.data.data.cars.nodes[0].name).toBe('F-500');
      expect(res.data.data.cars.nodes[0].PersonId).toBe(2);
      expect(res.data.data.cars.nodes[0].Person.name).toBe('John');
      expect(res.data.data.cars.nodes[0].Person.CityId).toBe(2);
      expect(res.data.data.cars.nodes[0].Person.City.name).toBe('Munich');
      expect(res.data.data.cars.nodes[0].Person.City.CountryId).toBe(2);
      expect(res.data.data.cars.nodes[0].Person.City.Country.name).toBe('Germany');
      expect(res.data.data.cars.nodes[0].BrandId).toBe(3);
      expect(res.data.data.cars.nodes[0].Brand.name).toBe('Fiat');
      expect(res.data.data.cars.nodes[0].Brand.CountryId).toBe(3);
      expect(res.data.data.cars.nodes[0].Brand.Country.name).toBe('Italy');
    });

    test('index tyres with sort', async () => {
      let res;
      res = await graphql('{ tyres(sort: [id]) {totalCount nodes {name BrandId CarId}}}');

      expect(res.data.data.tyres.totalCount).toBe(4);
      expect(res.data.data.tyres.nodes).toHaveLength(4);

      expect(res.data.data.tyres.nodes[0].name).toBe('front right - Updated');
      expect(res.data.data.tyres.nodes[0].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[0].CarId).toBe(1);

      expect(res.data.data.tyres.nodes[1].name).toBe('front left');
      expect(res.data.data.tyres.nodes[1].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[1].CarId).toBe(1);

      expect(res.data.data.tyres.nodes[2].name).toBe('rear right');
      expect(res.data.data.tyres.nodes[2].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[2].CarId).toBe(1);

      expect(res.data.data.tyres.nodes[3].name).toBe('rear left');
      expect(res.data.data.tyres.nodes[3].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[3].CarId).toBe(1);
    });

    test('index tyres with sort and pagination', async () => {
      let res;
      res = await graphql('{ tyres(sort: [id], first: 1, offset: 1) {totalCount nodes {name BrandId CarId} }}');

      expect(res.data.data.tyres.totalCount).toBe(4);
      expect(res.data.data.tyres.nodes).toHaveLength(1);

      expect(res.data.data.tyres.nodes[0].name).toBe('front left');
      expect(res.data.data.tyres.nodes[0].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[0].CarId).toBe(1);
    });

    test('index tyres with sort, pagination and relationship', async () => {
      let res;
      res = await graphql(
        '{ tyres(sort: [id], first: 1, offset: 1) { totalCount nodes {name BrandId CarId Car {name}}}}'
      );

      expect(res.data.data.tyres.totalCount).toBe(4);
      expect(res.data.data.tyres.nodes).toHaveLength(1);

      expect(res.data.data.tyres.nodes[0].name).toBe('front left');
      expect(res.data.data.tyres.nodes[0].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[0].CarId).toBe(1);
      expect(res.data.data.tyres.nodes[0].Car.name).toBe('Passat - Updated');
    });

    test('index tyres with relationship', async () => {
      let res;
      res = await graphql(
        `
          {
            tyres(filter: { id: 1 }) {
              totalCount
              nodes {
                name
                CarId
                BrandId
                Brand {
                  name
                  CountryId
                  Country {
                    name
                  }
                }
              }
            }
          }
        `
      );

      expect(res.data.data.tyres.totalCount).toBe(1);
      expect(res.data.data.tyres.nodes).toHaveLength(1);

      expect(res.data.data.tyres.nodes[0].name).toBe('front right - Updated');
      expect(res.data.data.tyres.nodes[0].CarId).toBe(1);
      expect(res.data.data.tyres.nodes[0].BrandId).toBe(1);
      expect(res.data.data.tyres.nodes[0].Brand.name).toBe('Goodyear');
      expect(res.data.data.tyres.nodes[0].Brand.CountryId).toBe(1);
      expect(res.data.data.tyres.nodes[0].Brand.Country.name).toBe('USA - Updated');
    });
  });

  describe('show', () => {
    test('show countries', async () => {
      let res;
      res = await graphql('{ country(id: 1) {name}}');
      expect(res.data.data.country.name).toBe('USA - Updated');
    });

    test('show cities', async () => {
      let res;
      res = await graphql('{ city(id: 2) {name, CountryId}}');
      expect(res.data.data.city.name).toBe('Munich');
      expect(res.data.data.city.CountryId).toBe(2);
    });

    test('show people', async () => {
      let res;
      res = await graphql('{ person(id: 3) {name CityId}}');
      expect(res.data.data.person.name).toBe('Paul - Updated');
      expect(res.data.data.person.CityId).toBe(2);
    });

    test('show brands', async () => {
      let res;
      res = await graphql('{ brand(id: 2) {name CountryId}}');
      expect(res.data.data.brand.name).toBe('Volkswagen - Updated');
      expect(res.data.data.brand.CountryId).toBe(2);
    });

    test('show cars', async () => {
      let res;
      res = await graphql('{ car(id: 1) {name PersonId BrandId}}');
      expect(res.data.data.car.name).toBe('Passat - Updated');
      expect(res.data.data.car.PersonId).toBe(1);
      expect(res.data.data.car.BrandId).toBe(2);
    });

    test('show cars with relationships', async () => {
      let res;
      res = await graphql(
        `
          {
            car(id: 1) {
              name
              PersonId
              BrandId
              Tyres {
                BrandId
                Brand {
                  name
                  CountryId
                  Country {
                    name
                  }
                }
              }
            }
          }
        `
      );
      expect(res.data.data.car.name).toBe('Passat - Updated');
      expect(res.data.data.car.PersonId).toBe(1);
      expect(res.data.data.car.BrandId).toBe(2);
      expect(res.data.data.car.Tyres).toHaveLength(4);
      expect(res.data.data.car.Tyres[0].BrandId).toBe(1);
      expect(res.data.data.car.Tyres[0].Brand.name).toBe('Goodyear');
      expect(res.data.data.car.Tyres[0].Brand.CountryId).toBe(1);
      expect(res.data.data.car.Tyres[0].Brand.Country.name).toBe('USA - Updated');
    });

    test('show tyres', async () => {
      let res;
      res = await graphql('{ tyre (id: 2) {name BrandId CarId}}');
      expect(res.data.data.tyre.name).toBe('front left');
      expect(res.data.data.tyre.BrandId).toBe(1);
      expect(res.data.data.tyre.CarId).toBe(1);
    });    
  });
});
