//Back end
var toppingArray = [],
    inputs = document.getElementsByTagName("input"),
    pizzaPrice = 0;

function Pizza(sizePizza,sauce,toppings) {
  this.sizePizza = sizePizza
  this.sauce = sauce
  this.toppings = toppings
}
function sauceChecker(sauces) {
  if (sauces !== "Marinara" || sauces !== "") {
    return 0.5;
  }
}
function checkboxArray() {
  for (var i = 0; i < inputs.length; i += 1) {
     // select only checked checkboxes
     if (inputs[i].type === "checkbox" && inputs[i].checked) {
        toppingArray.push(inputs[i].value);
     }
  }
}

// Front end
$(function () {
  $("#add").one('click', function() {
      checkboxArray();
      console.log(toppingArray);
  });
  $("form#pizza-builder").submit(function(event) {
    event.preventDefault();
    var sizePizza = parseFloat($("#sizePizza :selected").val());
    var sauce = $("#sauce :selected").val();
    var check = sauceChecker(sauce);
    var newPizza = new Pizza(sizePizza, sauce, toppingArray);
    pizzaPrice = pizzaPrice + newPizza.sizePizza + check + (toppingArray.length * 0.5);
    console.log(pizzaPrice);
  });
});
