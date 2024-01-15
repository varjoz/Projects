var golyo = document.getElementById("labda");
var doboz = document.getElementById("doboz");

golyo.style.background = "blue";

function mozgat(event) {
  var randomleft = random(doboz.offsetWidth);
  var randomtop = random(doboz.offsetHeight);
  golyo.style.top = randomtop+"px";
  golyo.style.left = randomleft+"px";
}
function random(max) { // min and max included 
  var min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min)
}

golyo.addEventListener("click", mozgat);

