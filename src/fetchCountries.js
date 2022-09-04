export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name.trim()}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(data => {
      if (data.length) {
        const newData = data.map(country => {
          return {
            population: country.population,
            capital: country.capital[0],
            languages: country.languages,
            name: country.name.official,
            flag: country.flags.svg
          }
        })
        console.log(newData)
        return newData
      }

      return []
    })
    .catch(error => {
      console.warn(error)
    });
}