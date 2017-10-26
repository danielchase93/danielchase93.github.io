var guy;
var guy2 = [];
var gspeed;
var g2speed = [];
var bullet = [];
var bullet2 = [];
var ammo = 63;
var reload;
var rocket = [];
var rocket2 = [];
var roc = 3;
var wall = [];


function startGame() {
    for (i=0; i<12; i++) {
        wall[i] = new component(10, 15, "blue", 200, (i*15)+75, 0, 0, 15);
    }
    for (i=12; i<24; i++) {
        wall[i] = new component(15, 10, "blue", (i*15)+100, 280, 0, 0, 15);
    }
    for (i=24; i<36; i++) {
        wall[i] = new component(15, 10, "blue", (i*15)-80, 270, 0, 0, 15);
    }
    for (i=36; i<48; i++) {
        wall[i] = new component(10, 15, "blue", 190, (i*15)-465, 0, 0, 15);
    }
    for (i=48; i<56; i++) {
        wall[i] = new component(10, 15, "blue", 700, (i*15)-565, 0, 0, 15);
    }
    for (i=56; i<64; i++) {
        wall[i] = new component(10, 15, "blue", 350, (i*15)-765, 0, 0, 15);
    }
    for (i=64; i<72; i++) {
        wall[i] = new component(10, 15, "blue", 300, (i*15)-965, 0, 0, 15);
    }
    for (i=72; i<80; i++) {
        wall[i] = new component(10, 15, "blue", 450, (i*15)-795, 0, 0, 15);
    }
    for (i=80; i<88; i++) {
        wall[i] = new component(15, 10, "blue", (i*15)-800, 100, 0, 0, 15);
    }
    for (i=88; i<96; i++) {
        wall[i] = new component(15, 10, "blue", (i*15)-765, 325, 0, 0, 15);
    }
    for (i=96; i<104; i++) {
        wall[i] = new component(15, 10, "blue", (i*15)-1365, 325, 0, 0, 15);
    }
    for (i=104; i<112; i++) {
        wall[i] = new component(15, 10, "blue", (i*15)-1365, 200, 0, 0, 15);
    }
    guy = new component(12, 12, "black", 50, 190, 0, 0, 3);
    guy2[0] = new component(12, 12, "black", 725, 50, 0, 0, 3);
    guy2[1] = new component(12, 12, "black", 725, 190, 0, 0, 3);
    guy2[2] = new component(12, 12, "black", 725, 350, 0, 0, 3);
    guy2[3] = new component(12, 12, "black", 725, 120, 0, 0, 3);
    guy2[4] = new component(12, 12, "black", 725, 250, 0, 0, 3);
    guy2[5] = new component(12, 12, "black", 725, 300, 0, 0, 3);
    for (z=0; z<guy2.length; z++) {
        g2speed[z] = 10 + (z * 5);
    }
    myMap.start();
}
function newGame() {
    location.reload();
}


var myMap = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.clear();
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



