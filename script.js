let menus = [];
let prices = [];
let amounts = [];
let deliveryCost = 2.50;

function addToBasket(menu, price) {
    let index = menus.indexOf(menu);
    if (index == -1) {
        menus.push(menu);
        prices.push(price);
        amounts.push(1);
    } else {
        amounts[index]++;
    }
    document.getElementById('finalSum').classList.remove('d-none');
    renderBasket();
}

function updateShoppingBasket() {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i] * amounts[i];
    }

    let finalSum = sum + deliveryCost;

    document.getElementById('finalSum').innerHTML = `
        <table>
            <tbody>
                <tr>
                    <td class="left">Zwischensumme</td>
                    <td class="right">${sum.toFixed(2).replace('.', ',')} €</td>
                </tr><br>
                <tr>
                    <td class="left">Lieferkosten</td>
                    <td class="right">${deliveryCost.toFixed(2).replace('.', ',')} €</td>
                </tr><br>
                <tr>
                    <td class="left"><b>Gesamt</b></td>
                    <td class="right"><b>${finalSum.toFixed(2).replace('.', ',')} €</b></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-warning rounded-pill px-3 btnColor" type="button">Bestellen</button>
    `;
}

function renderBasket() {
    let basket = document.getElementById('contentBasket');
    basket.innerHTML = '';

    if (menus.length > 0) {
        for (let i = 0; i < prices.length; i++) {
            basket.innerHTML += `
                <div>
                    ${amounts[i]} ${menus[i]} ${prices[i].toFixed(2)} €
                </div>
                <div class="iconsBasket">
                    <img src="img/bag-dash-fill.svg" alt="reduce" onclick="deleteAmount(${i})">
                    <img src="img/bag-plus-fill.svg" alt="add" onclick="addAmount(${i})">  
                </div>
            `;
        }
    } else {
        renderInitialBasket();
        document.getElementById('finalSum').classList.add('d-none');
    }
    updateShoppingBasket();
}

function addAmount(i) {
    amounts[i]++;
    renderBasket();
}

function deleteAmount(i) {
    amounts[i]--;
    renderBasket();
    if (amounts[i] == 0) {
        menus.splice(i, 1);                   
        prices.splice(i, 1);
        amounts.splice(i, 1);
    }
    renderBasket();
}

function renderInitialBasket() {
    let initialBasket = document.getElementById('contentBasket');
    initialBasket.innerHTML = '';
    initialBasket.innerHTML += `
        <img alt="shoppingBasket" class="imgBasket" src="./img/cart-fill.svg">
        <h1>Fülle Deinen Warenkorb</h1>
        <sp>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle Dein Essen.</sp>
    `;
}

function showBasket() {                                                         
    document.getElementById('orderArea').classList.add('d-none');   
    // document.getElementById('shoppingBasket').classList.add('d-none');   
    document.getElementById('shoppingBasket').classList.add('basketOn'); 
    document.getElementById('shoppingBasket').classList.remove('basketOff');     
    // document.getElementById("shoppingBasket").style.width = "100%";
    // document.getElementById('shoppingBasket').classList.add('basketOff');   
    // document.getElementById('shoppingBasket').style.display ='block'; 
    renderBasket();           
    updateShoppingBasket();
}

function closeBasket() {
    document.getElementById('orderArea').classList.remove('d-none');
    document.getElementById('shoppingBasket').classList.remove('basketOn');
    document.getElementById('shoppingBasket').classList.add('basketOff');  
    // document.getElementById('shoppingBasket').classList.add('d-none');
    // document.getElementById('btnCloseBasket').classList.add('d-none');
    
}

window.onscroll = function () {
    let shoppingBasket = document.getElementById('shoppingBasket');
    if (window.scrollY > 0 && window.scrollY < 80) {
        shoppingBasket.style.top = `${80 - window.scrollY}px`;
    } else if (window.scrollY >= 80) {
        shoppingBasket.style.top = '0';
    }
}
