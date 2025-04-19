import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { alert, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const input = document.querySelector('.search');
const list = document.querySelector('.list');
const infoBox = document.querySelector('.info');

input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
    const name = e.target.value.trim();

  if (name === '') {
    clearAll();
    return;
  }

  fetchCountries(name)
    .then(showResult)
    .catch(() => {
      clearAll();
      alert({ text: 'Країну не знайдено' });
    });
}

function showResult(countries) {
  clearAll();

  if (countries.length > 10) {
    info({ text: 'Введи точнішу назву' });
    return;
  }

  if (countries.length === 1) {
    const country = countries[0];
    infoBox.innerHTML = `
      <h2>${country.name}</h2>
      <p>Столиця: ${country.capital}</p>
      <p>Населення: ${country.population}</p>
      <p>Мови: ${country.languages.map(lang => lang.name).join(', ')}</p>
      <img src="${country.flags.svg}" alt="Прапор ${country.name}">
    `;
    return;
  }

  list.innerHTML = countries
    .map(country => `<li>${country.name}</li>`)
    .join('');
}

function clearAll() {
  list.innerHTML = '';
  infoBox.innerHTML = '';
}
