var regListWidgA = [];
if (localStorage["regNumbers"]) {
  regListWidgA = localStorage.getItem("regNumbers").split(",");
}

let townsWidgA = {
  CY: "Bellville",
  CA: "Cape Town",
  CF: "Kuilsriver",

};

const filter = regNumFilter(regListWidgA, townsWidgA);
const addBtn = document.querySelector(".add_btn");
const regDisplayList = document.querySelector(".reg_display_list");
const townOptions = document.querySelector(".town");
const resetBtn = document.querySelector(".reset_btn");
const clearBtn = document.querySelector(".clear_filter_btn");

function displayNum(regNum) {
  var plate = document.createElement("LI");
  plate.innerHTML = regNum;
  regDisplayList.insertBefore(plate, regDisplayList.firstChild);
}

resetBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  localStorage.removeItem("regNumbers");
  regListWidgA = [];
  filter = regNumFilter(regListWidgA, townsWidgA);
});
clearBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  document.querySelector(".town").selectedIndex = 0;
  filter.getRegList().forEach(displayNum);
});

filter.getRegList().forEach(displayNum)

addBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  document.querySelector(".town").selectedIndex = 0;
  filter.getRegList().forEach(displayNum);
  regEntered = document.querySelector(".reg_input").value;
  if (regEntered == "") {
    document.querySelector(".reg_input").classList.add("no_value");
    setTimeout(function () {
      document.querySelector(".reg_input").classList.remove("no_value");
    }, 1500);
    return;
  }
//Timeout//
  regEnteredList = filter.inputToList(regEntered);
  regEnteredList.forEach(function (num, i) {
    setTimeout(function () {
      if (filter.validityTest(num)) {
        filter.addToList(num);
        displayNum(num);
        document.querySelector(".isiqinisekiso").classList.add("valid");
        document.querySelector(".isiqinisekiso").innerHTML = num + " was sucessfully captured into the registated Registration Numbers.";
      } 
   
      
      else {
        document.querySelector(".isiqinisekiso").classList.add("invalid");
        document.querySelector(".isiqinisekiso").innerHTML = num + " Is an invalid registration number. Or the registration number is not captured/ is already captured.";
      }
    }, 1000 * i);
  });

  setTimeout(function () {
    localStorage.setItem("regNumbers", filter.getRegList().toString());

    if (document.querySelector(".isiqinisekiso").classList.contains("invalid")) {
      document.querySelector(".isiqinisekiso").classList.remove("invalid");
      document.querySelector(".isiqinisekiso").innerHTML = "Please enter a valid registration number.";
    }
    if (document.querySelector(".isiqinisekiso").classList.contains("valid")) {
      document.querySelector(".isiqinisekiso").classList.remove("valid");
    }
    document.querySelector(".isiqinisekiso").innerHTML = "Enter a valid registration number.";
  }, 4000 * regEnteredList.length);
  document.querySelector(".reg_input").value = "";

});
//Timeout ends//

townOptions.onchange = function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  var townSelected = document.querySelector(".town").selectedIndex;
  var townList = filter.carsForTown(townOptions.options[townSelected].value);
  townList.forEach(displayNum);
};

