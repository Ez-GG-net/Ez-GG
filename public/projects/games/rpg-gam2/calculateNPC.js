const writeDelayed = (stuff, delay, color = `white`,question=false, n = 0) => {
    letter = stuff.split(``);
    if (delay == undefined) {
      delay = 40;
    }
    if (n <= 0) {
      document.getElementById("dialogueText").innerHTML = '';
      document.querySelector('.continue').style.opacity = 0;
    }


    document.getElementById(
      "dialogueText"
    ).innerHTML += `<output style="color: ${color}">${letter[n]}</output>`;

    let t = n + 1;
    if (letter[letter.length] == letter[t]) {
        setTimeout(() =>{
            if (!question) {
             document.querySelector('.continue').style.opacity = '1';
            } else {
                const inputs = [question.input1, question.input2]
                let selectedInput = null
                inputs.forEach(input=>{
                    const inputDiv = document.createElement('div')
                    inputDiv.textContent = input
                    inputDiv.classList.add('inputButton')
                    inputDiv.addEventListener('click',()=>{
                        selectedInput = input
                        document.querySelectorAll('.inputButton').forEach(button=>{
                            button.style.backgroundColor = '#666'
                        })
                        inputDiv.style.backgroundColor = 'green'
                        setTimeout(()=>{
                          
                        question.resolve(Array.from(document.querySelectorAll('.inputButton')).indexOf(inputDiv))

                        document.querySelectorAll('.inputButton').forEach(button=>{
                            button.remove()
                        })
                     
                        },500)
                    })
                    document.getElementById('dialogueBox').appendChild(inputDiv)
                })
            }
        },300)
      return (writing = false);
    }
    writing = true;
    if ([',','.',"?","!"].includes(letter[n])) {
        setTimeout(() => {
         writeDelayed(stuff, delay, color,question, t);
        }, 300);
    } else {
  
    setTimeout(() => {
     writeDelayed(stuff, delay, color,question, t);
    }, delay);
}
  }


function writeDialogue(text){
    return new Promise(function(resolve,reject){
   
      writeDelayed(text, 40);

      document.getElementById("dialogueBox").addEventListener('click',()=>{
        if (    document.querySelector('.continue').style.opacity == '1') {
            resolve()
        }
      })
    })
}
function writeInputs(question,input1, input2){
    return new Promise(function(resolve,reject){

        writeDelayed(question, 40,'white',{input1,input2,resolve},);

      
     
    })
}
async function talkNPC1(){
    //show the dialogue
    document.getElementById("dialogueBox").style.display = 'block'

    //write the dialogue
await writeDialogue('Hello travel, I have been expecting you')

//ask question
await writeInputs('Have you been expecting me?','Yes','No').then(async(res)=>{
    console.log(res)
    if (res == 0){
        await writeDialogue('You have been expecting me? Wow... I... uhhh...')
    } else {
        
    }
})
await writeDialogue('Find the Big Guy in this maze to win')

//hide the dialogue
document.getElementById("dialogueBox").style.display = 'none'
}
async function talkNPC4(){
    //show the dialogue
    document.getElementById("dialogueBox").style.display = 'block'

    //write the dialogue
await writeDialogue('You\'ve found me...')

//await writeDialogue('You\'ve grown quite a bit since I\'ve last seen you.')

//ask question
await writeInputs('How long did it take you to find me?','Not that long','A long time').then(async(res)=>{
    
    await writeDialogue('Interesting...')
    await writeDialogue('YOU WIN!!! Refresh the page to try again.')

})


//hide the dialogue
document.getElementById("dialogueBox").style.display = 'none'
}
async function talkNPCBlank(){
        document.getElementById("dialogueBox").style.display = 'block'
        document.querySelector('.continue').style.opacity = '0'
    writeDelayed('...',1500,)
    setTimeout(function(){
                  document.querySelector('.continue').style.opacity = '1'
         
    },1500*2)
    document.getElementById("dialogueBox").addEventListener('click',()=>{
        if (    document.querySelector('.continue').style.opacity == '1') {
              document.getElementById("dialogueBox").style.display = 'none'
               document.querySelector('.continue').style.opacity = '0'
        }
      })
}
//talkNPC1()


setTimeout(function(){
    
npcs[1].dialogue = talkNPC1
npcs[4].dialogue = talkNPC4
},1000)


let showInteractionNumb = false
document.addEventListener('keydown',function(e){
////console.log(showInteractionNumb)
    if (showInteractionNumb===false || document.getElementById("dialogueBox").style.display == 'block') return
    if (e.key == 'e'){
        document.querySelector('.npc-name').innerHTML = npcs[showInteractionNumb].npcname
        if (  npcs[showInteractionNumb].dialogue) {
        npcs[showInteractionNumb].dialogue()
        } else {
            talkNPCBlank()
        }
        console.log("dialogue", showInteractionNumb)
    }
})

//when player presses E


//when player collides with npc
function calculationNPC(){
    //check if player is close to an npc
    let showInteraction = false    

    npcs.forEach(function(npc,i){

    if (Math.hypot(
        (player.x) - npc.x,
        (player.y) - npc.y
    ) < (player.width+npc.width+20)) {
        if (   document.getElementById('dialogueBox').style.display == 'block') return
        //show button e
        document.getElementById('buttonE').style.display = 'block'
        document.getElementById('buttonE').style.left = `${npc.x+20-camera.x}px`
        document.getElementById('buttonE').style.top = `${npc.y-30-camera.y}px`
        showInteraction = i
        
    }
})

if (showInteraction === false) {
         document.getElementById('buttonE').style.display = 'none'
         showInteractionNumb = false
} else {
    showInteractionNumb = showInteraction
}
}