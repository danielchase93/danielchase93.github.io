var guy;
var ball = [];

function newGame() {
    guy = new component(20, 20, "black", 50, 190);
    myMap.start();
}



var myMap = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frame = 0;
        this.interval = setInterval(updateMap, 10);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}



function component(w, h, color, x, y, type) {
    this.type = type;
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.speedX = 2;
    this.speedY = 0;
    this.update = function () {
        ctx = myMap.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.hitSides();
    }
    this.newPos2 = function () {
        if (i >=25) {
            this.speedX = 4;
        }
        if (i >= 75) {
            this.speedX = 6;
        }
        if (i >= 150) {
            this.speedX = 8;
        }
        this.x -= this.speedX;
    }
    this.hitSides = function () {
        var ground = myMap.canvas.height - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        var rightWall = myMap.canvas.width - this.width;
        if (this.x > rightWall) {
            this.x = rightWall;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }
    this.doCrash = function (second) {
        var firstLeft = this.x;
        var firstRight = this.x + (this.width);
        var firstTop = this.y;
        var firstBottom = this.y + (this.height);
        var secondLeft = second.x;
        var secondRight = second.x + (second.width);
        var secondTop = second.y;
        var secondBottom = second.y + (second.height);
        var hit = true;
        if ((firstLeft > secondRight) || (firstRight < secondLeft) || (firstTop > secondBottom) || (firstBottom < secondTop)) {
            hit = false;
        }
        return hit;
    }
}



function updateMap() {
    for (i=0; i<ball.length; i++) {
        if (guy.doCrash(ball[i])) {
            guy.update();
            ball[i].update();
            myMap.stop();
            window.alert('You dodged ' + i + ' balls!')
            return;
        }
    }

    myMap.clear();
    myMap.frame += 1;



    if (i >= 0) {
        if (everyinterval(50)) {
            ball.push(new component(10, 10, "red", 810, Math.floor((Math.random() * 390) + 1)));
        }
    }
    if (i >= 25) {
        if (everyinterval(30)) {
            ball.push(new component(10, 10, "red", 810, Math.floor((Math.random() * 390) + 1)));
        }
    }
    if (i >= 75) {
        if (everyinterval(20)) {
            ball.push(new component(10, 10, "red", 810, Math.floor((Math.random() * 390) + 1)));
        }
    }
    if (i >= 150) {
        if (everyinterval(15)) {
            ball.push(new component(10, 10, "red", 810, Math.floor((Math.random() * 390) + 1)));
        }
    }



    for (i=0; i<ball.length; i++) {
        ball[i].newPos2();
        ball[i].update();
    }


    guy.newPos();
    guy.update();

}
function everyinterval(n) {
    if ((myMap.frame / n) % 1 == 0) {
        return true;
    }
    return false;
}



document.onkeydown = moveGuy;
function moveGuy(e) {
    if (e.keyCode == '38') {
        guy.y -= 25;
    }
    else if (e.keyCode == '40') {
        guy.y += 25;
    }
    else if (e.keyCode == '37') {
        guy.x -= 25;
    }
    else if (e.keyCode == '39') {
        guy.x += 25;
    }
}
