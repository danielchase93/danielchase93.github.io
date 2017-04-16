var bird;
var tube = [];

function startGame() {
    bird = new component(40, 18, "black", 80, 200);
    myMap.start();
}
function newGame() {
    location.reload();
}



var myMap = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frame = 0;
        this.interval = setInterval(updateMap, 10);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
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
    this.g = .06;
    this.gSpeed = 0;
    this.update = function() {
        ctx = myMap.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gSpeed += this.g;
        this.x += this.speedX;
        this.y += this.speedY + this.gSpeed;
        this.hitGround();
        this.hitRoof();
    }
    this.newPos2 = function() {
        this.speedX = 2;
        this.x -= this.speedX;
    }
    this.hitGround = function() {
        var ground = myMap.canvas.height - this.height;
        if (this.y > ground) {
            this.y = ground;
            this.gSpeed = 0;
        }
    }
    this.hitRoof = function() {
        var roof = 0;
        if (this.y < roof) {
            this.y = roof;
            this.gSpeed = 0;
        }
    }
    this.doCrash = function(second) {
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
    for (i=0; i<tube.length; i++) {
        if (bird.doCrash(tube[i])) {
            bird.update();
            tube[i].update();
            myMap.stop();
            window.alert('You passed ' + i/2 + ' tubes!')
            return;
        }
    }

    myMap.clear();
    myMap.frame += 1;


    if (i >= 100) {
        if (everyinterval(125)) {
            var tubeH = Math.floor((Math.random()*270)+25);
            tube.push(new component(20, tubeH, "green", 820, 0));
            tube.push(new component(20, 400-tubeH-80, "green", 820, tubeH+80));
        }
    }
    else if (i >= 50 && i <= 99) {
        if (everyinterval(125)) {
            var tubeH = Math.floor((Math.random()*250)+25);
            tube.push(new component(20, tubeH, "green", 820, 0));
            tube.push(new component(20, 400-tubeH-100, "green", 820, tubeH+100));
        }
    }
    else {
        if (everyinterval(125)) {
            var tubeH = Math.floor((Math.random()*230)+25);
            tube.push(new component(20, tubeH, "green", 820, 0));
            tube.push(new component(20, 400-tubeH-120, "green", 820, tubeH+120));
        }
    }



    for (i=0; i<tube.length; i++) {
        tube[i].newPos2();
        tube[i].update();
    }


    bird.newPos();
    bird.update();

}
function everyinterval(n) {
    if ((myMap.frame / n) % 1 == 0) {
        return true;
    }
    return false;
}



document.onkeydown = now;
function now(e) {
    if (e.keyCode == '32') {
        flap();
    }
}
function flap() {
    if (bird.gSpeed > 0){
        bird.gSpeed = 0;
        bird.gSpeed -= 2.5;
    }
    else {
        bird.gSpeed = 0;
        bird.gSpeed -= 3;
    }
}

