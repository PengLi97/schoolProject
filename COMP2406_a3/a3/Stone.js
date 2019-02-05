function Stone(x, y, c, cc){
  this.x = x;
  this.y = y;
  this.r = 10;
  this.rr = 5;
  this.vx = 0;
  this.vy = 0;
  this.c = c;
  this.cc = cc;
  this.setXY = function(xx, yy){
    this.x = xx;
    this.y = yy;
  }
  this.setVelocity = function (v){
    this.v = v;
  }
}


module.exports = Stone;
