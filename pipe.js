class Pipe {
  constructor(x) {
    this.x = x
    this.gap = 80
    this.w = 80
    this.h = random(this.gap, height-this.gap)
  }
  
  move() {
    this.x = this.x -3  
  }
   
  offscreen() {
    if(this.x+this.w <0)
      return true
    return false
  }
  
  touch(bird) {
    if(bird.x+20 >= this.x && bird.x+20 <= this.x+this.w){
      if(bird.y-20 <= this.h-this.gap || bird.y+20 >= this.h+this.gap) {
        return true
      }
    }
    return false
  }
  
  
  show() {
    fill(10)
    if(this.next)
      fill(200)
    rect(this.x, 0, this.w, this.h-this.gap)
    rect(this.x, this.h+(this.gap), this.w, height-(this.h+this.gap) )
  }
}