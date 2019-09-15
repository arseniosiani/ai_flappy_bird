class Bird {
  constructor(brain) {
    this.y = height / 2
    this.x = width * 0.15
    this.velocity = 0
    this.alive = true
    this.score = 0
    if(brain) 
      this.brain = brain
    else
      this.brain = new NeuralNetwork(5,8,2)
  }

  die() {
    this.alive = false
  }
  
  think(pipes) {
    
    if(pipes[0])
    pipes[0].next = false
    if(pipes[1])
    pipes[1].next = false
    let cosest = pipes[0]
    if(cosest.x+cosest.w < this.x)
      cosest = pipes[1]
    
    cosest.next = true
    
    let input = []
    input[0] = this.y / height
    input[1] = this.velocity /100
    input[2] = (cosest.x+cosest.w) / width
    input[3] = (cosest.h-cosest.gap) / height 
    input[4] = (cosest.h+cosest.gap)/ height
    
    //console.log(input)
    return this.brain.predict(input)
  }
  
  
  up() {
    if(this.velocity >0)
      this.velocity = -5
  }

  move() {
    if(this.alive) {
      this.velocity += 0.20
      this.y += this.velocity
      this.score++
    }
  }

  show() {
    if(!this.alive)
      return
      
    fill(140)
    circle(this.x, this.y, 30)
    if (this.y > height) {
      this.y = height
      this.velocity = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.velocity = 0
    }

  }
}