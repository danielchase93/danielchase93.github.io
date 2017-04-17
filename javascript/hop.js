window.onload=function() {


var y = 0;
var x = setInterval(display, 100);
function display() {
    parseFloat(x);
        if (document.getElementById('box7').style.color == "green") {
        clearInterval(x);
    }
    else {
        x++;
    }
    if (x == 10) {
        y++;
        x = 0;
    }
    document.getElementById('timer').innerHTML = y + "." + x;
}



var b1, b2, b3, b4, b5, b6, b7;
b1 = document.getElementById('box1');
    b1.innerHTML = Math.floor((Math.random()*7)+1);
b2 = document.getElementById('box2');
    b2.innerHTML = Math.floor((Math.random()*7)+1);
    while (b2.innerHTML == b1.innerHTML) {
        b2.innerHTML = Math.floor((Math.random()*7)+1);
    }
b3 = document.getElementById('box3');
    b3.innerHTML = Math.floor((Math.random()*7)+1);
    while (b3.innerHTML == b2.innerHTML || b3.innerHTML == b1.innerHTML) {
        b3.innerHTML = Math.floor((Math.random()*7)+1);
    }
b4 = document.getElementById('box4');
    b4.innerHTML = Math.floor((Math.random()*7)+1);
    while (b4.innerHTML == b3.innerHTML || b4.innerHTML == b2.innerHTML || b4.innerHTML == b1.innerHTML) {
        b4.innerHTML = Math.floor((Math.random()*7)+1);
    }
b5 = document.getElementById('box5');
    b5.innerHTML = Math.floor((Math.random()*7)+1);
    while (b5.innerHTML == b4.innerHTML || b5.innerHTML == b3.innerHTML || b5.innerHTML == b2.innerHTML || b5.innerHTML == b1.innerHTML) {
        b5.innerHTML = Math.floor((Math.random()*7)+1);
    }
b6 = document.getElementById('box6');
    b6.innerHTML = Math.floor((Math.random()*7)+1);
    while (b6.innerHTML == b5.innerHTML || b6.innerHTML == b4.innerHTML || b6.innerHTML == b3.innerHTML || b6.innerHTML == b2.innerHTML || b6.innerHTML == b1.innerHTML) {
        b6.innerHTML = Math.floor((Math.random()*7)+1);
    }
b7 = document.getElementById('box7');
    b7.innerHTML = Math.floor((Math.random()*7)+1);
    while (b7.innerHTML == b6.innerHTML || b7.innerHTML == b5.innerHTML || b7.innerHTML == b4.innerHTML || b7.innerHTML == b3.innerHTML || b7.innerHTML == b2.innerHTML || b7.innerHTML == b1.innerHTML) {
        b7.innerHTML = Math.floor((Math.random()*7)+1);
    }


b1.id = ('box'+b1.innerHTML);
b2.id = ('box'+b2.innerHTML);
b3.id = ('box'+b3.innerHTML);
b4.id = ('box'+b4.innerHTML);
b5.id = ('box'+b5.innerHTML);
b6.id = ('box'+b6.innerHTML);
b7.id = ('box'+b7.innerHTML);



document.getElementById('box1').addEventListener("click", click1);
document.getElementById('box2').addEventListener("click", click2);
document.getElementById('box3').addEventListener("click", click3);
document.getElementById('box4').addEventListener("click", click4);
document.getElementById('box5').addEventListener("click", click5);
document.getElementById('box6').addEventListener("click", click6);
document.getElementById('box7').addEventListener("click", click7);




function click1() {
    document.getElementById('box1').style.color = "green";
}
function click2() {
    if (document.getElementById('box1').style.color == "green") {
        document.getElementById('box2').style.color = "green";
    }
    else {
        document.getElementById('box2').style.color = "red";
        y += 1;
    }
}
function click3() {
    if (document.getElementById('box2').style.color == "green") {
        document.getElementById('box3').style.color = "green";
    }
    else {
        document.getElementById('box3').style.color = "red";
        y += 1;
    }
}
function click4() {
    if (document.getElementById('box3').style.color == "green") {
        document.getElementById('box4').style.color = "green";
    }
    else {
        document.getElementById('box4').style.color = "red";
        y += 1;
    }
}
function click5() {
    if (document.getElementById('box4').style.color == "green") {
        document.getElementById('box5').style.color = "green";
    }
    else {
        document.getElementById('box5').style.color = "red";
        y += 1;
    }
}
function click6() {
    if (document.getElementById('box5').style.color == "green") {
        document.getElementById('box6').style.color = "green";
    }
    else {
        document.getElementById('box6').style.color = "red";
        y += 1;
    }
}
function click7() {
    if (document.getElementById('box6').style.color == "green") {
        document.getElementById('box7').style.color = "green";
    }
    else {
        document.getElementById('box7').style.color = "red";
        y += 1;
    }
}


}

function newGame() {
    location.reload();
}

