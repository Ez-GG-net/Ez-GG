



//Sample data
let playerdata = {
    equipped: new Array(9).fill(0),
    owned: new Array(9).fill(0),
    balance: 10_000
}
window.playerdata = playerdata

function buyItem(item) {
    if (player.placingTower !== null) return

    if (towers.length >= _maxTowerPlacement) {
        alert(`Max placement limit (${_maxTowerPlacement})`)
        return
    }
    if (item == 5) {
    if (towers.filter(tower=>tower.type == 'spawner').length >= _maxSpawnerPlacement) {
        alert(`Max spawner tower limit (${_maxSpawnerPlacement})`)
        return
    }

}
    player.selectedTower = null
    document.querySelector('.upgrades').style.display = 'none'
    let canafford = false;
    if (item == 1){
        if (player.money >= 300) {
        player.money -= 300
        canafford = true
        }
       } else if (item == 2){
        if (player.money >= 1500) {
        player.money -= 1500
        canafford = true
        }
       } else if (item == 3){
        if (player.money >= 500) {
        player.money -= 500
        canafford = true
        }
       } else if (item == 4) {
        if (player.money >= 600) {
        player.money -= 600
        canafford = true
        }
       } else if (item == 5) {
        if (player.money >= 850) {
        player.money -= 850
        canafford = true
        }
       } else if (item == 6) {
        if (player.money >= 350) {
        player.money -= 350
        canafford = true
        }
       } else if (item == 7) {
        if (player.money >= 7500) {
        player.money -= 7500
        canafford = true
        }
       } else if (item == 8) {
        if (player.money >= 2000) {
        player.money -= 2000
        canafford = true
        }
       } else if (item == 9) {
        if (player.money >= 6200) {
        player.money -= 6200
        canafford = true
        }
       }


       if (!canafford) return
       console.log(item,canafford)
    player.placingTower = item
  
}