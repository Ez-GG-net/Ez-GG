var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
const updateWindowSize = () => {
  ctx.canvas.width = document.body.offsetHeight + 800 / 2;
  ctx.canvas.height = document.body.offsetHeight;
};
updateWindowSize();

const mouse = {
  x: 0,
  y: 0,
  down: false,
};


c.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX - document.querySelector('.canvasouter').offsetLeft;
  mouse.y = e.clientY;


});
c.addEventListener("mousedown", (e) => {
  mouse.down = true;

  checkIfClickingOnBlock(mouse.x, mouse.y);

});
c.addEventListener("mouseup", (e) => {
  mouse.down = false;


});
let selectingblock = false;
const waitUntilMouseUp = (Do) => {
    if (!mouse.down) {
    Do()
    } else {
        setTimeout(() => {
            waitUntilMouseUp(Do)
        }, 100)
    }
  
}
let typingselected = false;
let typingselectedvalue = ''

const isNumeric = function (str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


const startGamePreview = () => {
  
}

const repeatUntil = (stuff, until, then, checkevery = 1)=>{
  if (until()) {
   then()
  } else {
    stuff()
  
  setTimeout(() => {
    repeatUntil(stuff, until, then, checkevery)
  }, checkevery);
}
}
const showPartsHighlightedSlashSelected = (x, y, w = 50)=>{

     const input = document.querySelector('.input')
     const previewer = document.querySelector('.previewtext')
     previewer.style.display = 'block'
    
     const offsetX = document.querySelector('.canvasouter').offsetLeft+2
     const offsetY = -9

     previewer.style.left = `${x+offsetX}px`
     previewer.style.top = `${y+offsetY}px`
     previewer.style.maxWidth = `${w}px`

     input.selectionStart == 0 && input.selectionEnd == input.value.length;
    const inputsplit = input.value.split('')
    for (let i = 0; i < inputsplit.length; i++) {
      if (i >= input.selectionStart && 
        i < input.selectionEnd) {
    inputsplit[i] = `<span class="highlight">${inputsplit[i]}</span>`
        }
    }

     previewer.innerHTML = inputsplit.join('')
 
       
    


}
const doTypingInblockIdk = (blockNumb, x, y, w, sc=0)=>{
 
  typingselected = true;
  document.querySelector('.input').value = blocks[blockNumb].sc[sc]
  typingselectedvalue =   document.querySelector('.input').value 

  setTimeout(() => {
    //????????WHY
    mouse.down = false;
    blocks[blockNumb].sc[sc] = ''

    document.querySelector('.input').select()
   // console.log('is tpyi')
  }, 1);
  

  repeatUntil(()=>{
    showPartsHighlightedSlashSelected(x, y, w)
   // ? console.log(document.querySelector('.input').value, typingselectedvalue, blockNumb)
  
  },()=>!typingselected
,()=>{
  blocks[blockNumb].sc[sc] = typingselectedvalue
  document.querySelector('.previewtext').style.display = 'none'
})
}


const checkIfClickingOnBlock = (x, y) => {
    for (let i = 0; i < blocks.length; i++) {
      if (
        !selectedblock
        && (
        x > blocks[i].x &&
        x < blocks[i].x + blocks[i].w &&
        y > blocks[i].y &&
        y < blocks[i].y + blocks[i].h
        )
      ) {
        if (blocks[i].t == 1) {
          const offsetX = 40
          const offsetY = 8
        if ( !selectedblock
          && (
          x > blocks[i].x+offsetX &&
          x < blocks[i].x+offsetX + 55 &&
          y > blocks[i].y+offsetY &&
          y < blocks[i].y+offsetY + 20
        )
        ){
          doTypingInblockIdk(i,  blocks[i].x+offsetX, blocks[i].y+offsetY, 55)
          return
        }
      } else {
        if (blocks[i].t == 2) {
          let offsetX = 40
          let offsetY = 8
          let offsetX1 = 90
          let offsetY1 = 8
        
        if ( !selectedblock
          && (
          x > blocks[i].x+offsetX &&
          x < blocks[i].x+offsetX + 20 &&
          y > blocks[i].y+offsetY &&
          y < blocks[i].y+offsetY + 20
        )
        ){
          doTypingInblockIdk(i,  blocks[i].x+offsetX, blocks[i].y+offsetY, 55, 0)
          return
        } else  
    
        if ( !selectedblock
          && (
          x > blocks[i].x+offsetX1 &&
          x < blocks[i].x+offsetX1 + 20 &&
          y > blocks[i].y+offsetY1 &&
          y < blocks[i].y+offsetY1 + 20
        )
        ){
          doTypingInblockIdk(i,  blocks[i].x+offsetX1, blocks[i].y+offsetY1, 55, 1)
          return
        }
      }
       else if (blocks[i].t == 3) {
        const offsetX = 42
      const offsetY = 6
     
      
      if ( !selectedblock
        && (
        x > blocks[i].x+offsetX &&
        x < blocks[i].x+offsetX + 24 &&
        y > blocks[i].y+offsetY &&
        y < blocks[i].y+offsetY + 22
      )
      ){
        doTypingInblockIdk(i,  blocks[i].x+offsetX+3, blocks[i].y+offsetY+2, 55, 0)
        return
      } 
    } else if (blocks[i].t == 4 || blocks[i].t == 5) {
      let offsetX = 40+13
      let offsetY = 8-1
      let offsetX1 = 90+13
      let offsetY1 = 8-1
    
    if ( !selectedblock
      && (
      x > blocks[i].x+offsetX &&
      x < blocks[i].x+offsetX + 20 &&
      y > blocks[i].y+offsetY &&
      y < blocks[i].y+offsetY + 20
    )
    ){
      doTypingInblockIdk(i,  blocks[i].x+offsetX+3, blocks[i].y+offsetY, 55, 0)
      return
    } else  

    if ( !selectedblock
      && (
      x > blocks[i].x+offsetX1 &&
      x < blocks[i].x+offsetX1 + 20 &&
      y > blocks[i].y+offsetY1 &&
      y < blocks[i].y+offsetY1 + 20
    )
    ){
      doTypingInblockIdk(i,  blocks[i].x+offsetX1, blocks[i].y+offsetY1, 55, 1)
      return
    }
  } else if (blocks[i].t == 6) {
    let offsetX1 = 90+13
    let offsetY1 = 8-1
    if ( !selectedblock
      && (
      x > blocks[i].x+offsetX1 &&
      x < blocks[i].x+offsetX1 + 20 &&
      y > blocks[i].y+offsetY1 &&
      y < blocks[i].y+offsetY1 + 20
    )
    ){
      doTypingInblockIdk(i,  blocks[i].x+offsetX1, blocks[i].y+offsetY1, 55, 0)
      return
    }
  } else if (blocks[i].t == 7) {
    let offsetX = 40+19
    let offsetY = 8-1

  
  if ( !selectedblock
    && (
    x > blocks[i].x+offsetX &&
    x < blocks[i].x+offsetX + 20 &&
    y > blocks[i].y+offsetY &&
    y < blocks[i].y+offsetY + 20
  )
  ){
    doTypingInblockIdk(i,  blocks[i].x+offsetX+3, blocks[i].y+offsetY, 55, 0)
    return
  }
  } else if (blocks[i].t == 8) {
    let offsetX = 40+19
    let offsetY = 8-1

  
  if ( !selectedblock
    && (
    x > blocks[i].x+offsetX &&
    x < blocks[i].x+offsetX + 20 &&
    y > blocks[i].y+offsetY &&
    y < blocks[i].y+offsetY + 20
  )
  ){
    doTypingInblockIdk(i,  blocks[i].x+offsetX+3, blocks[i].y+offsetY, 55, 0)
    return
  }
  } else if (blocks[i].t == 9) {
    const offsetX = 40
    const offsetY = 7
 
      const offsetX1 = 125
      const offsetY1 = 7
  
        const offsetX2 = 171
        const offsetY2 = 7
        if (!selectedblock
          && (
            x > blocks[i].x+offsetX &&
            x < blocks[i].x+offsetX + 20 &&
            y > blocks[i].y+offsetY &&
            y < blocks[i].y+offsetY + 20
          )
        ) {
          doTypingInblockIdk(i,  blocks[i].x+offsetX+3, blocks[i].y+offsetY, 55, 0)
          return
        } else         if (!selectedblock
          && (
            x > blocks[i].x+offsetX1 &&
            x < blocks[i].x+offsetX1 + 20 &&
            y > blocks[i].y+offsetY1 &&
            y < blocks[i].y+offsetY1 + 20
          )
        ) {
          doTypingInblockIdk(i,  blocks[i].x+offsetX1+3, blocks[i].y+offsetY1, 55, 1)
          return
        } else         if (!selectedblock
          && (
            x > blocks[i].x+offsetX2 &&
            x < blocks[i].x+offsetX2 + 20 &&
            y > blocks[i].y+offsetY2 &&
            y < blocks[i].y+offsetY2 + 20
          )
        ) {
          doTypingInblockIdk(i,  blocks[i].x+offsetX2+3, blocks[i].y+offsetY2, 55, 2)
          return
        }
  }
  }
      typingselected = false
      setTimeout(() => {
        
     
     
        console.log(i)
        const item = document.querySelectorAll(".item");
        selectedblock = item[blocks[i].n];
        selectedblockNumb =  blocks[i].n;
        selectingblock = true;
        selectedblockdata = blocks[i].sc

        // TODO: Add feature so middle click is copy
        blocks.splice(i, 1);
        dataSave.splice(i - 1, 1);

        // TODO: Add feature so it selects all blocks connected to the selected block
        waitUntilMouseUp(() => {
            selectingblock = false;
        })
      }, 1);
      }
      
    
    }
  };

const blocks = [];

const script = []

let loadingSaveData = false
window.onload = () => {
    
    if (localStorage.getItem("blockData")) {
        loadingSaveData = true;
       const encodedData = JSON.parse(localStorage.getItem("blockData"))
       const item = document.querySelectorAll(".item");
       for (let i = 0; i < encodedData.length; i++) {
        blocks[blocks.length] = configBlockPlace(
            item[encodedData[i].n],
            encodedData[i].x,
            encodedData[i].y,
            item[encodedData[i].n].offsetWidth,
            item[encodedData[i].n].offsetHeight,
            ['hello'],
            encodedData[i].n
        );
       }
       dataSave = encodedData;
       RC()
       setTimeout(() => {
        
        loadingSaveData = false;
       }, 20);
    }
    // ! Getting Input display
    document.querySelector('.input')
    .addEventListener('keydown', (e)=>{
      setTimeout(() => {
        if (typingselected) {
        typingselectedvalue = document.querySelector('.input').value

        if (e.key == 'Enter' || e.key == 'Escape') {
          typingselected = false
          console.log('stopping typing')
        }
        }
      }, 1);
    })
}
window.addEventListener('click', () => {
 // if (document.selection)
  const x = mouse.x
 const y = mouse.y;
  let isclickingonblock = false;
  for (let i = 0; i < blocks.length; i++) {
    if (
      !selectedblock
      && (
      x > blocks[i].x &&
      x < blocks[i].x + blocks[i].w &&
      y > blocks[i].y &&
      y < blocks[i].y + blocks[i].h
      )
    ) {
      if (blocks[i].t == 1) {
        const offsetX = 40
        const offsetY = 8
      if ( !selectedblock
        && (
        x > blocks[i].x+offsetX &&
        x < blocks[i].x+offsetX + 55 &&
        y > blocks[i].y+offsetY &&
        y < blocks[i].y+offsetY + 20
      )
      ){
      
        //do some cool double typing
        //*(its an intented bug)
        
        return
      }
    }
    
    isclickingonblock = true;
    }
  
  }
  if (!isclickingonblock) {
    typingselected = false;
  }
})

document.querySelector(".copybtn")
.addEventListener("click",()=>{
  //copy
  navigator.clipboard.writeText(`setTimeout(()=>{${DecodeScript().replace(linkChar0EnterHereYourElement0, '>Enter Your Element Here<')}\nwhenFlagClicked()\n},1)`).then(() => {
    document.querySelector(".copybtn").innerHTML = 'Copied!'
    setTimeout(() => {
      document.querySelector(".copybtn").innerHTML = 'Copy'
    }, 1000);
  });
  
})

let displaying = false;
let displayed = false;
document.querySelector(".jsbtn").
addEventListener('click',()=>{
    if (!displaying) {
      if (!displayed) {
        console.log('displaying')
        RC()
      }
      displayed = true;
        fetch('./ui/blockbtn.svg')
        .then((response) => response.text())
        .then((text) =>  document.querySelector(".jsbtn").innerHTML = text);
       
    displaying = true;
    } else {
      displayed = false;
      fetch('./ui/jsbtn.svg')
      .then((response) => response.text())
      .then((text) =>  document.querySelector(".jsbtn").innerHTML = text);
    displaying = false;
    }


    
})
const scriptDisplay = ()=>{
    if (!displaying) {
        document.querySelector('.javascript').style.display = 'none'
    } else {
      
        document.querySelector('.javascript').style.display = 'block'
    const display = document.querySelector('.jstext')


    const defaultColor = 'white'
    const keywordColor = '#d54e53' //red
    const numberColor = '#6CB4EE'
    const stringColor = 'orange'
    const varColor = '#6CB4EE'
    const commentColor = '#006b44'
const linkColor = 'lightblue'




    let formatted = DecodeScript()
    //string coloring
    let input = '';
    let ionput = formatted
    
    //.replaceAll('/', '/'.fontcolor(`${defaultColor}`))
    //.replaceAll('=', '='.fontcolor(`${defaultColor}`))

    .replaceAll('<', '&lt').
    replaceAll('>', '&gt')

  /*  .replaceAll('1', '1'.fontcolor(`${numberColor}`))  
    .replaceAll('2', '2'.fontcolor(`${numberColor}`)) 
    .replaceAll('3', '3'.fontcolor(`${numberColor}`))
    .replaceAll('4', '4'.fontcolor(`${numberColor}`))
    .replaceAll('5', '5'.fontcolor(`${numberColor}`))
    .replaceAll('6', '6'.fontcolor(`${numberColor}`))
    .replaceAll('7', '7'.fontcolor(`${numberColor}`))
    .replaceAll('8', '8'.fontcolor(`${numberColor}`))
    .replaceAll('9', '9'.fontcolor(`${numberColor}`))
    .replaceAll('0', '0'.fontcolor(`${numberColor}`))
    */
   //? NUMBERS BREAK
    // ? Both will break cause .fontcolor() has =, :, /
   // replaceAll(':', ':'.fontcolor(`${defaultColor}`))
   

    let texted = false;
    let textedc = false;
    for (let i =0; i < ionput.split('').length; i++) {
      //*comments

      if (!textedc) {
     
        if (
        ionput.split('')[i] == "/"
        ) {
        
                textedc = true;
            input += `${ionput.split('')[i]}`.fontcolor(`${commentColor}`)
            
        } else {
         //  input += ionput.split('')[i]
        }
    } else {
        if (
            ionput.split('')[i] == "\n"
            ) {
                textedc = false;
                input +=  `${ionput.split('')[i]}`.fontcolor(`${commentColor}`)
       
    } else {
    input +=  `${ionput.split('')[i]}`.fontcolor(`${commentColor}`)
    }
   
}
if (!textedc) {
//*text/string

        if (!texted) {
        if (
        ionput.split('')[i] == "'"
        ) {
          
                texted = true;
            input += `${ionput.split('')[i]}`.fontcolor(`${stringColor}`)
            
        } else {
           input += ionput.split('')[i]
        }
    } else {
        if (
            ionput.split('')[i] == "'"
            ) {
                texted = false;
                input +=  `${ionput.split('')[i]}`.fontcolor(`${stringColor}`)
       
    } else {
    input +=  `${ionput.split('')[i]}`.fontcolor(`${stringColor}`)
    }
  }
}
//console.log(ionput)
    }

    //end



      

    let todisplay = 
    input

    .replaceAll('+', '+'.fontcolor(`${defaultColor}`))
   
    .replaceAll('*', '*'.fontcolor(`${defaultColor}`))
    .replaceAll('~', '~'.fontcolor(`${defaultColor}`))
    .replaceAll('.', '.'.fontcolor(`${defaultColor}`))
    .replaceAll(',', ','.fontcolor(`${defaultColor}`))
    .replaceAll(';', ';'.fontcolor(`${defaultColor}`)) 
    .replaceAll(':', ':'.fontcolor(`${defaultColor}`))
    .replaceAll('{', '{'.fontcolor(`${defaultColor}`))
    .replaceAll('}', '}'.fontcolor(`${defaultColor}`))
    .replaceAll('(', '('.fontcolor(`${defaultColor}`))
    .replaceAll(')', ')'.fontcolor(`${defaultColor}`))
    .replaceAll('[', '['.fontcolor(`${defaultColor}`))
    .replaceAll(']', ']'.fontcolor(`${defaultColor}`))

    .replaceAll('this ', 'this '.fontcolor(`${keywordColor}`)) 
    .replaceAll('await ', 'await '.fontcolor(`${keywordColor}`)) 
    .replaceAll('async ', 'async '.fontcolor(`${keywordColor}`)) 
    .replaceAll('function ', 'function '.fontcolor(`${keywordColor}`)) 
    .replaceAll('while ', 'while '.fontcolor(`${keywordColor}`)) 
    .replaceAll('if ', 'if '.fontcolor(`${keywordColor}`)) 
    .replaceAll('else ', 'else '.fontcolor(`${keywordColor}`)) 
    .replaceAll('do ', 'do '.fontcolor(`${keywordColor}`))
    .replaceAll('return ','return '.fontcolor(`${keywordColor}`)) 
    
   
    .replaceAll('true', 'true'.fontcolor(`${numberColor}`))
    .replaceAll('false', 'false'.fontcolor(`${numberColor}`))
    .replaceAll('null', 'null'.fontcolor(`${numberColor}`))
    .replaceAll('let', 'let'.fontcolor(`${varColor}`))
    .replaceAll('const', 'const'.fontcolor(`${varColor}`))
    .replaceAll('var', 'var'.fontcolor(`${varColor}`))
    
    .replaceAll(linkChar0EnterHereYourElement0, `<a style='color: ${linkColor}'href='javascript:void(0)'>>Enter Your Element Here<</a>`)
   
    

    display.innerHTML = `<pre>${todisplay}</pre>`
    }
    
};
const antiBreakForSpaceSoHackersDontTryAndBreakTheLowestQualityGameOrGameEngine = '!'//'ȀȇƴƊǻǋͅɟƉɣȯǓǚ˱ƴǂƺɲȵȆǓȀǈʲǳɪɺ˵ǆʣɦȧ˞ȁȊƌʝǩʒƥɢɋƤƁɦɸǑ͟ȢǿǪȧʃˣɝȒǜɬʃ͡ƑƛͤˌƈʂǀǦƨɆƾȍʂ˟ʣʩʍȯƢǅ˱ʅƘȷǪȶǇƲʝƚǟɸƋɇƖǅǪǉƕʆȤɉƱͥɳˤɮƂƾʕƣȜʐɢʈǈɡʖˬȤɣȞʦ͘ʈǰɚʨǣɤƃɧ͖ɰʬƇȓɭ͉ˉɘͦɝȝʠƬȭƽƃȦɀˀɁ͑ɘʘǴͣɮƸȏʭȌƷǋƻǂʪ˓ǉ͒ʔǯʚƖ͋ʯˏǻƛȝǦɐȶʽɃ͙ǧƅǹɀǢǏɢȋƧȴʠƆɂƬǹͣɯʪȞȝ͂ʆǹƭʓȑ͍˂Ǣ͙ǩˌȰʚǜȉǏʉǳʑˏǓǮƸʧƟƺǻƼȵƨȒǃƲƛʗɼǮɢʆȑǢǾʇƂƦȏʤ˸̓ʌǟȷǆǄȸƫȋ͌ɚƁƧȠƿǾǹƤƭȯƍƈʀǴƌǖ˔Ƕȡ͇ƿɠǸȶǖ͢ʇǯʢȺǶʲɡʊǏƪȟȥǋɚƭƛͣǻƢǩʣƟͨɄɖɡǄƄȇƍȶǰʞɪȠ͛ƺƧɏȝɬǆͮǺȓɝƤͪƵʇɋͯǩʥƄʯɐɴƃɫǯʚǉƕʁƾƎǱ͜ɎƼ͝ɒʇȍƽƽȉǯȠǏʏǌʨȑȀȠͫʌȷʌͷȆʓǡ͘ʬʃʠɃǍʜƾȭƺǂȺɚʛƵʦȌȄǦʨƽƛɇǱƽǮɌƶǌɉʕʆɿȿƓȡʑʐƦƌǷǸʬƨʛʙǯǮƕɇȍȁȣ͎ɏǆʭƌƸʚʞɀǍȁƾʂǍɯʉʤ͜ƻ͑ɡɚǅǞƗɲƬʪƚȁɲʂǇȕǾƎʘǌȁǴɎǿɺ͌ȬȟʄʖʕƭʦƾƢ͏ƈǅƴƶǮʘƃʊʩʁƽɐǚȴȳʌʈǋ͝ƲƟǢʊʆʯȋȜʥƖƔƎɝɤʍǍƪʘɴɀʠǼƔ͍ǠʬʨʋƇȅʏʦƌƑȲǇƸʕƧǠʄǚʬʥɺʨɈʄǧʤǚƇǤƆʗʏƟǴʨƎʭƵȽʜƁǪȤƍʠȺƻʖǋʔǒƆȳǆǜɨȷǏƤɷȿƆʠȅʂƬǅʜȅʔȠʚƵƆʋǣʂʦƬʀƨʂȣǹȱƺʠȆǟȤǏʖƄƬƗȀǮȷƈɳƴʊǦɍʉɀƭƲǒʍǆǮʙʣǛǼʬȏƣʦƳƂǼƾƑǯƶǈʚƚʖƞȽʢǊȳʍƅƷɄɁɉǾʦƸɬʆʪɄʀȀƫȅʭǉƄȗƁʙǴȵƸʠɨʏǊƚǹƛǚȷǭʗʅȼȦʠǒƮƉʂȯǩȣɯƕǜʙƆȭƻǐƪʖʆƺǂʦʅƼȍƬʍƺȠǷʌƄȳʀȆƨȮƩɢƂȠƃǯƄʏǺƂʍƳȵȵǩǛʑʡǆƓǣɚƽƳʠǻʙʄǇʀʍȓʕǠǱƎȀʡȲʍȞƨʣȏʍȠƉʦƇɀʝʧǋȭƺȐʗǏƵʜƝǈɨʇǶȓǢƛȩƶǅʑǅƁǹʌƇƾȑȺɅʚɀƸʙȄƉɨƿʪǘʓǠʉƲʋǷʏʢǆɿƅɣǏƼƢƇʦʨʦƤʉǐʦʉȠȀʆƧʠƢƫʇǍȌɌʖʦƼƁɃɂʧǦȣǊƌɌƵƽʆʔȢǗʗʦƾʀʇƁƎʧʠǆʜƨƾʨǿǩʚƚƕʏʣʑƫƦȾʘƤɌǷʍȹǼǜɦȑʕʗƤɘƆʣƄǿȳƵʖǐȸǏʝȿʢƾȭɍƑʡǢʦƨƆʊɍȭǋȅʖƸƳʧǆʇʦʛƌʦʧǱɮƻǶǋǚʢǿǯȽƁʜǄƶȝʢƦʦʔǟƽɉƉɢʗȓʜǚʢƇǮʚƫǏƢȀƼʑƻȢʙƪɇʙ'
const linkChar0EnterHereYourElement0 = 'ǷƬǇʉƾɦʣƍǄǖʊǌƸɨƧǭʛƈȆȉǋƥƆɢʗʖƁȹʠȫƩʜƇɯǚʐƢɍƾʒʢǮȵƵƬǚʄȤƈȯƍɳʙʠȽǢƄʔʆƶƼƨɬȏǼƵʝǑƛǅʊƴǱʔʕɆȿǺʦƪƻƤƄʢʋɎȋʐʆǴƇǦƞǯɅƳƢǠƴʧƽǾʡʚȭʔƃɚʟƇƗȶƑƸƲʛǍȱʜʬƣƍʦǂɭȓƑʌ'
const DecodeScript = () => {
  let compiler = ''
    let result = []

    let foundmoving = false;
    let foundmovingrotate = false;
    let foundglideto = false;
    for (let i = 0; i < blocks.length; i++) {
      
      if (blocks[i].t == 2) {
        compiler += `var ${blocks[i].sc[0]};\n`
      }
      if (blocks[i].t == 3 || (blocks[i].t >= 5 && blocks[i].t <= 9) ) {
        if (!foundmoving) {
          foundmoving = true;
        compiler += `const element = ${linkChar0EnterHereYourElement0};\n`
        }
      }
      if (blocks[i].t == 3 ||
         blocks[i].t == 7 || blocks[i].t == 8  ) {
if (!foundmovingrotate) {
   foundmovingrotate = true;
   compiler += `const getCurrentRotation = ( el )=>{
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform") ||
         "fail...";
    if( tr !== "none") {
      var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];
      var scale = Math.sqrt(a*a + b*b);
      // arc sin, convert from radians to degrees, round
      var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else {
      var angle = 0;
    }
    return (angle < 0)? angle + 360 : angle;
  }\n`
      }
      }
      if (blocks[i].t == 9 ||
       false) {
        if (!foundglideto) {
          foundglideto = true;
          compiler += `const glideTo = (element, x, y, duration)=> {
            const startX = element.offsetLeft;
            const startY = element.offsetTop;
            const deltaX = x - startX;
            const deltaY = y - startY;
            const startTime = performance.now();
            const interval = 10; // Time in milliseconds between each frame
            const move = ()=> {
                const currentTime = performance.now();
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / (duration * 1000), 1);
                element.style.left = startX + deltaX * progress + 'px';
                element.style.top = 'calc(100vh - '+element.offsetHeight + 'px - ' + (startY + deltaY * progress) + 'px)';
                if (progress < 1) {
                    setTimeout(move, interval);
                }
            }
            setTimeout(move, interval);
        };\n`
        }
       }
    }

    for (let j = 0; j < script.length; j++) {
    let scLine = script[j].split('\n')
    for (let i = 0; i < scLine.length; i++) {
    let scData = scLine[i].split(antiBreakForSpaceSoHackersDontTryAndBreakTheLowestQualityGameOrGameEngine)
    if (!result[j]) result[j] = 'async function whenFlagClicked() {\n'
    if (scData[0] == 1) {
      result[j] += '\t'
        result[j] += `console.log('${JSON.parse(scData[1])[0]}');\n`
      
    } else  if (scData[0] == 2) {
      result[j] += '\t'
      result[j] += `${JSON.parse(scData[1])[0]} = ${isNumeric(JSON.parse(scData[1])[1])?JSON.parse(scData[1])[1]:`'${JSON.parse(scData[1])[1]}'`};\n`
     
  }  else  if (scData[0] == 3) {
    result[j] += '\t' 
    result[j] += `element.style.left = element.offsetLeft + ${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}'`} * Math.cos(getCurrentRotation(element) * Math.PI / 180) + 'px';
          element.style.top = element.offsetTop + ${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}'`} * Math.sin(getCurrentRotation(element) * Math.PI / 180) + 'px'; \n`
   
}else  if (scData[0] == 4) {
  result[j] += '\t' 
  result[j] += `${JSON.parse(scData[1])[0]} += ${isNumeric(JSON.parse(scData[1])[1])?JSON.parse(scData[1])[1]:`'${JSON.parse(scData[1])[1]}'`};\n`

}
else  if (scData[0] == 5) {
  result[j] += '\t'
  result[j] += `element.style.left = '${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}'`}px';
        element.style.top = 'calc(100vh - element.offsetHeight - ${isNumeric(JSON.parse(scData[1])[1])?JSON.parse(scData[1])[1]:`'${JSON.parse(scData[1])[1]}'`}px)';\n`
     
}
else  if (scData[0] == 6) {
  result[j] += '\t'
  result[j] += `element.style.transform = 'rotate(+${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}'`}deg)';`
}
else  if (scData[0] == 7) {
  result[j] += '\t'
  result[j] += `element.style.transform = 'rotate('+getCurrentRotation()+${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}'`}+'deg)';`
     
} else  if (scData[0] == 8) {
  result[j] += '\t'
  result[j] += `element.style.transform = 'rotate('+getCurrentRotation()-${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}'`}+'deg)';`
     
}
else  if (scData[0] == 9) {
  result[j] += '\t'
  result[j] += `await glideTo(element,${isNumeric(JSON.parse(scData[1])[1])?JSON.parse(scData[1])[1]:`'${JSON.parse(scData[1])[1]}'`},${isNumeric(JSON.parse(scData[1])[2])?JSON.parse(scData[1])[2]:`'${JSON.parse(scData[1])[2]}'`},${isNumeric(JSON.parse(scData[1])[0])?JSON.parse(scData[1])[0]:`'${JSON.parse(scData[1])[0]}`});\n`
     
}

    }
    result[j] = result[j] + '};'
   // console.log(result[j])
}

