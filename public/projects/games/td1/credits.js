const creditsButton = document.querySelector('#credits')
const closecreditButton = document.querySelector('.closeCredits')
const creditsMenu  = document.querySelector('.creditsMenu')

creditsButton.addEventListener('click', () => {
    creditsMenu.style.display = 'block'
})

closecreditButton.addEventListener('click', () => {
    creditsMenu.style.display = 'none'
})