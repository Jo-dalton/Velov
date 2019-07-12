
var lName = document.getElementById("lName");
var fName = document.getElementById("fName");

var lName = localStorage.getItem("lName");
var fName = localStorage.getItem("fName");

function stock(lName, fName) {


    localStorage.setItem("lName", document.getElementById('fName').value);
    localStorage.setItem("fName", document.getElementById('lName').value);
};
console.log(lName, fName);
