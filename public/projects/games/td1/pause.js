
let mouseInsideTimeout

let playerMoneyLastWave;
let towersLastWave = [];
let playerHealthLastWave = 100;
let lastWave;

function unPause(){
  document.querySelector('.alertOverlay').style.opacity = 0;
  setTimeout(function() {
    document.querySelector('.alertOverlay').style.display = 'none';
    },300)

  CsetTimeout(()=>{
    if (lastWave == player.wave) {
    loadWave(player.wave-1)
    }
  },3000)

  CsetInterval(calculate, 1)
}
setTimeout(function(){
document.querySelector('#unpause').addEventListener('click',unPause)
},1)

document.addEventListener('visibilitychange', function(e) {
    if (!document.hidden) return
    if (waves.length > 0) {


        clearAllTimers()

        enemies.length = 0;
     
        towers = towersLastWave
        player.health = playerHealthLastWave


        if (towers.length <= 0) {
          document.querySelector(".upgrades").style.display = 'none'
          player.selectedTower = null
        }

        document.querySelector('.tipsMan').style.opacity = '0'
        document.querySelector('.tipsMan').style.display = 'none'
        document.querySelector('.waveBonus').style.opacity = '0'
       document.querySelector('.waveBonus').style.display = 'none'
      

    player.money = playerMoneyLastWave


        lastWave = player.wave

        document.querySelector('.alertOverlay').style.opacity = 1;
        setTimeout(function() {
        document.querySelector('.alertOverlay').style.display = 'flex';
        },300)

   
        
   
}
})
//document.addEventListener("mouseenter",()=>clearTimeout(mouseInsideTimeout))


const timers = []; // Array to store timeout/interval details

// Custom setTimeout
function CsetTimeout(callback, delay) {
  const start = Date.now();
  const id = setTimeout(callback, delay);
  
  timers.push({
    id,
    type: 'timeout',
    callback,
    delay,
    start,
    remaining: delay
  });

  return id;
}

// Custom clearTimeout
function CclearTimeout(id) {
  const index = timers.findIndex(timer => timer.id === id && timer.type === 'timeout');
  if (index > -1) {
    window.clearTimeout(id);
    timers.splice(index, 1);
  }
}

// Custom setInterval
function CsetInterval(callback, interval) {
  const start = Date.now();
  const id = window.setInterval(callback, interval);

  timers.push({
    id,
    type: 'interval',
    callback,
    interval,
    start
  });

  return id;
}

// Custom clearInterval
function CclearInterval(id) {
  const index = timers.findIndex(timer => timer.id === id && timer.type === 'interval');
  if (index > -1) {
    window.clearInterval(id);
    timers.splice(index, 1);
  }
}

// Pause all timers (timeouts and intervals)
function pauseAllTimers() {
  const now = Date.now();

  timers.forEach(timer => {
    if (timer.type === 'timeout') {
      window.clearTimeout(timer.id);
      timer.remaining -= now - timer.start; // Calculate remaining time
    } else if (timer.type === 'interval') {
      window.clearInterval(timer.id);
      timer.remaining = timer.interval - ((now - timer.start) % timer.interval); // Time until next call
    }
  });
}

// Resume all timers (timeouts and intervals)
function resumeAllTimers() {
  const now = Date.now();

  timers.forEach(timer => {
    if (timer.type === 'timeout') {
      timer.start = now;
      timer.id = setTimeout(timer.callback, timer.remaining);
    } else if (timer.type === 'interval') {
      timer.start = now;
      timer.id = window.setInterval(timer.callback, timer.interval);
    }
  });
}

// Clear all timers
function clearAllTimers() {
  timers.forEach(timer => {
    if (timer.type === 'timeout') {
    clearTimeout(timer.id);
    } else if (timer.type === 'interval') {
    clearInterval(timer.id);
    }
  });

  timers.length = 0; // Clear the array
}