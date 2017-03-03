//Back end
var toppingArray = [],
    inputs = document.getElementsByTagName("input"),
    pizzaPrice = 0,
    pizzaCounter = 1;

function Pizza(sizePizza,sauce,toppings) {
  this.sizePizza = sizePizza
  this.sauce = sauce
  this.toppings = toppings
}
function sauceChecker(sauces) {
  if (sauces === "None") {
    return 0;
  } else if (sauces === "Marinara"){
    return 0;
  } else {
    return 0.5;
  }
}
//  Determines which boxes are checked
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
  $("form#pizza-builder").submit(function(event) {
    event.preventDefault();

    var sizePizza = parseFloat($("#sizePizza :selected").val());
    var sauce = $("#sauce :selected").val();

    var check = sauceChecker(sauce);
    checkboxArray();

    var newPizza = new Pizza(sizePizza, sauce, toppingArray);

    pizzaPrice = (pizzaPrice + newPizza.sizePizza + check + (toppingArray.length * 0.5));

    var price = Number(pizzaPrice).toFixed(2);

    $("#price").text("Total Price: $"+price);

    // Adds pizza to list
    $("ul#pizzaList").append("<li><span class='pizza'> Pizza #"+pizzaCounter+"</span> <br>Size: " + newPizza.sizePizza + " in. <br> Sauce: "+newPizza.sauce+" <br> Toppings: "+ toppingArray.join() +"</li>");
    pizzaCounter = pizzaCounter+1
    // Will reset fields for new pizza
    $("#pizza-builder").each(function() {
      this.reset();
    });
    toppingArray = [];
  });
});
