

function totalCost(){

    var total = mortar*50 + cement *420 + steel *500 + ring * 30;

console.log(total);

}

function change(){

    
        var btn = document.getElementById("btn");
        btn.addEventListener('click', function handleClick() {
  btn.textContent = 'Added Sucessfully';
});
    
}

function change1(){

    
    var btn = document.getElementById("btn1");
    btn.addEventListener('click', function handleClick() {
btn.textContent = 'Added Sucessfully';
});

}
function change2(){

    
    var btn = document.getElementById("btn2");
    btn.addEventListener('click', function handleClick() {
btn.textContent = 'Added Sucessfully';
});

}
function change3(){

    
    var btn = document.getElementById("btn3");
    btn.addEventListener('click', function handleClick() {
btn.textContent = 'Added Sucessfully';
});

}

function verify(){

    console.log(13);
}
module.exports.change1=change1;