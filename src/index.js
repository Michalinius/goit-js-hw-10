import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const listOfCountries = document.querySelector(".country-list")
const oneCountry = document.querySelector(".country-info")

const listLoop = (data) => {
    let array = [];
    for (i = 0; i < data.length; i++) {
        array.push(`<li style="display:flex; list-style:none; align-items:baseline;"><img style="margin-right:20px;" src="${data[i].flag}" alt="There's should be a flag" width="20px" height="10px"> <p>${data[i].name}</p></li>`);
    }
    array = array.join("");
    console.log(array);
    return array;
}



input.addEventListener("input", debounce(event => {
    //tu czyścic
    if (event.target.value === "") {
        listOfCountries.innerHTML = "";
        oneCountry.innerHTML = "";
        return
    }

    fetchCountries(event.target.value).then(data => {
        if (data.length > 10)
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        else if (data.length == 0) {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        else if (data.length == 1)
            oneCountry.innerHTML = (`<span style="display:flex; align-items:center; justify-content:center;"><img style="margin-right:20px;" src="${data[0].flag}" alt="There's should be a flag" width="500px" height="100%"> <p style="font-size:42px; font-weight:700;">${data[0].name}</p></span><span style="display:flex; align-items:center; justify-content:center; flex-direction:column; font-size:20px;"><p>Capital: ${data[0].capital}</p><p>Population: ${data[0].population}</p><p>Languages: ${Object.values(data[0].languages)}</p></span>`);
        else if (data.length >= 2 && data.length <= 10) {
            listLoop(data)
            console.log('asdd')
            listOfCountries.innerHTML = listLoop(data);
            console.log(listOfCountries)
        }
    })

}, DEBOUNCE_DELAY))