return `
//Ez Script GG Code

${compiler}
${result.join('\n')}
`
}
const RC = () => {
    createEncodedScript()
    DecodeScript()
}
const createEncodedScript = () => {
    script.length = 0
    //find start scripts
    let startscripts = []
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].t == 0) {
            
            startscripts[startscripts.length] = (blocks[i])
        }
    }
    //find script under start script
    for (let j = 0; j < startscripts.length; j++) {
        if (!script[j]) script[j] = ''
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].t !== 0) {
            if (blocks[i].connected == startscripts[j]) {
             
              
              // console.log('e')
                script[j] += `${blocks[i].t}${antiBreakForSpaceSoHackersDontTryAndBreakTheLowestQualityGameOrGameEngine}${JSON.stringify(blocks[i].sc)}\n`
               // console.log(`[${JSON.stringify(blocks[i].sc)}]`, blocks[i])
            } else {
            for (let h = 0; h < blocks.length; h++) {
                if (blocks[h].t !== 0) {
                if (blocks[i].connected == blocks[h]) {
                 
                    
                   //     if (blocks[h].connected == startscripts[j]) {
                        
                 //   console.log('f')
                    script[j] += `${blocks[i].t}${antiBreakForSpaceSoHackersDontTryAndBreakTheLowestQualityGameOrGameEngine}${JSON.stringify(blocks[i].sc)}\n`
                    //console.log(`[${blocks[i].sc}]`)
                }
           // }
            }
            }
        } 
    }
  //  console.log(blocks[i].connected, j, startscripts[j])
    }
}
setTimeout(() => {
 // console.log(script)
}, 100);


