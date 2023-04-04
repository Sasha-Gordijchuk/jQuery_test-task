import $ from "jquery";
import bootstrap from 'bootstrap';
import '../css/main.scss';

const MAX_USERS = 20;
const MONTH_COUNT = 12;
let currency = 'USD'
$('.progress-bar__input').val(0);

$(function(){
  selectorFill(currency);
  currencySelectListener();
  priceSelectListener();
  openSelectorListener();
  rangeInputListener();
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

function openSelectorListener() {
  $('.price-selector__button').on('click', function() {
    handleSelectorChange();
  })
}

function handleSelectorChange() {
  for (let i = 1; i <= MAX_USERS; i++) {
    const item = $(`.price-selector__dropdown-item:nth-child(${i})`);

    const priceLabel = item.children()[1];

    $(priceLabel).text(getCurrencySymbol(currency)
    + (getPricePerMonth(currency) * MONTH_COUNT * i)
    + '/year');
  }
}

function currencySelectListener() {
  $('.currencies__currency').on('click', function() {
    currency = $(this).text();
    const usersCount = $('.price-selector__wrapper > .price-selector__users').text().split(' ')[0];
    const currencySymbol = getCurrencySymbol(currency);
    const pricePerMonth = getPricePerMonth(currency);
    const priceText = currencySymbol + (pricePerMonth * usersCount * MONTH_COUNT);

    $('.currencies__currency').removeClass('currencies__currency--selected');
    $(this).addClass('currencies__currency--selected');
    // selectorFill(currency);
    $('.price-selector__price').text(`${priceText}/year`);
    $('.plan__price').text(currencySymbol + pricePerMonth)

    changeRangeLabels(
      $('.progress-bar__input'),
      $('.progress-bar__users'),
      $('.progress-bar__price')
    )
  })
};

function priceSelectListener() {
  $('.price-selector__dropdown-item').on('click', function() {
    const pumpHTML = '<span class="price-selector__pump">|</span>';
    let thisElementHTML = $(this).html();
    const newElementHTML = $(thisElementHTML)[0].outerHTML
    + pumpHTML
    + $(thisElementHTML)[1].outerHTML;

    $('.price-selector__wrapper').html(newElementHTML);
  })
};

function changeRangeLabels(range, beforeRange, afterRange) {
  const val = range.val();
  const min = range.attr('min');
  const max = range.attr('max');
  const newVal = Number(((val - min) * 100) / (max - min));
  const firstPlanCard = $('.plan:first-child');
  const secondPlanCard = $('.plan:last-child');

  if (val > 20) {
    beforeRange.text('More than 20?');
    afterRange.text('Get a Custom Quote >');
    afterRange.addClass('features__all');
    firstPlanCard.removeClass('plan--active');
    secondPlanCard.addClass('plan--active');
  } else {
    beforeRange.text(val + ' users');
    afterRange.text(getCurrencySymbol(currency)
    + (val * getPricePerMonth(currency) * MONTH_COUNT)
    + '/year');
  
    beforeRange.css('left', `calc(${newVal}% + (${8 - newVal * 0.15}px))`);
    afterRange
      .removeClass('features__all')
      .css('left', `calc(${newVal}% + (${8 - newVal * 0.15}px))`);
      secondPlanCard.removeClass('plan--active');
      firstPlanCard.addClass('plan--active');
  }
}

function rangeInputListener() {
  const range = $('.progress-bar__input');
  const beforeRange = $('.progress-bar__users');
  const afterRange = $('.progress-bar__price');
  
  range.on('input', function() {
    changeRangeLabels(range, beforeRange,afterRange);
  });
};
