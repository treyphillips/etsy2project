(function(){
  'use strict';

var futurama= rawData.results;
var $list = $('.futurama-list');

$(document).ready(function(){

  var $list = $('.futurama-list');

  futurama.forEach(function(item){
    var titleText = renderTemplate('futurama-item', {
      title: item.title,
      description: item.description,
      pictures: item.Images[0].url_170x135,
      price: item.price,
      currency: item.currency_code,
      url: item.url,
      shop: item.Shop.shop_name,
    });
    $list.append(titleText);
  });

});

function renderTemplate(name, data) {
  var $template = $('[data-template-name=' + name + ']').text();
  $.each(data, function(prop, value) {
    $template = $template.replace('<% ' + prop + ' %>', value);
  });
  return $template;
}

function renderListings(data) {
  $list.empty();
  data.forEach(function(item) {
    var titleText = renderTemplate('itemRequest', {
      title: item.title,
      price: item.price,
      currency: item.currency_code,
      description: item.description,
      images: item.Images[0].url_170x135,
      shop: item.Shop.shop_name,
      url: item.url,
    });
    $list.append(titleText);
  });
}

var sort = function(array) {
  return _.sortBy(array, "price").reverse();
};

$('form').on('submit', function(event) {
  event.preventDefault();
  var itemRequest = ($(this).find('#search').val());
  $.ajax({
    url: "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=" + itemRequest + "&includes=Images,Shop",
    type: "GET",
    dataType: 'jsonp'
  })
  .done(function(data){
    $list.empty();
    renderListings(data.results);
    console.log(data);
  });
});



})();