//localStorage.setItem('blockData', JSON.stringify(dataSave))
//console.log(dataSave)
}

const configBlockPlace = (b, x, y, w, h, sc, n) => {

 
    const location = document.location.href.replace('index.html', '')


    let ce = undefined;
    let type = undefined;
    if (b.src == location+'blocks/flagclick.png') {
        type = 0
    } else
    if (b.src == location+'blocks/log.png') {
        type = 1
    }else
    if (b.src == location+'blocks/var/set.svg') {
        type = 2
      
    }else
    if (b.src == location+'blocks/move.svg') {
        type = 3
      
    }
    else
    if (b.src == location+'blocks/var/change.svg') {
        type = 4
      
    }
    else
    if (b.src == location+'blocks/move/gotoXY.svg') {
        type = 5
      
    } else
    if (b.src == location+'blocks/move/pointdirection.svg') {
      type = 6
    
  } else  if (b.src == location+'blocks/move/turnCW.svg') {
    type = 7
  
}  else if (b.src == location+'blocks/move/turnCCW.svg') {
  type = 8

} else if (b.src == location+'blocks/move/glidetoXY.svg') {
  type = 9

}



    //config
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].t == 0) {
        if (blocks[i].y+blocks[i].h +h/2 > y && blocks[i].y+blocks[i].h-20 < y
            && blocks[i].x < x && blocks[i].x + blocks[i].w > x) {
                let calculateX = null;
                let calculateY = null;
                if (type !== 0) {
                 calculateY = blocks[i].y+blocks[i].h-11.5;
                 calculateX = blocks[i].x+9.5;
                } 
                let canpass = true
                for (let j = 0; j < blocks.length; j++) {
                    if (blocks[j].y == calculateY
                        && blocks[j].x == calculateX) {
                        canpass = false;
                    }
                }
                if (canpass) {
            y = calculateY;
            x = calculateX;
            ce = blocks[i];
         //   console.log('ce',ce)
                }
                
        }
        
      //  console.log(blocks[i].y+blocks[i].h +h/2 > y && blocks[i].y+blocks[i].h-20 < y
       //     && blocks[i].x < x && blocks[i].x + blocks[i].w > x, blocks[i])
    } else
    if (blocks[i].t !== 0) {
        if (blocks[i].y+blocks[i].h +h/2 > y && blocks[i].y+blocks[i].h-20 < y
            && blocks[i].x < x && blocks[i].x + blocks[i].w > x) {
                let calculateX = null;
                let calculateY = null;
                if (type !== 0) {
                 calculateY = blocks[i].y+blocks[i].h-7;
                 calculateX = blocks[i].x;
                }
                let canpass = true
                for (let j = 0; j < blocks.length; j++) {
                    if (blocks[j].y == calculateY
                        && blocks[j].x == calculateX) {
                        canpass = false;
                    }
                }
                if (canpass) {
            y = calculateY;
            x = calculateX;
            ce = blocks[i]
         //   console.log('ce',ce)
                }
                
        }
    }
    
        
    }
   //console.log({ b: b, x: x, y: y, w: w, h: h, t:type })
   
  return { b: b, x: x, y: y, w: w, h: h, t:type, connected:ce, sc:sc,n:n };


};
let selectedblock = null;
let selectedblockdata = null;
const renderBlockSelect = () => {
  
    if (selectedblock == null) return
    
  const block = selectedblock;
  ctx.drawImage(
    block,
    mouse.x - block.offsetWidth / 2,
    mouse.y - block.offsetHeight / 2,
    block.offsetWidth,
    block.offsetHeight


  );
  
  if ((mouse.down || loadingSaveData) && !selectingblock) {
    selectedblock = null
    dataSave[dataSave.length] = {
        n:selectedblockNumb,
        x: mouse.x - block.offsetWidth / 2,
        y: mouse.y - block.offsetHeight / 2,
        data:selectedblockdata
    }
    blocks[blocks.length] = configBlockPlace(
        block,
        mouse.x - block.offsetWidth / 2,
        mouse.y - block.offsetHeight / 2,
        block.offsetWidth,
        block.offsetHeight,
        selectedblockdata,
        selectedblockNumb
        );
   
  }


};

