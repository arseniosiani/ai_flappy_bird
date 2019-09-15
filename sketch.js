let population = 500
let pipes = []
let birds = []
let passed_pipes = 0
let curr_generation = 1

function setup() {
  createCanvas(800, 600);
  pipes.push(new Pipe(width))

  for (let i = 0; i < population; i++) {
    birds.push(new Bird())
  }
}

function reset() {
  pipes = [new Pipe(width)]
  bird = new Bird()
}

function new_generation() {
  console.log("new generation")
  curr_generation++

  let tot_score = 0
  for (i = 0; i < birds.length; i++) {
    tot_score += birds[i].score
  }
  for (i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / tot_score
  }

  let new_pop = []
  for (i = 0; i <population; i++) {
    new_pop[i] = pickOne()
  }
  
  passed_pipes = 0
  birds = new_pop
  pipes = [new Pipe(width)]
}

function draw() {
  background(255);

  for (let bird of birds) {
    if (!bird.alive)
      continue
    let tough = bird.think(pipes)
    if (tough[0] > tough[1]) {
      bird.up()
    }
    bird.move()
    bird.show()
    if (bird.y == height) {
      bird.die()
    }
  }

  let all_died = true
  for (let bird of birds) {
    if (bird.alive)
      all_died = false
  }

  if (all_died) {
    new_generation()
  }


  for (let pipe of pipes) {
    pipe.move()
    pipe.show()
    for (let bird of birds) {
      if (!bird.alive)
        continue
      if (pipe.touch(bird)) {
        bird.die()
      }
    }
  }


  if (pipes[0].x == width * 0.25) {
    pipes.push(new Pipe(width))
    passed_pipes++
  }

  for (let i = 0; i < pipes.length; i++) {
    if (pipes[i].offscreen())
      pipes.splice(i, 1)
  }
  
  text("population: "+birds.filter(b=> b.alive).length, 10,10)
  text("done pipes: "+passed_pipes, 10,20)
  text("generation: "+curr_generation, 10,30)
}


function pickOne() {
  let champ = birds[0]
  for(let bird of birds) {
    if(champ.fitness < bird.fitness){
      champ = bird
    }
  }

  let bird = new Bird(champ.brain.copy())
  bird.brain.mutate((a) => {
    return a + randomGaussian(0, 0.1)
  })
  return bird
}