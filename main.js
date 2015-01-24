(function(){
  'use strict';

var futurama= rawData.results;

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




})();
