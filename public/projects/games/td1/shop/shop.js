window.addEventListener('load', () => {
setTimeout(() => {
    const items =[
        document.getElementById('item1'),
        document.getElementById('item2'),
        document.getElementById('item3'),
        document.getElementById('item4'),
        document.getElementById('item5'),
        document.getElementById('item6'),

    ]

    const costElements = document.querySelectorAll('.cost');
const shopItem = document.querySelectorAll('.shop-item')

const towername = ['1', '1', '1', '1', '1', '1','1','1','1']; // Example tower names
let equippedCount = 0;
for (let i = 0; i < window.parent.playerdata.equipped.length; i++) {
    if (i < 6) {
    items[i].setAttribute('src','empty.png')
    items[i].style.backgroundColor = 'rgb(27, 27, 27)'
    }
    if (window.parent.playerdata.equipped[i] == 0) {
  
    } else {
  
               

        items[equippedCount].setAttribute('src', `tower${towername[i]}.png`)
        items[equippedCount].style.backgroundColor = 'rgb(42, 42, 42)'


        equippedCount++;
    }
    }




function renderData(){


document.querySelector('#balance-value').innerHTML = window.parent.playerdata.balance





    costElements.forEach((costElement, index) => {
        if (window.parent.playerdata.owned[index] === 1) {
            if (window.parent.playerdata.equipped[index] === 1) {
            
            
                shopItem[index].querySelector('.equipped').style.display = 'block';
                shopItem[index].querySelector('.equipped').style.color = 'rgb(0, 202, 54)';
            } else {
            shopItem[index].querySelector('.equipped').style.display = 'block';
            shopItem[index].querySelector('.equipped').style.color = 'rgb(238, 0, 0)';
             }
        } else {
        shopItem[index].querySelector('.equipped').style.display = 'none';
        }
    })
}
costElements.forEach((costElement, index) => {

  costElement.addEventListener('mouseenter', () => {
    costElement.textContent = costElement.dataset.cost;
    costElement.style.backgroundColor = '#FFB200';
    costElement.style.borderColor = 'rgb(235, 129, 0)';


        if (window.parent.playerdata.equipped[index] == 1) {
            costElement.textContent = 'Unequip'
            costElement.style.backgroundColor = 'rgb(247, 55, 79)';
            costElement.style.borderColor = 'rgb(136, 48, 78)'

        } else if (window.parent.playerdata.owned[index] == 1) {
        costElement.textContent = 'Equip';
        costElement.style.backgroundColor = 'rgb(5, 196, 113)';
        costElement.style.borderColor = 'rgb(5, 155, 90)'

        let equippedCount = window.parent.playerdata.equipped.reduce((count, equipped) => count + equipped, 0);
        if (equippedCount >= 6) {
            costElement.textContent = 'Max Equipped';
            costElement.style.backgroundColor = 'rgb(44, 44, 44)';
            costElement.style.borderColor = 'rgb(34, 34, 34)'
        }

        }
        
         
        
    
  });

  costElement.addEventListener('mouseleave', () => {
    costElement.textContent = costElement.dataset.name;
    costElement.style.backgroundColor = '';
    costElement.style.borderColor = '';
  });

  costElement.addEventListener('click', () => {
   //// console.log('clicked', index, window.parent.playerdata.owned[index], window.parent.playerdata.equipped[index]);
    // Check if the player is buying or equipping
    if (window.parent.playerdata.owned[index] === 1) {

        let equippedCount = window.parent.playerdata.equipped.reduce((count, equipped) => count + equipped, 0);
        // Equipping/Unequipping
        if (window.parent.playerdata.equipped[index] === 0) {
            // Check if the max equipped limit is reached
        
            if (equippedCount < 6) {
                window.parent.playerdata.equipped[index] = 1; // Equip the item
                // Update the items list based on the order of equipping
                items[equippedCount].setAttribute('src', `tower${towername[index]}.png`);
                items[equippedCount].style.backgroundColor = 'rgb(42, 42, 42)';

          
            } else {
               //// console.log('Maximum of 6 towers can be equipped at a time.');
            }
        } else if (window.parent.playerdata.equipped[index] === 1) {
            window.parent.playerdata.equipped[index] = 0; // Unequip the item
     
            equippedCount -= 1
                items[equippedCount].setAttribute('src', 'empty.png');
                items[equippedCount].style.backgroundColor = 'rgb(27, 27, 27)';
            
        }
        renderData(); // Re-render after updating window.parent.playerdata
        costElement.dispatchEvent(new Event('mouseenter')); // Trigger mouseenter to update the display
    } else {
        // Buying logic (if applicable)
        ////console.log('Item not owned, implement buying logic here.');
        ////console.log(window.parent.playerdata)

        const elementCostArray =  costElement.dataset.cost.split('')

        elementCostArray.splice(0,1)

        const elementCost = parseInt(elementCostArray.join(''))

        ////console.log(elementCost)

        if (window.parent.playerdata.balance >= elementCost){
        //If player can afford
            window.parent.playerdata.balance -= elementCost
            window.parent.playerdata.owned[index] = 1;
            renderData()
            costElement.dispatchEvent(new Event('mouseenter')); // Trigger mouseenter to update the display

        }  else {
        //If player cannot afford
        costElement.textContent = 'Cannot Afford';
        costElement.style.backgroundColor = 'rgb(106, 0, 0)';
        costElement.style.borderColor = 'rgb(125, 0, 0)'

        setTimeout(()=>costElement.dispatchEvent(new Event('mouseenter')),500)
        }
    }
  });
});






renderData()
},1000)
})