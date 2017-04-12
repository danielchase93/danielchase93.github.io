var bird;
var tubes = [];


function newGame() {
    bird = new component(30, 12, "black", 80, 100);
    tube1 = new component(20, 75, "green", 600, 0);
    tube2 = new component(20, 100, "green", 600, 150);
    tube3 = new component(20, 170, "green", 800, 0);
    tube4 = new component(20, 5, "green", 800, 245);
    tube5 = new component(20, 75, "green", 1000, 0);
    tube6 = new component(20, 100, "green", 1000, 150);
    tube7 = new component(20, 25, "green", 1200, 0);
    tube8 = new component(20, 150, "green", 1200, 100);
    tube9 = new component(20, 100, "green", 1400, 0);
    tube10 = new component(20, 75, "green", 1400, 175);
    tube11 = new component(20, 150, "green", 1600, 0);
    tube12 = new component(20, 25, "green", 1600, 225);
    myMap.start();
}



var myMap = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 550;
        this.canvas.height = 250;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
        if (this.gSpeed < 3.5) {
            this.gSpeed += this.g;
        }
        this.x += this.speedX;
        this.y += this.speedY + this.gSpeed;
        this.hitGround();
        this.hitRoof();
    }
    this.newPos2 = function() {
        this.speedX = 1.5;
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
    if ((bird.doCrash(tube1)) || (bird.doCrash(tube2)) || (bird.doCrash(tube3)) || (bird.doCrash(tube4)) || (bird.doCrash(tube5)) || (bird.doCrash(tube6)) || (bird.doCrash(tube7)) || (bird.doCrash(tube8)) || (bird.doCrash(tube9)) || (bird.doCrash(tube10)) || (bird.doCrash(tube11)) || (bird.doCrash(tube12))) {
        myMap.stop();
    }
    else {
        myMap.clear();
        bird.newPos();
        bird.update();
        tube1.newPos2();
        tube1.update();
        tube2.newPos2();
        tube2.update();
        tube3.newPos2();
        tube3.update();
        tube4.newPos2();
        tube4.update();
        tube5.newPos2();
        tube5.update();
        tube6.newPos2();
        tube6.update();
        tube7.newPos2();
        tube7.update();
        tube8.newPos2();
        tube8.update();
        tube9.newPos2();
        tube9.update();
        tube10.newPos2();
        tube10.update();
        tube11.newPos2();
        tube11.update();
        tube12.newPos2();
        tube12.update();
    }


}



function flap() {
    if (bird.gSpeed > -2) {
        bird.gSpeed -= 3.8;
    }
    else {
        bird.gSpeed -= .1;
    }
}

