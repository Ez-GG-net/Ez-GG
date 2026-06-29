$("#export").onclick = ()=>{
    navigator.clipboard.writeText(JSON.stringify(elementsArray))
   $("#export").innerHTML = 'Elements Copied'
   setTimeout(()=>{
    $("#export").innerHTML = 'Export To Clipboard'
   },1000)

}