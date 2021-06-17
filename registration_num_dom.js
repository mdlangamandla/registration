var regListWidgA = [];
if (localStorage["regNumbers"]) {
  regListWidgA = localStorage.getItem("regNumbers").split(",");
}

let townsWidgA = {
  CY: "Bellville",
  CA: "Cape Town",
  CF: "Kuilsriver",
};

var filter = regNumFilter(regListWidgA, townsWidgA);
var addBtn = document.querySelector(".add_btn");
var regDisplayList = document.querySelector(".reg_display_list");
var townOptions = document.querySelector(".town");
var resetBtn = document.querySelector(".reset_btn");
var clearBtn = document.querySelector(".clear_filter_btn");

function displayNum(regNum) {
  var plate = document.createElement("LI");
  plate.innerHTML = regNum;
  regDisplayList.insertBefore(plate, regDisplayList.firstChild);
}

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
  

  regEnteredList = filter.inputToList(regEntered);
  regEnteredList.forEach(function (num, i) {
    setTimeout(function () {
      if (filter.validityTest(num)) {
        filter.addToList(num);
        displayNum(num);
        document.querySelector(".confirmation").classList.add("valid");
        document.querySelector(".confirmation").innerHTML = num + " was sucessfully captured.";
      } 
   
      
      else {
        document.querySelector(".confirmation").classList.add("invalid");
        document.querySelector(".confirmation").innerHTML = num + " Is an invalid registration number. Or the registration number is not captured/ is already captured.";
      }
    }, 2000 * i);
  });

  setTimeout(function () {
    localStorage.setItem("regNumbers", filter.getRegList().toString());

    if (document.querySelector(".confirmation").classList.contains("invalid")) {
      document.querySelector(".confirmation").classList.remove("invalid");
      document.querySelector(".confirmation").innerHTML = "Please enter a valid registration number.";
    }
    if (document.querySelector(".confirmation").classList.contains("valid")) {
      document.querySelector(".confirmation").classList.remove("valid");
    }
    document.querySelector(".confirmation").innerHTML = "Enter a registration number in the text-box below.";
  }, 2000 * regEnteredList.length);
  document.querySelector(".reg_input").value = "";
  
});

townOptions.onchange = function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  var townSelected = document.querySelector(".town").selectedIndex;
  var townList = filter.carsForTown(townOptions.options[townSelected].value);
  townList.forEach(displayNum);

  // document.querySelector(".town").innerHTML = ""
};

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