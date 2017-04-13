var guy;


function newGame() {
    guy = new component(20, 20, "black", 50, 190);
    ball1 = new component(10, 10, "red", 1000, 200);
    ball2 = new component(10, 10, "red", 1100, 125);
    ball3 = new component(10, 10, "red", 1400, 225);
    myMap.start();
}



var myMap = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
    this.speedX = 0;
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
        this.speedX = 2;
        this.x -= this.speedX;
    }
    this.hitSides = function () {
        var ground = myMap.canvas.height - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
        var roof = 0;
        if (this.y < roof) {
            this.y = roof;
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
    if ((guy.doCrash(ball1)) || (guy.doCrash(ball2)) || (guy.doCrash(ball3))) {
        myMap.stop();
    } else {
        myMap.clear();
        guy.newPos();
        guy.update();
        ball1.newPos2();
        ball1.update();
        ball2.newPos2();
        ball2.update();
        ball3.newPos2();
        ball3.update();
    }
}



document.onkeydown = moveGuy;
function moveGuy(e) {
    if (e.keyCode == '38') {
        guy.y -= 10;
    }
    else if (e.keyCode == '40') {
        guy.y += 10;
    }
    else if (e.keyCode == '37') {
        guy.x -= 10;
    }
    else if (e.keyCode == '39') {
        guy.x += 10;
    }
}