function component(w, h, color, x, y, mx, my, health, type) {
    this.type = type;
    this.width = w;
    this.height = h;
    this.color = color;
    this.x = x;
    this.y = y;
    this.mx = mx;
    this.my = my;
    this.sx = x;
    this.sy = y;
    this.health = health;
    this.update = function () {
        myMap.context.fillStyle = this.color;
        myMap.context.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos3 = function (bs) {
        var slope = (this.my - this.sy) / (this.mx - this.sx);
        var bspeed = bs;
        if (this.x < 900 && this.x > -100 && this.y < 500 && this.y > -100) {
            if (this.my-this.sy > 0 && this.mx-this.sx > 0) {
                if (slope > 1) {
                    this.y += bspeed;
                    this.x += bspeed / slope;
                } else {
                    this.x += bspeed;
                    this.y += bspeed * slope;
                }
            } else if (this.my-this.sy > 0 && this.mx-this.sx < 0) {
                if (slope < -1) {
                    this.y += bspeed;
                    this.x += bspeed / slope;
                } else {
                    this.x -= bspeed;
                    this.y -= bspeed * slope;
                }
            } else if (this.my-this.sy < 0 && this.mx-this.sx > 0) {
                if (slope < -1) {
                    this.y -= bspeed;
                    this.x -= bspeed / slope;
                } else {
                    this.x += bspeed;
                    this.y += bspeed * slope;
                }
            } else if (this.my-this.sy < 0 && this.mx-this.sx < 0) {
                if (slope > 1) {
                    this.y -= bspeed;
                    this.x -= bspeed / slope;
                } else {
                    this.x -= bspeed;
                    this.y -= bspeed * slope;
                }
            }
            if (this.x % 33 == 0 && (this.x > this.sx+250 || this.x < this.sx-250)) {
                this.y += (Math.random() * 120) - 60;
            }
            if (this.y % 33 == 0 && (this.y > this.sy+250 || this.y < this.sy-250)) {
                this.x += (Math.random() * 120) - 60;
            }
        }
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
    this.doCrash2 = function (second) {
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
        } else {
            gspeed = 0;
        }
        return hit;
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
        } else {
            this.health -= 1;
            second.health -= 1;
            if (guy.health <= 1) {
                guy.color = "lightgray";
            } else if (guy.health <= 2) {
                guy.color = "gray";
            }
            for (i=0; i<guy2.length; i++) {
                if (guy2[i].health <= 1) {
                    guy2[i].color = "lightgray";
                } else if (guy2[i].health <= 2) {
                    guy2[i].color = "gray";
                }
                if (guy.health <= 0) {
                    myMap.stop();
                    window.alert('Game Over');
                } else if (guy2[i].health <= 0) {
                    if (guy2.length < 2 && guy2[i].health <= 0) {
                        myMap.stop();
                        window.alert('Game Over');
                    } else {
                        guy2.splice(i, 1);
                    }
                } else {
                    if (this.health <= 0) {
                        this.y = 1500;
                        this.speedX = 0;
                        this.speedY = 0;
                    }
                    if (second.health <= 0) {
                        second.y = 1000;
                        this.speedX = 0;
                        this.speedY = 0;
                    }
                }
            }
        }
        return hit;
    }
}



