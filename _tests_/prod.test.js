const request = require("request");
require('isomorphic-fetch');
const url = 'http://www.pauliceia.dpi.inpe.br/api/geocoding';

async function requestPlacesStreetsList(service) {
    return await new Promise((resolve, reject) => {
        request(url + service, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(body));
            }
        })
    })
}

console.log('Production Test Suite');

console.log('Geocoding');
/*
test('26. Placeslist', async () => {
    const result = await requestPlacesStreetsList('/placeslist');
    expect(result).toBe('');
})

test('27. Places', async () => {
    const result = await requestPlacesStreetsList('/places');
    expect(result).toBeTruthy();
})

test('28. Streets', async () => {
    const result = await requestPlacesStreetsList('/streets');
    console.log(result);
    expect(result).toBe('');
})

test('29. Search in a year before 1870', async () => {
    const req = 'avenida sao joao, 24, 1869';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('The scope of this service does not contemplate periods before 1870');
})

test('30. Search in a year after 1940', async () => {
    const req = 'avenida sao joao, 24, 1941';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('The scope of this service does not contemplate periods after 1940');
})

test('31. Search in the limit year 1870', async () => {
    const req = 'avenida sao joao, 24, 1870';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(0);
})

test('32. Search in the limit year 1940', async () => {
    const req = 'avenida sao joao, 24, 1940';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('33. Contains text in the year field', async () => {
    const req = 'avenida sao joao, 24, c1940';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('There are non numerical characters in the year field');
})

test('34. Does not contain text in the textpoint field', async () => {
    const req = ', 24, 1940';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('There is no textpoint to be searched');
})

test('35. Textpoint has a length lower than 3', async () => {
    const req = 'rua, 24, 1940';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('The textpoint boundaries are: 3<x<256');
})

test('36. Textpoint has a length higher than 256', async () => {
    const req = 'zVPTjSh7Oyirb8m8Hqvh2iAmKXBVUIM4qCR5VD5tvMey9DcL8cG7NqrwASqR8TEAaE1kkIJhu4mTDITQZOsB9eAPpPCgm9dcqQw9PUAB0mAcGltD2fXmwJE3fVB7xwYNevMjXfu82OzXMMmb9RUx6XUowsjm0PQhkqJKtPN51dV0JraJlGEFsjSXzYTZ9ykeWv2ecxpzW39dEjLNCSyxwBzF54z0SSIFBnp5xT1RuUmyMVwhsXz4C1ZhOpfTKiYk, 24, 1940';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('The textpoint boundaries are: 3<x<256');
})

test('37. Textpoint has a length equal to 4', async () => {
    const req = 'aven, 24, 1940';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].name).toBe('Point not found');
})

test('38. Number less than 0', async () => {
    const req = 'avenida sao joao, -1, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('Number should be >= 0');
})

test('39. Number higher than 10.000', async () => {
    const req = 'avenida sao joao, 10000, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('Number should be < 10.000');
})

test('40. Number equal to 0', async () => {
    const req = 'avenida sao joao, 0, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('41. Number equal to 9.999', async () => {
    const req = 'avenida sao joao, 9999, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(0);
})

test('42. Contains text in the number field', async () => {
    const req = 'avenida sao joao, c24, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].alertMsg).toBe('There are non numerical characters in the number field');
})

test('43. Search in existing street a number higher than the highest place existant', async () => {
    const req = 'avenida sao joao, 1700, 1935';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('44. Search in existing street a number lower than the lowest place existant', async () => {
    const req = 'avenida sao joao, 2, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(0);
})

test('45. Search in existing street a number in between existing places', async () => {
    const req = 'avenida sao joao, 1000, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('46. Search an address without a place in it, in a existing street, over extrapolating the year', async () => {
    const req = 'avenida sao joao, 1700, 1935';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('47. Search an address without a place in it, in a existing street, under extrapolating the year', async () => {
    const req = 'avenida sao joao, 1000, 1905';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(0);
})

test('48. Search an address with a place in it, in a existing street, over extrapolating the year', async () => {
    const req = 'avenida sao joao, 24, 1980';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('49. Search an address with a place in it, in a existing street, under extrapolating the year', async () => {
    const req = 'avenida sao joao, 24, 1902';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})

test('50. Place that exist in the year logged', async () => {
    const req = 'avenida sao joao, 24, 1908';
    const result = await requestPlacesStreetsList('/geolocation/'+req+'/json');
    expect(result[1][0].status).toBe(1);
})
*/