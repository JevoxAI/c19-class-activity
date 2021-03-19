var tower,towerImg
var door,doorImg,doorGroup
var climber,climberImg,climberGroup
var ghost,ghostImg
var inv,invGroup
var PLAY=1
var END=0
var GameState=PLAY 

function preload(){
towerImg=loadImage("tower.png")
doorImg=loadImage("door.png")
climberImg=loadImage("climber.png")
ghostImg=loadImage("ghost-standing.png")
}

function setup(){

createCanvas(600,600)
tower=createSprite(300,300,10,10)
tower.addImage(towerImg)
tower.velocityY=1

ghost=createSprite(200,200,10,10)
ghost.addImage(ghostImg)
ghost.scale=0.5

invGroup=createGroup()
doorGroup=createGroup()
climberGroup=createGroup()
}

function draw(){
background("black")
if(GameState===PLAY){
if(tower.y>600){
tower.y=300
} 

if(keyDown("left_Arrow")){
ghost.x=ghost.x-1
}
if(keyDown("right_Arrow")){
ghost.x=ghost.x+1
}
if(keyDown("Space")){
ghost.velocityY=-10
 
}

ghost.velocityY=ghost.velocityY+1    


if(climberGroup.isTouching(ghost)){

ghost.velocityY=0

}

if(invGroup.isTouching(ghost)||ghost.y>600){

ghost.destroy()
GameState=END


}



spawnDoors()  
drawSprites()

}
if(GameState===END){
fill("yellow")
textFont("redressed")
textSize(30)
text("GAME OVER",230,200)

}
}

function spawnDoors(){

if(frameCount%250===0){

door=createSprite(100,-50,10,10)
door.addImage(doorImg)
door.velocityY=1
door.x=Math.round(random(120,400))
door.lifetime=600
doorGroup.add(door)

console.log("door:"+door.depth)

climber=createSprite(100,10,10,10)
climber.addImage(climberImg)
climber.velocityY=1
climber.x=door.x
climber.lifetime=600
climberGroup.add(climber)

console.log("climber:"+climber.depth)

ghost.depth=door.depth+1
inv=createSprite(100,15,climber.width,2)
inv.velocityY=1
inv.x=door.x
inv.lifetime=600
invGroup.add(inv)



}

}

  
