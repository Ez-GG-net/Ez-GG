window.addEventListener('keydown',(e)=>{
    const key = e.key
    if (key === 'q') {
        if ((player.placingTower !== null || canplacehere)) {
            if (player.placingTower == 1) player.money += 300
            if (player.placingTower == 2) player.money += 1500
            if (player.placingTower == 3) player.money += 500
            if (player.placingTower == 4) player.money += 600
            if (player.placingTower == 5) player.money += 850
            player.placingTower = null
            
        }
        if (player.selectedTower !== null) {
            const sellrate = 75
            player.money += Math.floor(towers[player.selectedTower].moneyspent*(sellrate/100))

            towers.splice(player.selectedTower, 1)
            player.selectedTower = null
            document.querySelector(".upgrades").style.display = "none";
        }
    }

    if (key == 'g') {
        if (player.selectedTower !== null) {
       
            if (towers[player.selectedTower].ability) {
            document.querySelector('.ability-icon').click()
            }
        }
    }


    if (key == "1") buyItem(1)
    if (key == "2") buyItem(2)
    if (key == "3") buyItem(3)
    if (key == "4") buyItem(4)
    if (key == "5") buyItem(5)
    if (key == "6") buyItem(6)
    
    
    
    if (key == "e") {
        if (player.selectedTower !== null) {
        document.querySelectorAll(".upgrades .upgrade")[0].click()
        }
    }
    if (key == "r") {
        if (player.selectedTower !== null) {
            console.log(   document.querySelectorAll(".upgrades .upgrade"))
        document.querySelectorAll(".upgrades .upgrade")[1].click()
        }
    }
})