const mainBtn = document.querySelector('#main-button');   //button "see menu"
const orderBtn = document.querySelector('.order-button');   //button "submit order"
const blockWhy = document.querySelector('#why');    //section "why"
const blockProducts = document.querySelector('#products');    //section "products"
const blockOrder = document.querySelector('#order');    //section "order"
const links = document.querySelectorAll('.menu-item > a');    //links in navigation menu
const inputList = document.querySelectorAll('.order-form-input > input');   //inputs in order block
const currency = document.querySelector('.currency');   //display current currency
const cardBtnList = document.querySelectorAll('.products-button');  //button add item to order
const currencyValue = {
  RUB: { dispalyName: 'RUB', symbol: '₽', rateusd: 90 },
  BYN: { dispalyName: 'BYN', symbol: 'BYN', rateusd: 4 },
  USD: { dispalyName: 'USD', symbol: '$', rateusd: 1 },
  CNY: { dispalyName: 'CNY', symbol: '¥', rateusd: 8 },
  EUR: { dispalyName: 'EUR', symbol: '€', rateusd: 0.9 },
};   //value to base currency

mainBtn.addEventListener('click', () => {
  blockProducts.scrollIntoView({ behavior: "smooth" });
});

links.forEach((item) => {
  item.addEventListener('click', () => {
    switch (item.getAttribute('data-link')) {
      case 'why':
        blockWhy.scrollIntoView({ behavior: "smooth" });
        break;
      case 'products':
        blockProducts.scrollIntoView({ behavior: "smooth" });
        break;
      case 'order':
        blockOrder.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  })
});

orderBtn.addEventListener('click', () => {
  let hasErro = false;
  inputList.forEach((item) => {
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasErro = true;
    } else {
      item.parentElement.style.background = "";
      hasErro = false;
    }
  })

  if (!hasErro) {
    alert('спасибо за заказ');
    inputList.forEach((item) => {
      item.value = '';
    })
  }
});

const cardListUsd = Array.from(document.querySelectorAll('.products-item'));   //set price all cards USD
cardListUsd.forEach((item) => {
  item.setAttribute('data-price', item.querySelector('.products-item-price').textContent)
})


function changePrice(name, event) {
  event.target.textContent = currencyValue[name].symbol;
  cardListUsd.forEach((item) => {
    const priceItem = item.querySelector('.products-item-price');
    let price = item.getAttribute('data-price').split(' ')[0];
    priceItem.textContent = `${price * currencyValue[name].rateusd} ${currencyValue[name].dispalyName}`;
  })
}

let btnState = 0

currency.addEventListener('click', (event) => {

  switch (btnState) {
    case 0:
      changePrice('RUB', event);
      btnState++;
      break;
    case 1:
      changePrice('BYN', event);
      btnState++;
      break;
    case 2:
      changePrice('CNY', event);
      btnState++;
      break;
    case 3:
      changePrice('EUR', event);
      btnState++;
      break;
    case 4:
      changePrice('USD', event);
      btnState = 0;
      break;

    default:
      break;
  }
})

cardBtnList.forEach((item) => {

  item.addEventListener('click', () => {
    document.querySelector('#inpt_order').value = 
      item.parentElement.parentElement.querySelector('.products-item-title').textContent;
  })

});