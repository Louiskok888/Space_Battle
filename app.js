
const grid = document.querySelector('.grid')   //the big square base 
const resultsDisplay =document.querySelector('.results')  //the result to shows how many aliens killed
const scoresDisplay =document.querySelector('.scores')    //scores of the final result
// const startGameBtn = document.querySelector('#startGameBtn')  


// let difficultyCheck = false
let currentShooterIndex = 825   //cuurent position of the space battle ship
let width = 30   //the width of the big square base 
let direction = 1   //the moving direction for the alieninvaders,left and right
let invadersId 
let goingRight = true    //variable for alieninvaders moving direction
let aliensRemoved = []   //remove the alien from the square after hit by shooter 
let results = 0   //how many aliens got killed


for(let i = 0; i<900; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)   //create 900 divs inside the big square base

}
const squares = Array.from(document.querySelectorAll('.grid div'))   //make them into array form within the 900

const alienInvaders = []  //create an empty array, player can fill in the number of aliens according to the set level
  


//0 to 24 will create a row of 24 aliens, 25 to 29 will be empty to create a space for the aliens to move
function easy() {
    hide()   //hide the button after clicked
    alienInvaders.push(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54)
    invadersId = setInterval(moveInvaders, 500)   //activate the aliens function with the speed of 500 milisecond interval
    

}
function medium() {
    hide()
    alienInvaders.push(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,
        60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84 )
    invadersId = setInterval(moveInvaders, 300)
}

function hard() {
    hide()
    alienInvaders.push(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,
        60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,
        90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114)
    invadersId = setInterval(moveInvaders, 100)

}

function draw() {
    for(let i = 0; i<alienInvaders.length; i++) {
        if(!aliensRemoved.includes(i)) {
          squares[alienInvaders[i]].classList.add('invader')   //draw out the aliens at the top of the big square
        }
    }

}

function remove() {
    for(let i = 0; i<alienInvaders.length; i++) {              //to remove the aliens, the function of draw and remove is to create a movement for the aliens from left to right, vice versa
    squares[alienInvaders[i]].classList.remove('invader')
    }
}


squares[currentShooterIndex].classList.add('shooter')   //shooter class added

function moveShooter(e) {                                      //function for the shooter to move left and right by using if statement
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !==0) currentShooterIndex -=1
            break
        case 'ArrowRight':   
            if (currentShooterIndex % width < width -1) currentShooterIndex +=1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')     //add back the current shooter index to show the current position
}
document.addEventListener('keydown', moveShooter)   // press down the key to activate the moveshooter function 

function moveInvaders() { 
                                                            
    const leftEdge = alienInvaders[0] % width ===0   //function for the aliens to change to opposite direction and forward after the aliens reached the black grid              
    const rightEdge = alienInvaders[alienInvaders.length-1]% width === width - 1
    remove()                                                                       //remove the alien once it touches the edge

    if(rightEdge && goingRight) {
        for( let i =0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight) {
        for( let i =0; i<alienInvaders.length; i++) {
            alienInvaders[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    

    for (let i = 0; i<alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    
    draw()   //draw out the aliens at the opposite direction
    
if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {       //if the aliens touched the shooter, it stops the game and display game over
    
    clearInterval(invadersId)                                                      //stop the function
    resultsDisplay.innerHTML = 'GAME OVER'                                         //dislay game over
    scoresDisplay.innerHTML = 'Total scores : ' + results + ' points'              //display scores
    document.getElementById('totalScores').style.display="block"                   //return the display from none
    
   
    }

for (let i = 0; i < alienInvaders.length; i++) {                                   //when the aliens array index is more than the big square, it stops the game and display game over
    if (alienInvaders[i] > (squares.length)) {
    resultsDisplay.innerHTML = 'GAME OVER'  
    clearInterval(invadersId)                                                      //stop the function
    scoresDisplay.innerHTML = 'Total scores : ' + results + ' points'
    document.getElementById('totalScores').style.display="block"                   //return the display from none
    
                                                                              
    }
}
if (aliensRemoved.length === alienInvaders.length) {                          //when all the aliens been eliminated, it stops the game and display you win   
    resultsDisplay.innerHTML = 'YOU WIN !!'
    
    clearInterval(invadersId)                                                 //stop the game
    scoresDisplay.innerHTML = 'Total scores : ' + results + ' points'         //display result
}

}
// startGameBtn.addEventListener('click',(Event) => {

// invadersId = setInterval(moveInvaders, 500)                                           //set variable for invaders speed
//     })                                                                             //draw out the aliens at the opposite direction
function reset() {
    window.location.reload()   //reload the page when activated
    // alienInvaders.length = 0
    // document.getElementById('level1').style.display="block"
    // document.getElementById('level2').style.display="block"
    // document.getElementById('level3').style.display="block"
}

function hide() {
    document.getElementById('level1').style.display="none"        //hide the buttons when activated
    document.getElementById('level2').style.display="none"
    document.getElementById('level3').style.display="none"
    // document.getElementById('results').style.display="none"
    document.getElementById('totalScores').style.display="none"   //hide the scores when activated
    
}


function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {                                      //use remove and add to create movement towards the aliens
        squares[currentLaserIndex].classList.remove('laser')    //to remove current laser
        currentLaserIndex -=width 
        console.log(currentLaserIndex)                              //move up one step 
        squares[currentLaserIndex].classList.add('laser')       //add back the laser

        if (squares[currentLaserIndex].classList.contains('invader')){     //if current laser hit the index contain invader
            squares[currentLaserIndex].classList.remove('laser')           //remove laser
            squares[currentLaserIndex].classList.remove('invader')         //remove invader
            squares[currentLaserIndex].classList.add('boom')               //add the boom effect

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 500)   //set time interval to remove the boom effect
            clearInterval(laserId)                                                      //clear the laser bullets

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)   //alien will be removed when the laser hit the alien
            aliensRemoved.push(alienRemoved)                                //alien will be pushed into the aliensRemoved array
            results+=10                                                     //show the result on browser
            resultsDisplay.innerHTML = 'Points ' + ': ' + results 
            
            console.log(aliensRemoved)                                      //console out aliensRemoved array
        }

    }


    switch(e.key) {   //assign a key on the keyboard for a function
        case 's':
           laserId = setInterval(moveLaser,50)   //set a laserId variable to the laser bullets with 50miliseconds interval and moveLaser function
      }       
} 

document.addEventListener('keydown',shoot)   //pressdown to activate the shoot function
