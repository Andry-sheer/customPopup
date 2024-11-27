
const buttonCalc = document.querySelector('.topCall');
const buttonClose = document.querySelector('.win__close');
const buttonOrder = document.querySelector('.win__btn');
const buttonNewCheck = document.querySelector('.win__result-btn');
const overlay = document.querySelector('.win__overlay');
const orderForm = document.querySelector('.win__form');
const winFinal = document.querySelector('.win__final');
const winResult = document.querySelector('.win__result');
const winResultForm = document.querySelector('.win__result-form');
const winResultContainer = document.querySelector('.win__result-container');
const winTitle = document.querySelector('.win__title');

let formObject = {};
let formObjectResult = {};

const getRandomOrder = ()=> {
  return Math.floor(100000 + Math.random() * 900000);
}

let randomOrder = getRandomOrder();

buttonCalc.addEventListener('click', () => {
    overlay.style.display = 'block';
    buttonCalc.style.display = 'none';
});


buttonClose.addEventListener('click', () => {
    randomOrder = getRandomOrder();
    overlay.style.display = 'none';
    winResult.style.display = 'none';
    winFinal.style.display = 'none';
    orderForm.style.display = 'flex';
    buttonCalc.style.display = 'block';
    winTitle.textContent = 'Расчет стоимости';
    formObject = {};
    formObjectResult = {};
});


buttonOrder.addEventListener('click', () => {
    orderForm.style.display = 'none';
    winResult.style.display = 'block';
    winTitle.textContent = 'Детали заказа';
});


const getFirstObject =(e)=> {
    e.preventDefault();
    const formData = new FormData(orderForm);
    formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    winResultContainer.innerHTML = `
    <p class="win__items-name">Вид полки: <span class="win__span-name">${formObject.material}</span></p>
    <p class="win__items-name">Размер: <span class="win__span-name">${formObject.size} мм.</span></p>
    <p class="win__items-name">Высота стоек: <span class="win__span-name">${formObject.height} мм.</span></p>
    <p class="win__items-name">Количество полок: <span class="win__span-name">${formObject.shelves} шт.</span></p>
    <p class="win__items-name">Полок для шин: <span class="win__span-name">${formObject.tires ? `${formObject.tires}` : `${formObject.tires = '0'}`} шт.</span></p>
    <p class="win__items-name">Угловые усилители: <span class="win__span-name">${formObject.edge ? `${formObject.edge = 'да'}` : `${formObject.edge = 'нет'}`}</span></p>
    <p class="win__items-name">Стоимость: <span class="win__span-name">1234 грн.</span></p>
    <p class="win__items-name" style="display: none;">Номер заказа: <span class="win__span-name">:${formObject.order = randomOrder.toString()}</span></p>`;
}


const getSecondObject = (x) => {
    x.preventDefault();
    const formOrderData = new FormData(winResultForm);
    formObjectResult = {};
    formOrderData.forEach((value, key) => {
        formObjectResult[key] = value;
    });

    const comboOrder = { ...formObject, ...formObjectResult };
    console.log("Заказ:", comboOrder);
    getFinalOrder();
}

orderForm.addEventListener('submit', getFirstObject);
winResultForm.addEventListener('submit', getSecondObject);

const getFinalOrder = () => {
  winFinal.innerHTML = `
  <p class="win__items-name">Спасибо за заказ!</p>
  <p class="win__span-name">Скоро наши менеджери вам позвонят</p>
  <p class="win__span-name">для уточнения заказа.</p>`

  winFinal.style.display = 'flex';
  winResult.style.display = 'none';
  winTitle.textContent = 'Заказ: ' + randomOrder;
}

const reset =()=> {
    randomOrder = getRandomOrder();
    orderForm.style.display = 'flex';
    winResult.style.display = 'none';
    winFinal.style.display = 'none';
    winTitle.textContent = 'Расчет стоимости';
    formObject = {};
    formObjectResult = {};
};

buttonNewCheck.addEventListener('click', reset);