const renderBlocks = () => {

    for (let i = 0; i < blocks.length; i++) {
     
      const selectfont = 'Arial'

        ctx.drawImage(
          blocks[i].b,
          blocks[i].x,
          blocks[i].y,
          blocks[i].w,
          blocks[i].h
        );
        if (blocks[i].t == 1) {
          const offsetX = 41
          const offsetY = 23
          
          ctx.fillStyle = 'black'
          ctx.font = 'bold 0.8em Arial'
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        } else  if (blocks[i].t == 2) {
          let offsetX = 41
      let offsetY = 23
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 46
          }
          
          ctx.fillStyle = 'black'
          ctx.font =  `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
          offsetX = 91
          
          if (blocks[i].sc[1].split('').length == 1) {
            offsetX = 96
          }
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[1],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        } else if (blocks[i].t == 3) {
          const offsetX = 46
          const offsetY = 22
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        }else  if (blocks[i].t == 4) {
         
          let offsetX = 41+13
      let offsetY = 22
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 46+13
          }
          
          ctx.fillStyle = 'black'
          ctx.font =  `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
          offsetX = 91+13
          
          if (blocks[i].sc[1].split('').length == 1) {
            offsetX = 96+13
          }
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[1],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        } else if (blocks[i].t == 5) {
         
          let offsetX = 41+13
      let offsetY = 22
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 46+13
          }
          
          ctx.fillStyle = 'black'
          ctx.font =  `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
          offsetX = 91+13
          
          if (blocks[i].sc[1].split('').length == 1) {
            offsetX = 96+13
          }
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[1],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        } else if (blocks[i].t == 6) {
         
          let offsetX = 41+13
      let offsetY = 22
         
          offsetX = 91+13
          
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 96+13
          }
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        } else if (blocks[i].t == 7) {
          
          let offsetX = 41+19
      let offsetY = 22
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 46+19
          }
          
          ctx.fillStyle = 'black'
          ctx.font =  `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        
        } else if (blocks[i].t == 8) {
          
          let offsetX = 41+19
      let offsetY = 22
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 46+19
          }
          
          ctx.fillStyle = 'black'
          ctx.font =  `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        
        } else  if (blocks[i].t == 9) {
         
          let offsetX = 41
      let offsetY = 22
          if (blocks[i].sc[0].split('').length == 1) {
            offsetX = 46
          }
          
          ctx.fillStyle = 'black'
          ctx.font =  `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[0],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
          offsetX = 115+10
          
          if (blocks[i].sc[1].split('').length == 1) {
            offsetX = 121+10
          }
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[1],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
          offsetX = 156+17
          
          if (blocks[i].sc[2].split('').length == 1) {
            offsetX = 161+17
          }
          
          ctx.fillStyle = 'black'
          ctx.font = `bold 0.8em ${selectfont}`
        ctx.fillText(
          blocks[i].sc[2],
          blocks[i].x+offsetX,
          blocks[i].y+offsetY,)
        }
     
          
    }
};
let selectedblockNumb
let dataSave = [];
const detectObjClick = () => {
  const item = document.querySelectorAll(".item");
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener("click", () => {
      selectedblock = item[i];
      selectedblockNumb = i;
      if (item[i].classList.contains("sayB")) {
      selectedblockdata = ['hello']
      } else if (item[i].classList.contains("varset")) {
        selectedblockdata = ['x', '0']
  
        } else if (item[i].classList.contains("move")) {
          selectedblockdata = ['10']
        
          } 
          else if (item[i].classList.contains("varchange")) {
            selectedblockdata = ['x', '1']
          
            } 
            else if (item[i].classList.contains("gotoXY")) {
              selectedblockdata = ['0', '0']
            
              } 
              else if (item[i].classList.contains("pointdirection")) {
                selectedblockdata = ['90']
              
                }   else if (item[i].classList.contains("turnCW")) {
                  selectedblockdata = ['90']
                
                  }   else if (item[i].classList.contains("turnCCW")) {
                    selectedblockdata = ['90']
                  
                    } 
                    else if (item[i].classList.contains("glidetoXY")) {
                      selectedblockdata = ['1', '0', '0']
                    
                      } 
    });
  }


};
detectObjClick();
const render = () => {
  //config background
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "rgb(40,40,50)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //end
  renderBlocks()
  renderBlockSelect();
  scriptDisplay()

  setTimeout(() => {
    render();
  }, 1);
};
render();
