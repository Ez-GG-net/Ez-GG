console.log = function(log){
    document.getElementById("console").innerHTML += log+'<br>'
}
console.error = function(log){
    document.getElementById("console").innerHTML += `<span style="color:red">${log}</span><br>`
}
window.addEventListener("error",(err)=>{
    console.error(err.message)
})
console.clear = function(log){
    document.getElementById("console").innerHTML = ''
}
document.getElementById("consoleInput").addEventListener("keydown", function(e){
    if (e.key == 'Enter') {
       run()
    }
})
document.getElementById("consoleSend").addEventListener("click", function(e){
    run()
})
function run() {
    try {
    new Function(document.getElementById("consoleInput").value)()
    
    } catch (error) {
        console.error(error)
    }
    document.getElementById("consoleInput").value = ''
}
console.log('Tensor Flow Adder Test')
console.log("Type loadModel() to get started...")

function waitForNextFrame() {
    return new Promise(resolve => requestAnimationFrame(resolve));
}

const populationSize = 100;
const generations = 10;
let networks = [];

function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [2], units: 20, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 })); //Output layer
    return model;
}

function mutateModel(model,rate=0.1) {
    const newModel = createModel();
    const newWeights = model.getWeights().map(weight => {
        return tf.tidy(() => {
            let values = weight.dataSync().slice();
            values = values.map(v => v + (Math.random() - 0.5) * rate);
            return tf.tensor(values, weight.shape);
        });
    });
    newModel.setWeights(newWeights);
    return newModel;
}

async function evaluateModel(model) {
    let error = 0;
  
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
            const prediction = model.predict(tf.tensor2d([[i, j]])).dataSync()[0];
           
            error += Math.abs(prediction - (i + j))/(5*5);
          
        }
    
}
await waitForNextFrame()
        //document.getElementById("console").innerHTML += networks.indexOf(model)
    return error;
}

async function evolve(generations,mutationRate=0.1) {
    console.log('Evolving '+generations+' Generations... Mutation Rate:'+mutationRate);
    for (let i = 0; i < populationSize; i++) {
        networks.push(createModel());
    }
    
    for (let gen = 0; gen < generations; gen++) {
      
        let scores = await Promise.all(networks.map(evaluateModel));
        let bestIndex = scores.indexOf(Math.min(...scores));
        let bestModel = networks[bestIndex];
        
        networks = [bestModel];
        for (let i = 1; i < populationSize; i++) {
            networks.push(mutateModel(bestModel,mutationRate));
        }
        console.log(`Generation ${gen + 1}, Avg Error: ${Math.min(...scores)} Avg Top Error ${Math.max(...scores)}`);
     //   document.getElementById("console").innerHTML += '<br>'
        await waitForNextFrame()
        await waitForNextFrame()
    }
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = 1//Math.floor(Math.random()) + 1
    testModel(a,b,c,networks[0]);
}

async function testModel(a=0,b=0,c=1,model=networks[0]) {
    c=1

    const prediction = model.predict(tf.tensor2d([[a, b]])).dataSync()[0];
    console.log(`
        Test Inputs: ${a} ${c==1?'+':'*'} ${b},
        Predicted Sum: ${prediction} (Rounded ${Math.round(prediction)}) (Actual: ${c==1?a + b:a*b})
        Error: ${Math.abs(prediction - (c==1?a + b:a*b))}`);
}
document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function(){
   // evolve(generations);
    },1000)
})
async function saveModel(model) {
    if (!model) {
        model = networks[0];
    }
    await model.save('localstorage://best-model');
    console.log("Model saved successfully!");
}
async function loadModel() {
    try {
        console.log("Loading saved model...");
        const model = await tf.loadLayersModel('localstorage://best-model');
        console.log("Model loaded successfully!");
        networks.push(model);
        return model;
    } catch (error) {
        console.error("Failed to load model:", error);
    }
        console.log("Creating new model... Run evolve(iterations) to train");
        return createModel(); // Return a new model if loading fails
}