import $ from "jquery";
import bootstrap from 'bootstrap';
import '../css/main.scss';

$(function(){
  selectorFill(20);
  handleSelect();
});

const selectorFill = (num) => {
  let resultHTML = '';

  for (let i = 1; i <= num; i++) {
    resultHTML += '<li class="dropdown-item price-selector__dropdown-item" id="dropdown-item-' + i + '" role="button">'
    + '<span class="price-selector__users">' + i + ' users</span>'
    + '<span class="price-selector__price">$' + 420 * i + '/year</span>'
    + '</li>';
  }

  resultHTML += '<div class="price-selector__last-item">'
  + '<span class="price-selector__tag-text">More than 20 users?</span>'
  + '<span role="button" class="price-selector__button-text">Get a Custom Quote ></span>'
  + '</div>';

  $('.price-selector__dropdown-menu').html(resultHTML);
};

const handleSelect = () => {
  $('.price-selector__dropdown-item').on("click", function() {
    const pumpHTML = '<span class="price-selector__pump">|</span>';
    let thisElementHTML = $(this).html();
    const newElementHTML = $(thisElementHTML)[0].outerHTML
    + pumpHTML
    + $(thisElementHTML)[1].outerHTML;

    $(".price-selector__wrapper").html(newElementHTML);
  })
};
