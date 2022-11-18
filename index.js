let parentDiv = document.getElementsByClassName("parentDiv");
let btn = document.getElementById("sort");
let reset = document.getElementById("reset");
let speed = document.querySelector(".speed");
let range = document.querySelector(".num_of_bars");
let algo = document.querySelector(".algo");
let select_algo = "";
let max = range.value;
let arr = new Array(max);
let speedFact = 10;
let heightFact = 10;

// Page Loding SetUp
document.addEventListener("DOMContentLoaded", function () {
  arr = randomArray();
  renderBars(arr);
});

// Set the Range/Num of Bars
range.addEventListener("input", function(){
  max = range.value;
  let element = document.querySelectorAll("div .bar");
  element.forEach(e => {e.remove();});
  arr = randomArray();
  renderBars(arr);
})

// Set Speed dor Run
speed.addEventListener("change", function(e){
  speedFact = parseInt(e.target.value);
})

// Set the Algorithem
algo.addEventListener("change", function(){
  select_algo = algo.value;
});

// Generate Random Number
function randomNum(){
  return Math.floor(Math.random()*max)+2;
}

// Generate Random Array
function randomArray(){
  let array = new Array(max);
  for(let i=0; i<max; i++){
    array[i] = randomNum();
  }
  return array;
}

// Render Bars
function renderBars(arr){

  arr.forEach(e => {
    let innerDiv = document.createElement("div");
    // innerDiv.innerHTML = "<h2 style = 'margin-top:"+(e*10 +5)+"px;'>"+e+"</h2>"
    innerDiv.innerText = ""+e;
    innerDiv.style.height = (e*heightFact + 'px');
    innerDiv.classList.add("bar");
    parentDiv[0].appendChild(innerDiv);
  });
}

// Button for Start Sorting
btn.addEventListener("click", function(){

  switch (select_algo) {
    case "bubble":
        bubbleSort(arr);
      break;
    case "quick":
        quickSort(arr, 0, arr.length - 1);
      break;
    default:
        bubbleSort(arr);
      break;
  }
});

// Button for Reset Array and Generate New Array
reset.addEventListener("click", function(){
  let element = document.querySelectorAll("div .bar");
  element.forEach(e => {e.remove();});
  arr = randomArray();
  renderBars(arr);
});

// Generate a Delay
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

// Sorting Algorithm : Bubble Sort
async function bubbleSort(arr){

let bars = document.getElementsByClassName("bar");

  for(let i=0; i<arr.length; i++){
    for(let j=0; j<arr.length-i-1; j++){

      if(arr[j]>arr[j+1]){

        for (let k = 0; k < bars.length; k++) {
          if (k !== j+1) {
            bars[k].style.backgroundColor = "#0D4C92";
          }
          else{
            bars[k].style.backgroundColor = "yellow";
          }
        }

        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;

        bars[j].style.height = arr[j]*10 + "px";
        // bars[j].style.backgroundColor = "lightgreen";
        bars[j].innerText = arr[j];
        bars[j + 1].style.height = arr[j + 1]*10 + "px";
        // bars[j + 1].style.backgroundColor = "lightgreen";
        bars[j + 1].innerText = arr[j + 1];

        await sleep(speedFact);
      }
    }
    await sleep(speedFact);
  }
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#0D4C92";
  }
}

// Sorting Algorithm : Quick Sort
async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFact + "px";
  bars[leftIndex].style.backgroundColor = "yellow";
  bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightFact + "px";
  bars[rightIndex].style.backgroundColor = "yellow";
  bars[rightIndex].innerText = items[rightIndex];
  await sleep(speedFact);
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "red";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "#0D4C92";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#0D4C92";
  }
  return items;
}


// ------------------------------
// for mobile/ below 1000px user
// ------------------------------

// open & close Menu
let menu = document.querySelector(".mobile_menu");
menu.addEventListener("click", function(){
  let attri = document.querySelector(".nav_bar");
  attri.classList.toggle("show");
  menu.classList.toggle("mobile_back");
});

// alert massage for below 1000px user
let size = window.matchMedia("(max-width: 1000px)");
checkSize(size);
size.addListener(checkSize);

function checkSize(x){
  if(x.matches){
    alert("Bellow 1024px numeric-visibility does not work! Preferable device pc/laptop.");
  }
}
