//Back end

//sets up global variables
var toppingArray = [],
    inputs = document.getElementsByTagName("input"),
    pizzaPrice = 0,
    pizzaCounter = 1;

//pizza object
function Pizza(sizePizza,sauce,toppings) {
  this.sizePizza = sizePizza
  this.sauce = sauce
  this.toppings = toppings
}

//checks to see if sauce value is none or marinara;
function sauceChecker(sauces) {
  if (sauces === "None" || sauces === "Marinara") {
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

    // Checks which sauce is selected and will $0.50 if it is anything other than none or marinara
    var check = sauceChecker(sauce);

    // runs array to determine which boxes are checked
    checkboxArray();

    var newPizza = new Pizza(sizePizza, sauce, toppingArray);

    // sets pizza price and sets it to 2 decimal places
    pizzaPrice = (pizzaPrice + newPizza.sizePizza + check + (toppingArray.length * 0.5));
    var price = Number(pizzaPrice).toFixed(2);

    $("#price").text("Total Price: $"+price);

    // Adds pizza to list
    $("ul#pizzaList").append("<li><span class='pizza'> Pizza #"+pizzaCounter+"</span> <br>Size:&nbsp " + newPizza.sizePizza + " in. <br> Sauce: &nbsp"+newPizza.sauce+" <br> Toppings: &nbsp"+ toppingArray.join() +"</li>");
    $("#output").show();
    $("#price").show();
    pizzaCounter = pizzaCounter+1
    if (pizzaCounter > 5) {
      alert("Only 5 pizzas allowed. Please call for more details: 503-PDX-PZZA");
      document.getElementById('submit').disabled = true;
    }
    // Will reset fields for new pizza
    $("#pizza-builder").each(function() {
      this.reset();
    });
    toppingArray = [];
  });
});
