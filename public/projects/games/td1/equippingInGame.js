function updateEquippedItems() {
  const items = document.querySelectorAll('.shop .item');

    console.log( Array.from(items))
  Array.from(items).forEach((item, index)=>{

    if (playerdata.owned[index] === 1) {
      if (playerdata.equipped[index] === 1) {
        item.style.display = 'flex';
  
      } else {
        item.style.display = 'none'
      }
    } else {
        item.style.display = 'none'
    }
  })
}

const towername = ['1', '1', '1', '1', '1', '1','1','1','1']; // Example tower names


function updateHotbarPlayButton() {
  const items = document.querySelectorAll('.hotbar .item');
  let equippedCount = 0;
  window.playerdata.equipped.forEach((item, index) => {
 

    if (index < items.length) {
    items[index].querySelector(`#item${index+1}`).setAttribute('src', 'shop/empty.png')
    }
    
    if (window.playerdata.equipped[index] === 1) {
      equippedCount++;

      items[equippedCount-1].querySelector(`#item${equippedCount}`).setAttribute('src', `shop/tower${towername[index]}.png`)
     
    } else {
  

    }
  });
}