function updateMap() {
    myMap.clear();
    myMap.frame += 1;



    for (j=0; j<bullet.length; j++) {
        for (i=0; i<guy2.length; i++) {
            guy2[i].doCrash(bullet[j]);
        }
        for (k=0; k<wall.length; k++) {
            bullet[j].doCrash(wall[k]);
        }
        bullet[j].newPos3(8);
        bullet[j].update();
    }
    for (m=0; m<bullet2.length; m++) {
        guy.doCrash(bullet2[m]);
        for (k=0; k<wall.length; k++) {
            bullet2[m].doCrash(wall[k]);
        }
        for (i=0; i<guy2.length; i++) {
            bullet2[m].newPos3(8 / guy2.length);
        }
        bullet2[m].update();
    }
    if (bullet2.length > 60) {
        bullet2.shift();
    }
    for (l=0; l<rocket.length; l++) {
        for (i=0; i<guy2.length; i++) {
            if (guy2[i].doCrash(rocket[l])) {
                rocket[l].x -= 30;
                rocket[l].y -= 30;
                rocket[l].width = 75;
                rocket[l].height = 75;
                guy2[i].health = 0;
            }
        }
        for (k=0; k<wall.length; k++) {
            if (rocket[l].doCrash(wall[k])) {
                rocket[l].x -= 3;
                rocket[l].y -= 3;
                rocket[l].width = 75;
                rocket[l].height = 75;
                wall[k].health -= 15;
            }
        }
        for (m=0; m<bullet2.length; m++) {
            if (rocket[l].doCrash(bullet2[m])) {
                rocket[l].x -= 30;
                rocket[l].y -= 30;
                rocket[l].width = 75;
                rocket[l].height = 75;
                bullet2[m].health = 0;
            }
        }
        if (rocket[l].width > 8) {
            rocket[l].width = 75;
            rocket[l].height = 75;
            if (myMap.frame % 2 == 0) {
                rocket[l].health -= 1;
            }
        } else {
            rocket[l].newPos3(4);
        }
        if (rocket[l].health <= 0) {
            rocket[l].y = 1800;
        }
        rocket[l].update();
    }
    for (n=0; n<rocket2.length; n++) {
        if (guy.doCrash(rocket2[n])) {
            rocket2[n].x -= 30;
            rocket2[n].y -= 30;
            rocket2[n].width = 75;
            rocket2[n].height = 75;
            guy.health = 0;
        }
        for (k=0; k<wall.length; k++) {
            if (rocket2[n].doCrash(wall[k])) {
                rocket2[n].x -= 3;
                rocket2[n].y -= 3;
                rocket2[n].width = 75;
                rocket2[n].height = 75;
                wall[k].health -= 15;
            }
        }
        for (j=0; j<bullet.length; j++) {
            if (rocket2[n].doCrash(bullet[j])) {
                rocket2[n].x -= 30;
                rocket2[n].y -= 30;
                rocket2[n].width = 75;
                rocket2[n].height = 75;
                bullet[j].health = 0;
            }
        }
        if (rocket2[n].width > 8) {
            rocket2[n].width = 75;
            rocket2[n].height = 75;
            if (myMap.frame % 2 == 0) {
                rocket2[n].health -= 1;
            }
        } else {
            for (i=0; i<guy2.length; i++) {
                rocket2[n].newPos3(4 / guy2.length);
            }
        }
        if (rocket2[n].health <= 0) {
            rocket2[n].y = 1800;
        }
        rocket2[n].update();
    }
    document.getElementById('rockets').innerHTML = "Rockets: " + roc;
    for (k=0; k<wall.length; k++) {
        if (wall[k].health <= 3) {
            wall[k].color = "#b6dbf9";
        } else if (wall[k].health <=7) {
            wall[k].color = "#73adf4";
        } else if (wall[k].health <= 11) {
            wall[k].color = "#4292f4";
        }
        wall[k].update();
    }
    guy.hitSides();
    guy.update();
    for (i=0; i<guy2.length; i++) {
        guy2[i].hitSides();
        guy2[i].update();
    }



    if (reload != null) {
        if ((myMap.frame - reload) % 257 == 0) {
            bullet.push(new component(5, 5, "green", guy.x, 700, 0, 700, 0));
            reload = null;
            document.getElementById('reload').innerHTML = " ";
        } else {
            document.getElementById('reload').innerHTML = "Reloading... (Don't Shoot When Reloading.)";
        }
    }
    if (bullet.length < 16) {
        ammo = (15 - bullet.length) + "/45";
    } else if (bullet.length < 32) {
        ammo = (31 - bullet.length) + "/30";
    } else if (bullet.length < 48) {
        ammo = (47 - bullet.length) + "/15";
    } else if (bullet.length < 64) {
        ammo = (63 - bullet.length) + "/0";
    }
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;




    for (i=0; i<guy2.length; i++) {
        if (rocket2.length < (guy2.length*2)) {
            if ((myMap.frame / Math.floor((Math.random()*1000)+200)) % 1 == 0) {
                rocket2.push(new component(8, 8, "orange", guy2[i].x+1, guy2[i].y+1, (Math.random()*200)+(guy.x-100), (Math.random()*200)+(guy.y-100), 15));
            }
        }
        if ((myMap.frame / Math.floor((Math.random()*500)+1)) % 1 == 0) {
            bullet2.push(new component(5, 5, "red", guy2[i].x+3, guy2[i].y+3, (Math.random()*250)+(guy.x-125), (Math.random()*250)+(guy.y-125), 1));
        } else if ((myMap.frame / Math.floor((Math.random()*500)+1)) % 1 == 0) {
            bullet2.push(new component(5, 5, "red", guy2[i].x+3, guy2[i].y+3, (Math.random()*20)+(guy.x-5), (Math.random()*20)+(guy.y-5), 1));
        }
        if ((myMap.frame / Math.floor((Math.random()*500)+500)) % 1 == 0) {
            g2speed[i] = (Math.random()*35)+5;
        }
        if ((myMap.frame / Math.floor((Math.random()*200)+1)) % 1 == 0) {
            guy2[i].x += (Math.random()*g2speed[i]) - (g2speed[i] / 2);
            guy2[i].y += (Math.random()*g2speed[i]) - (g2speed[i] / 2);
        } else if ((myMap.frame / Math.floor((Math.random()*80)+1)) % 1 == 0) {
            if (guy.x > guy2[i].x) {
                for (k=0; k<wall.length; k++) {
                    if (guy2[i].doCrash2(wall[k])) {
                        guy2[i].x = wall[k].x-guy2[i].width-15;
                        break;
                    }
                }
                guy2[i].x +=  (Math.random()*g2speed[i]) - (g2speed[i] / 3);
            } else {
                for (k=0; k<wall.length; k++) {
                    if (guy2[i].doCrash2(wall[k])) {
                        guy2[i].x = wall[k].x+wall[k].width+15;
                        break;
                    }
                }
                guy2[i].x -= (Math.random()*g2speed[i]) - (g2speed[i] / 3);
            }
            if (guy.y > guy2[i].y) {
                for (k=0; k<wall.length; k++) {
                    if (guy2[i].doCrash2(wall[k])) {
                        guy2[i].y = wall[k].y-guy2[i].height-15;
                        break;
                    }
                }
                guy2[i].y += (Math.random()*g2speed[i]) - (g2speed[i] / 2.5);
            } else {
                for (k=0; k<wall.length; k++) {
                    if (guy2[i].doCrash2(wall[k])) {
                        guy2[i].y = wall[k].y+wall[k].height+15;
                        break;
                    }
                }
                guy2[i].y -= (Math.random()*g2speed[i]) - (g2speed[i] / 2.5);
            }
        }
    }


    gspeed = 2;
    if (keyState[87]) {
        for (k=0; k<wall.length; k++) {
            if (guy.doCrash2(wall[k])) {
                guy.y = wall[k].y+wall[k].height+15;
                break;
            }
        }
        guy.y -= gspeed;
    }
    if (keyState[83]) {
        for (k=0; k<wall.length; k++) {
            if (guy.doCrash2(wall[k])) {
                guy.y = wall[k].y-guy.height-15;
                break;
            }
        }
        guy.y += gspeed;
    }
    if (keyState[65]) {
        for (k=0; k<wall.length; k++) {
            if (guy.doCrash2(wall[k])) {
                guy.x = wall[k].x+wall[k].width+15;
                break;
            }
        }
        guy.x -= gspeed;
    }
    if (keyState[68]) {
        for (k=0; k<wall.length; k++) {
            if (guy.doCrash2(wall[k])) {
                guy.x = wall[k].x-guy.width-15;
                break;
            }
        }
        guy.x += gspeed;
    }

}



var keyState = {};
window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
},true);
var rx;
var ry;
document.onmousemove = function(e){
    rx = e.pageX;
    ry = e.pageY;
}
document.onkeydown = launch;
function launch(e) {
    if (e.keyCode == '69') {
        if (rocket.length < 3) {
            rocket.push(new component(8, 8, "orange", guy.x+1, guy.y+1, rx, ry, 15));
            roc -= 1;
        }
    }
}
document.onmousedown = shoot;
function shoot(e) {
    var mx = e.clientX;
    var my = e.clientY;
    if (bullet.length == 15 || bullet.length == 31 || bullet.length == 47) {
        reload = myMap.frame;
    } else if (bullet.length < 63) {
        bullet.push(new component(5, 5, "green", guy.x+3, guy.y+3, mx, my, 1));
    }
}









