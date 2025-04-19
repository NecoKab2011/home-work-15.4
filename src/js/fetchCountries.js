export default function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
  
    return fetch(url)
      .then(response => {
        if (response.status === 404) {
          return Promise.reject('Країну не знайдено');
        }
  
        return response.json();
      });
  }