let food = [
    ["Schweinefilet-Medaillons, mariniert", "200g Schweinefiletmedaillons, mariniert, Salat, Pommes", 13.90, 0],
    ["Argentinische Hüftsteaks, mariniert", "Hüftsteaks vom argentinischen Rind, mariniert, Salat, Pommes", 14.90, 0],
    ["Schweinefiletmedaillons in Curry-Rahmsauce", "600g Schweinefiletmedaillons, mariniert, Salat, Pommes", 15.20, 0],
    ["Schweinefilet-Medaillons umhüllt von Kalbsfarce im Strudelbaltt mit Speckbohnen und Sauce Bernaise", "200g Filet, BBQ-Sauce", 9.20, 0],
    ["Beef", "2	Stk	Schulterfilet vom Rind (a 250g), Reis/Pommes, Salat", 16.90, 0],
    ["Rindersteak nach Portugiesischer Art", "2	Stk	Steak vom Rind, Reis/Pommes, Salat", 12.90, 0],
    ["Steak mit Senfkruste", "260g Rindfleisch, Tomate, Salat, Zwiebel, Essiggurke, Cheddar, Bacon", 12.00, 0],
    ["Tomahawk Steak vom Schwein", "200g Rindfleisch, Tomate, Salat,Texas Smoky BBQ Gewürzmischung", 12.90, 0],
    ["Steak Strindberg mit Senf-Zwiebelkruste", "220g Schweineschnitzel, Salz, Pfeffer, Eier, Zwiebel, Butterschmalz ", 9.90, 0],
    ["Portion Pommes (inkl. Dip)", "", 3.20, 0],
    ["Portion Reis (inkl. Dip)", "", 3.70, 0],
    ["Portion Salat", "", 3.80, 0],
];

let menus = [];
let descriptions = [];
let prices = [];
let amounts = [];
let items = [];

pushMenu();

//templates 
function menuTemplate(title, description, price, index) { //
    let num = formatter(price);
    return /*html*/`
<div class="itemCard">
    <div class="itemCardTop1">
        <h4>${title}</h4>
        <button class="itemButton" onclick="pushItem(${index})">+</button>
    </div>
    <div class="itemCardBottom">
        <p>${description}</p>
        <h5>${num}</h5>
    </div>
</div>
`}

function cartTemplate(item, price, amount, index) {
    let result = amount * price;
    let num = formatter(result);
    return /*html*/`
    <div class="itemCard">
        <div class="itemCardTop2">
            <p>${amount} x</p>
            <h4>${item}</h4>
        </div>
        <div class="itemCardBottom">
            <div class="cartButtons">
                <button class="cartButton" onclick="pushItem(${index})">+</button>
                <button class="cartButton" onclick="spliceItem(${index})">-</button>
            </div>
            <h5>${num}</h5>
        </div>
    </div>`
}

function formatter(x) {
    const formatConfig = {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    const format = new Intl.NumberFormat("de-DE", formatConfig)
    return format.format(x);
}

//main
function pushMenu() {
    for (let i = 0; i < food.length; i++) {
        menus.push(food[i][0]);
        descriptions.push(food[i][1]);
        prices.push(food[i][2]);
        amounts.push(food[i][3]);
    }
}

function renderMenu() {
    for (let i = 0; i < menus.length; i++) {
        let price = Number(prices[i]);
        document.getElementById('menu').innerHTML += menuTemplate(menus[i], descriptions[i], price, i);
    }
}

function showBasket() { //sidebar
    document.getElementById('body').classList.toggle('marginRight');   
    document.getElementById('header').classList.toggle('marginRight');
    document.getElementById('sidebar').classList.toggle('displayFlex');

}

//Cart
function renderCart() {
    document.getElementById('cart').innerHTML = "";
    document.getElementById('sumContainer').innerHTML = "";
    if (items.length == 0) {
        document.getElementById('cart').innerHTML = /*html*/`
        <p>Ihr Warenkorb ist noch leer. <br>Füge einige leckere Gerichte aus der Speisekarte hinzu.
        </p>`
    }
    if (items.length > 0) {
        document.getElementById('sumContainer').innerHTML = /*html*/ `
        <div class="sum">
            <h3>Bezahlen (${renderResult()})</h3>
        </div>`
    }
    renderItems();
}

function pushItem(x) {
    if (amounts[x] == 0) {
        amounts[x] += 1;
        items.push(x);
    } else { amounts[x] += 1; }
    renderCart();
    itemNumber();
}

function spliceItem(x) {
    if (amounts[x] == 1) {
        amounts[x] -= 1;
        let y = items.indexOf(x);
        items.splice(y, 1);
    } else { amounts[x] -= 1; }
    renderCart();
    itemNumber();
}

function renderItems() {
    for (let i = 0; i < items.length; i++) {
        let j = items[i];
        document.getElementById('cart').innerHTML += cartTemplate(menus[j], prices[j], amounts[j], j);
    }
}

function renderResult() {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i] * amounts[i];
    }
    let result = formatter(sum);
    return result;
}

function itemNumber() {
    let p = document.getElementById('items');
    let sum = 0;
    amounts.map(a => sum += a);
    if (sum == 0) { p.classList.toggle('displayNone') } else {
        p.classList.remove('displayNone');
        p.innerHTML = sum;
    }
}