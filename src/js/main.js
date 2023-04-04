import $ from "jquery";
import bootstrap from 'bootstrap';
import '../css/main.scss';

const MAX_USERS = 20;
const MONTH_COUNT = 12;

$(function(){
  selectorFill('USD');
  handleCurrencySelect();
  handlePriceSelect();
});

function getPricePerMonth(currency) {
  switch(currency) {
    case 'USD':
      return 35;
    case 'EUR':
      return 32;
    default:
      return 29;
  }
}

function getCurrencySymbol(currency) {
  switch(currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return '£';
  }
}

function selectorFill(currency) {
  let resultHTML = '';

  for (let i = 1; i <= MAX_USERS; i++) {
    resultHTML += '<li class="dropdown-item price-selector__dropdown-item" role="button">'
    + '<span class="price-selector__users">' + i + ' users</span>'
    + '<span class="price-selector__price">'
    + getCurrencySymbol(currency) + getPricePerMonth(currency) * MONTH_COUNT * i + '/year</span>'
    + '</li>';
  }

  resultHTML += '<div class="price-selector__last-item">'
  + '<span class="price-selector__tag-text">More than 20 users?</span>'
  + '<span role="button" class="price-selector__button-text">Get a Custom Quote ></span>'
  + '</div>';

  $('.price-selector__dropdown-menu').html(resultHTML);
};

function handleCurrencySelect() {
  $('.currencies__currency').on('click', function() {
    const currency = $(this).text();
    const usersCount = $('.price-selector__wrapper > .price-selector__users').text().split(' ')[0];
    const currencySymbol = getCurrencySymbol(currency);
    const pricePerMonth = getPricePerMonth(currency);
    const priceText = currencySymbol + (pricePerMonth * usersCount * MONTH_COUNT);

    $('.currencies__currency').removeClass('currencies__currency--selected');
    $(this).addClass('currencies__currency--selected');
    selectorFill(currency);
    $('.price-selector__price').text(`${priceText}/year`);
    $('.plan__price').text(currencySymbol + pricePerMonth)
  })
};

function handlePriceSelect() {
  $('.price-selector__dropdown-item').on('click', function() {
    const pumpHTML = '<span class="price-selector__pump">|</span>';
    let thisElementHTML = $(this).html();
    const newElementHTML = $(thisElementHTML)[0].outerHTML
    + pumpHTML
    + $(thisElementHTML)[1].outerHTML;

    $('.price-selector__wrapper').html(newElementHTML);
  })
};
