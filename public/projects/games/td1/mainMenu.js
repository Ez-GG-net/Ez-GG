const mainMenu = document.querySelector('.mainMenu');

const playButton = document.querySelector('.play-button');
const shopButton = document.querySelector('.shop-button');

const inGameContainer = document.querySelector('.container');

const backMainMenu = document.querySelector('.shop-back-button');


playButton.addEventListener('click', () => {
  playerdata = window.playerdata

  mainMenu.style.display = 'none';
  inGameContainer.style.display = 'block';
  backMainMenu.style.display = 'block';

  // Call the function to update the equipped items
  updateHotbarPlayButton()
});

shopButton.addEventListener('click', () => {
  
  mainMenu.style.display = 'none';
  inGameContainer.style.display = 'none';
  document.querySelector('.shop-container').style.display = 'block';
  backMainMenu.style.display = 'block';
});

backMainMenu.addEventListener('click', () => {
  
  document.querySelector('.shop-container').style.display = 'none';
  mainMenu.style.display = 'flex';
  inGameContainer.style.display = 'none';
  backMainMenu.style.display = 'none';

});