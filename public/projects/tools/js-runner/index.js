

setTimeout(() => {
    const codeValue = document.querySelector('.code-input')
  
    const ColorCode = ()=>{
     
        let coloredCoded = '';
        for (let i =0; i < codeValue.value.split('').length; i++) {
            if (i === codeValue.selectionStart - 1) {
                coloredCoded +=   codeValue.value.split('')[i]+`${typeLine}`
            } else {
            coloredCoded += codeValue.value.split('')[i]
            }
        }
       
        setTimeout(() => {
       
        let ionput = coloredCoded
       .replaceAll('<', '&lt;').
        replaceAll('>', '&gt;').
        replaceAll(':', '<output style="color:white">!</output>')
      
       
      


       let input = '';

        let texted = false;
        for (let i =0; i < ionput.split('').length; i++) {
            if (!texted) {
            if (
            ionput.split('')[i] == "'"
            ) {
              
                    texted = true;
                input += `<output style="color:orange">${ionput.split('')[i]}</output>`
                
            } else {
               input += ionput.split('')[i]
            }
        } else {
            if (
                ionput.split('')[i] == "'"
                ) {
                    texted = false;
                    input +=  `<output style="color:orange">${ionput.split('')[i]}</output>`
           
        } else {
        input +=  `<output style="color:orange">${ionput.split('')[i]}</output>`
        }
       
    }
    //console.log(ionput)
        }
        
        setTimeout(() => {
       
       


        const coloredCode = 
            input
            .replaceAll('\n', '<br>	')
            
            .replaceAll('+', '<output style="color:white">+</output>')
           .replaceAll('-', '<output style="color:white">-</output>')
            .replaceAll('!', '<output style="color:white">!</output>')
            //.replaceAll('=', '<output style="color:white">&equals;</output>') 

            .replaceAll('if', '<output style="color:magenta"> if </output>').
            replaceAll('else', '<output style="color:magenta"> else </output>').

            replaceAll('var', '<output style="color:	deepskyblue"> var </output>').
            replaceAll('let', '<output style="color:	deepskyblue"> let </output>').
            replaceAll('const', '<output style="color:	deepskyblue"> const </output>').
       
         replaceAll('{', '<output style="color:	royalblue">{</output>').
        replaceAll('}', '<output style="color:	royalblue">}</output>').
        replaceAll('(', '<output style="color:	royalblue">(</output>').
        replaceAll(')', '<output style="color:	royalblue">)</output>').
        replaceAll('[', '<output style="color:	royalblue">[</output>').
        replaceAll(']', '<output style="color:	royalblue">]</output>').

        replaceAll('false ', '<output style="color:	deepskyblue">false </output>').
        replaceAll('true ', '<output style="color:	deepskyblue">true </output>').
        replaceAll('false<output style="color:	royalblue">)</output>', '<output style="color:	deepskyblue">false<output style="color:	royalblue">)</output></output>').
        replaceAll('true<output style="color:	royalblue">)</output>', '<output style="color:	deepskyblue">true<output style="color:	royalblue">)</output></output>')
       
        .replaceAll('console', '<output style="color:	lightblue">console</output>')
      

       

           
                document.
                querySelector('.code').
                innerHTML =
                 `<font style="margin: 0; color: rgb(20,255,20)">
                 ${coloredCode}
                 </font>
               
              
        
                `
            }, 10);
      
        

        setTimeout(() => {
            ColorCode()
        }, 10);
    }, 10);
    }
    let typing = true;
    let typeLine = ' ';
    const TypeLine = ()=>{
        if (typing) {
        if (typeLine == '|') {
            typeLine =' '
        } else {
            typeLine ='|'
        }
    } else {
        typeLine = ' '
    }
        setTimeout(() => {
            TypeLine()
        }, 500);
    }
    setTimeout(() => {
        TypeLine()
    }, 100);
        requestAnimationFrame(ColorCode)
    
        codeValue.addEventListener('keydown', function(e) {
            if (e.key == 'Tab') {
              e.preventDefault();
             
              var start = this.selectionStart;
              var end = this.selectionEnd;
          
              // set textarea value to: text before caret + tab + text after caret
              this.value = this.value.substring(0, start) +
                "\t" + this.value.substring(end);
          
              // put caret at right position again
              this.selectionStart =
                this.selectionEnd = start + 1;
            }

            
            })
            let recievingInput = false;
            let running = false;
    document.querySelector('.run').addEventListener('click', ()=>{
        const inputDisplay = ()=>{
            const input = document.querySelector('.JSinputReciever')
            document.getElementById('inputrec').innerHTML = input.value;
            setTimeout(() => {
                inputDisplay()
            }, 1);
        }
        const askInput = (prompt) =>{

            recievingInput = true;
            document.querySelector('.output').innerHTML = document.querySelector('.output').innerHTML.replaceAll('▮', ' ') + "> " + prompt + `${(recievingInput == true ? '▮' : '')}<br><output id="inputrec"></output>`;
            const input = document.createElement('input');
            input.setAttribute('class', 'JSinputReciever')
            console.log('inp')
            document.body.appendChild(input)
            inputDisplay()
        }
       
        const consoleO = document.querySelector('.output')

        if (!running) {
            consoleO.innerHTML = '> &#x25AE;';
        }
setTimeout(() => {
    
    if (!running) {
        running = true;
       
        consoleO.innerHTML = '> C:\\Users\\Current User> npm run project&#x25AE; <br>'
    
        setTimeout(() => {
            
            consoleO.innerHTML = '> C:\\Users\\Current User> npm run project <br> > Running...&#x25AE;'
            setTimeout(() => {
                consoleO.innerHTML = '> C:\\Users\\Current User> npm run project <br> > Running... <br> > &#x25AE;<br>'
            }, 200);
            
        }
        , 600);
    
     
        setTimeout(() => {
           
        
        const run = new Function(`
        const console = (function(oldCons){

            return {
            log: (i)=>{
            document.querySelector('.output').innerHTML = document.querySelector('.output').innerHTML.replaceAll('▮', ' ') + "> " + i + '${(recievingInput == true ? '▮' : '')}<br>';
        },
        clear: (i)=>{
            document.querySelector('.output').innerHTML = ''
        },
        error: (er)=>{
            document.querySelector('.output').innerHTML = document.querySelector('.output').innerHTML.replaceAll('▮', ' ') + '<output style="color: red;  background-color: black">'+ "> " + er + '${(recievingInput == true ? '▮' : '')}</output><br>';
        },
        warn: (w)=>{
            document.querySelector('.output').innerHTML = document.querySelector('.output').innerHTML.replaceAll('▮', ' ') + '<output style="color: orange; background-color: black">'+ "> ⚠️ " + w + '${(recievingInput == true ? '▮' : '')}</output><br>';
        },
        askInput: (prompt)=>{
           
            const inputDisplay = ()=>{
                const input = document.querySelector('.JSinputReciever')
                document.getElementById('inputrec').innerHTML = input.value;
                setTimeout(() => {
                    inputDisplay()
                }, 1);
            }
            const blinkerThing = ()=>{
                setTimeout(()=>{
                    
                },600)
            }
            const askInput = (prompt) =>{
    
               ${()=>{recievingInput = true;}}
                document.querySelector('.output').innerHTML = document.querySelector('.output').innerHTML.replaceAll('▮', ' ') + "> " + prompt + '${(recievingInput == true ? '▮' : '')}<br>> <output id="inputrec"></output>';
                const input = document.createElement('input');
                input.setAttribute('class', 'JSinputReciever')
               
                document.body.appendChild(input)
                inputDisplay()
            }
            askInput(prompt)
        },
        info: (t)=>{
            oldCons.log(t)
        },
        assert: (ifs, t) =>{
            const condition = new Function('cond', 'return (cond)')
            if (!condition(ifs)) {
                console.error('Assertion failed: ' + t)
            }
        }
    }
    }(window.console))
   
        try {
        ${codeValue.value}
      
        } 
        catch (error) {
            console.error('Uncaught' + error)
        }
      
        `)

        run()
        console.log('running')

    }, 1000);
    }
    setTimeout(() => {
        running = false;
    }, 1000);
}, 1000);
    
    })
   
}, 2);




