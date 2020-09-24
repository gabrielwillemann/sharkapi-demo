import axios from 'axios';

let url = 'http://localhost:3000';

describe('restapi', () => {
  describe('create', () => {
    test('create countries', async () => {
      let res;
      res = await axios.post(`${url}/countries`, { name: 'USA' });
      expect(res.data.name).toBe('USA');

      res = await axios.post(`${url}/countries`, { name: 'Germany' });
      expect(res.data.name).toBe('Germany');

      res = await axios.post(`${url}/countries`, { name: 'Italy' });
      expect(res.data.name).toBe('Italy');
    });

    test('create cities', async () => {
      let res;
      res = await axios.post(`${url}/cities`, { name: 'New York', CountryId: 1 });
      expect(res.data.name).toBe('New York');
      expect(res.data.CountryId).toBe(1);

      res = await axios.post(`${url}/cities`, { name: 'Munich', CountryId: 2 });
      expect(res.data.name).toBe('Munich');
      expect(res.data.CountryId).toBe(2);

      res = await axios.post(`${url}/cities`, { name: 'Roma', CountryId: 3 });
      expect(res.data.name).toBe('Roma');
      expect(res.data.CountryId).toBe(3);
    });

    test('create people', async () => {
      let res;
      res = await axios.post(`${url}/people`, { name: 'Gabriel', CityId: 1 });
      expect(res.data.name).toBe('Gabriel');
      expect(res.data.CityId).toBe(1);

      res = await axios.post(`${url}/people`, { name: 'John', CityId: 2 });
      expect(res.data.name).toBe('John');
      expect(res.data.CityId).toBe(2);

      res = await axios.post(`${url}/people`, { name: 'Paul', CityId: 2 });
      expect(res.data.name).toBe('Paul');
      expect(res.data.CityId).toBe(2);
    });

    test('create brands', async () => {
      let res;
      res = await axios.post(`${url}/brands`, { name: 'Goodyear', CountryId: 1 });
      expect(res.data.name).toBe('Goodyear');
      expect(res.data.CountryId).toBe(1);

      res = await axios.post(`${url}/brands`, { name: 'Volkswagen', CountryId: 2 });
      expect(res.data.name).toBe('Volkswagen');
      expect(res.data.CountryId).toBe(2);

      res = await axios.post(`${url}/brands`, { name: 'Fiat', CountryId: 3 });
      expect(res.data.name).toBe('Fiat');
      expect(res.data.CountryId).toBe(3);
    });

    test('create cars', async () => {
      let res;
      res = await axios.post(`${url}/cars`, { name: 'Passat', BrandId: 2, PersonId: 1 });
      expect(res.data.name).toBe('Passat');
      expect(res.data.BrandId).toBe(2);
      expect(res.data.PersonId).toBe(1);

      res = await axios.post(`${url}/cars`, { name: 'F-500', BrandId: 3, PersonId: 2 });
      expect(res.data.name).toBe('F-500');
      expect(res.data.BrandId).toBe(3);
      expect(res.data.PersonId).toBe(2);

      res = await axios.post(`${url}/cars`, { name: 'Tiggo', BrandId: 2, PersonId: 3 });
      expect(res.data.name).toBe('Tiggo');
      expect(res.data.BrandId).toBe(2);
      expect(res.data.PersonId).toBe(3);
    });

    test('create tyres', async () => {
      let res;
      res = await axios.post(`${url}/tyres`, { name: 'front right', BrandId: 1, CarId: 1 });
      expect(res.data.name).toBe('front right');
      expect(res.data.BrandId).toBe(1);
      expect(res.data.CarId).toBe(1);

      res = await axios.post(`${url}/tyres`, { name: 'front left', BrandId: 1, CarId: 1 });
      expect(res.data.name).toBe('front left');
      expect(res.data.BrandId).toBe(1);
      expect(res.data.CarId).toBe(1);

      res = await axios.post(`${url}/tyres`, { name: 'rear right', BrandId: 1, CarId: 1 });
      expect(res.data.name).toBe('rear right');
      expect(res.data.BrandId).toBe(1);
      expect(res.data.CarId).toBe(1);

      res = await axios.post(`${url}/tyres`, { name: 'rear left', BrandId: 1, CarId: 1 });
      expect(res.data.name).toBe('rear left');
      expect(res.data.BrandId).toBe(1);
      expect(res.data.CarId).toBe(1);
    });
  });

  describe('update', () => {
    test('update countries', async () => {
      let res;
      res = await axios.patch(`${url}/countries/1`, { name: 'USA - Updated' });
      expect(res.data.name).toBe('USA - Updated');
    });

    test('update cities', async () => {
      let res;
      res = await axios.patch(`${url}/cities/1`, { name: 'New York - Updated' });
      expect(res.data.name).toBe('New York - Updated');
    });

    test('update people', async () => {
      let res;
      res = await axios.patch(`${url}/people/3`, { name: 'Paul - Updated' });
      expect(res.data.name).toBe('Paul - Updated');
    });

    test('update brands', async () => {
      let res;
      res = await axios.patch(`${url}/brands/2`, { name: 'Volkswagen - Updated' });
      expect(res.data.name).toBe('Volkswagen - Updated');
    });

    test('update cars', async () => {
      let res;
      res = await axios.patch(`${url}/cars/1`, { name: 'Passat - Updated' });
      expect(res.data.name).toBe('Passat - Updated');
    });

    test('update tyres', async () => {
      let res;
      res = await axios.patch(`${url}/tyres/1`, { name: 'front right - Updated' });
      expect(res.data.name).toBe('front right - Updated');
    });
  });

  describe('delete', () => {
    test('delete car', async () => {
      let res;
      res = await axios.delete(`${url}/cars/3`);
      expect(res.data.name).toBe('Tiggo');
      expect(res.data.BrandId).toBe(2);
      expect(res.data.PersonId).toBe(3);
    });
  });

  describe('index', () => {
    test('index countries with sort', async () => {
      let res;
      res = await axios.get(`${url}/countries?sort=-id`);
      expect(res.data.data).toHaveLength(3);
      expect(res.data.data[0].name).toBe('Italy');
      expect(res.data.data[1].name).toBe('Germany');
      expect(res.data.data[2].name).toBe('USA - Updated');
    });

    test('index cities with sort', async () => {
      let res;
      res = await axios.get(`${url}/cities?sort=name`);
      expect(res.data.data).toHaveLength(3);
      expect(res.data.data[0].name).toBe('Munich');
      expect(res.data.data[0].CountryId).toBe(2);
      expect(res.data.data[1].name).toBe('New York - Updated');
      expect(res.data.data[1].CountryId).toBe(1);
      expect(res.data.data[2].name).toBe('Roma');
      expect(res.data.data[2].CountryId).toBe(3);
    });

    test('index people with sort', async () => {
      let res;
      res = await axios.get(`${url}/people?sort=id`);
      expect(res.data.data).toHaveLength(3);
      expect(res.data.data[0].name).toBe('Gabriel');
      expect(res.data.data[0].CityId).toBe(1);
      expect(res.data.data[1].name).toBe('John');
      expect(res.data.data[1].CityId).toBe(2);
      expect(res.data.data[2].name).toBe('Paul - Updated');
      expect(res.data.data[2].CityId).toBe(2);
    });

    test('index people with sort and filter', async () => {
      let res;
      res = await axios.get(`${url}/people?filter[CityId]=2&sort=-id`);
      expect(res.data.data).toHaveLength(2);
      expect(res.data.data[0].name).toBe('Paul - Updated');
      expect(res.data.data[0].CityId).toBe(2);
      expect(res.data.data[1].name).toBe('John');
      expect(res.data.data[1].CityId).toBe(2);
    });

    test('index brands with sort', async () => {
      let res;
      res = await axios.get(`${url}/brands?sort=-name`);
      expect(res.data.data).toHaveLength(3);
      expect(res.data.data[0].name).toBe('Volkswagen - Updated');
      expect(res.data.data[0].CountryId).toBe(2);
      expect(res.data.data[1].name).toBe('Goodyear');
      expect(res.data.data[1].CountryId).toBe(1);
      expect(res.data.data[2].name).toBe('Fiat');
      expect(res.data.data[2].CountryId).toBe(3);
    });

    test('index cars with sort', async () => {
      let res;
      res = await axios.get(`${url}/cars?sort=id`);
      expect(res.data.data).toHaveLength(2);
      expect(res.data.data[0].name).toBe('Passat - Updated');
      expect(res.data.data[0].PersonId).toBe(1);
      expect(res.data.data[0].BrandId).toBe(2);

      expect(res.data.data[1].name).toBe('F-500');
      expect(res.data.data[1].PersonId).toBe(2);
      expect(res.data.data[1].BrandId).toBe(3);
    });

    test('index cars with filter', async () => {
      let res;
      res = await axios.get(`${url}/cars?filter[name]=F-500`);
      expect(res.data.data).toHaveLength(1);
      expect(res.data.data[0].name).toBe('F-500');
      expect(res.data.data[0].PersonId).toBe(2);
      expect(res.data.data[0].BrandId).toBe(3);
    });

    test('index cars with filter and relationship', async () => {
      let res;
      res = await axios.get(`${url}/cars?filter[name]=F-500&include=person.city.country,brand.country`);
      expect(res.data.data).toHaveLength(1);
      expect(res.data.data[0].name).toBe('F-500');
      expect(res.data.data[0].PersonId).toBe(2);
      expect(res.data.data[0].Person.name).toBe('John');
      expect(res.data.data[0].Person.CityId).toBe(2);
      expect(res.data.data[0].Person.City.name).toBe('Munich');
      expect(res.data.data[0].Person.City.CountryId).toBe(2);
      expect(res.data.data[0].Person.City.Country.name).toBe('Germany');
      expect(res.data.data[0].BrandId).toBe(3);
      expect(res.data.data[0].Brand.name).toBe('Fiat');
      expect(res.data.data[0].Brand.CountryId).toBe(3);
      expect(res.data.data[0].Brand.Country.name).toBe('Italy');
    });

    test('index tyres with sort', async () => {
      let res;
      res = await axios.get(`${url}/tyres?sort=id`);

      expect(res.data.data).toHaveLength(4);

      expect(res.data.data[0].name).toBe('front right - Updated');
      expect(res.data.data[0].BrandId).toBe(1);
      expect(res.data.data[0].CarId).toBe(1);

      expect(res.data.data[1].name).toBe('front left');
      expect(res.data.data[1].BrandId).toBe(1);
      expect(res.data.data[1].CarId).toBe(1);

      expect(res.data.data[2].name).toBe('rear right');
      expect(res.data.data[2].BrandId).toBe(1);
      expect(res.data.data[2].CarId).toBe(1);

      expect(res.data.data[3].name).toBe('rear left');
      expect(res.data.data[3].BrandId).toBe(1);
      expect(res.data.data[3].CarId).toBe(1);
    });

    test('index tyres with sort and pagination', async () => {
      let res;
      res = await axios.get(`${url}/tyres?sort=id&page[limit]=1&page[offset]=1`);

      expect(res.data.data).toHaveLength(1);

      expect(res.data.data[0].name).toBe('front left');
      expect(res.data.data[0].BrandId).toBe(1);
      expect(res.data.data[0].CarId).toBe(1);
    });

    test('index tyres with sort, pagination and relationship', async () => {
      let res;
      res = await axios.get(`${url}/tyres?sort=id&page[limit]=1&page[offset]=1&include=car`);

      expect(res.data.data).toHaveLength(1);

      expect(res.data.data[0].name).toBe('front left');
      expect(res.data.data[0].BrandId).toBe(1);
      expect(res.data.data[0].CarId).toBe(1);
      expect(res.data.data[0].Car.name).toBe('Passat - Updated');
    });
  });

  describe('show', () => {
    test('show countries', async () => {
      let res;
      res = await axios.get(`${url}/countries/1`);
      expect(res.data.name).toBe('USA - Updated');
    });

    test('show cities', async () => {
      let res;
      res = await axios.get(`${url}/cities/2`);
      expect(res.data.name).toBe('Munich');
      expect(res.data.CountryId).toBe(2);
    });

    test('show people', async () => {
      let res;
      res = await axios.get(`${url}/people/3`);
      expect(res.data.name).toBe('Paul - Updated');
      expect(res.data.CityId).toBe(2);
    });

    test('show brands', async () => {
      let res;
      res = await axios.get(`${url}/brands/2`);
      expect(res.data.name).toBe('Volkswagen - Updated');
      expect(res.data.CountryId).toBe(2);
    });

    test('show cars', async () => {
      let res;
      res = await axios.get(`${url}/cars/1`);
      expect(res.data.name).toBe('Passat - Updated');
      expect(res.data.PersonId).toBe(1);
      expect(res.data.BrandId).toBe(2);
    });

    test('show cars with relationships', async () => {
      let res;
      res = await axios.get(`${url}/cars/1?include=tyres.brand.country`);
      expect(res.data.name).toBe('Passat - Updated');
      expect(res.data.PersonId).toBe(1);
      expect(res.data.BrandId).toBe(2);
      expect(res.data.Tyres).toHaveLength(4);
      expect(res.data.Tyres[0].BrandId).toBe(1);
      expect(res.data.Tyres[0].Brand.name).toBe('Goodyear');
      expect(res.data.Tyres[0].Brand.CountryId).toBe(1);
      expect(res.data.Tyres[0].Brand.Country.name).toBe('USA - Updated');
    });

    test('show tyres', async () => {
      let res;
      res = await axios.get(`${url}/tyres/2`);
      expect(res.data.name).toBe('front left');
      expect(res.data.BrandId).toBe(1);
      expect(res.data.CarId).toBe(1);
    });
  });
});
