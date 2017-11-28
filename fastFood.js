/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param sizeOfHamburger
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(sizeOfHamburger, stuffing) {

    if (!sizeOfHamburger && !stuffing)
       new HamburgerException(`no size or stuffing given`);

    if (sizeOfHamburger !==  Hamburger.SIZE_SMALL && sizeOfHamburger !== Hamburger.SIZE_LARGE)
        new HamburgerException(`invalid size`);

    Hamburger.prototype.typeOfHumburger = {...sizeOfHamburger};
    Hamburger.prototype.stuffing = {...stuffing};
    Hamburger.prototype.topping = [];
}

let humbProt = Hamburger.prototype;

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = { typeOfSize:'SIZE_SMALL', price:50, calories:20};
Hamburger.SIZE_LARGE = { typeOfSize:'SIZE_LARGE', price:100, calories:40};
Hamburger.STUFFING_CHEESE = { stuffing:'STUFFING_CHEESE', price:10, calories:20};
Hamburger.STUFFING_SALAD = { stuffing:'STUFFING_SALAD', price:20, calories:5};
Hamburger.STUFFING_POTATO = { stuffing:'STUFFING_POTATO',price:15, calories:10};
Hamburger.TOPPING_MAYO = { topping:'TOPPING_MAYO',price:20, calories:5};
Hamburger.TOPPING_SPICE = { topping:'TOPPING_SPICE', price:15, calories:0};


/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
humbProt.addTopping = (topping) => {

    if (!topping)
        new HamburgerException(`no topping given`);

    if (humbProt.isExist(topping, humbProt.topping))
        new HamburgerException(`duplicate topping '${topping.topping}'`);

    humbProt.topping.push(topping);
};

    /**
     * Убрать добавку, при условии, что она ранее была
     * добавлена.
     *
     * @param topping   Тип добавки
     * @throws {HamburgerException}  При неправильном использовании
     */
    humbProt.removeTopping = (topping) => {

        if (!topping)
            new HamburgerException(`no topping given`);

        if (!humbProt.isExist(topping, humbProt.topping))
            new HamburgerException(`there is no topping '${topping.topping}'`);

        humbProt.topping.splice(humbProt.topping.indexOf(topping), 1);
    };

    /**
     * Получить список добавок.
     *
     * @return {Array} Массив добавленных добавок, содержит константы
     *                 Hamburger.TOPPING_*
     */
    humbProt.getToppings = () => humbProt.topping;

    /**
     * Узнать размер гамбургера
     */
    humbProt.getSize = () => humbProt.typeOfHumburger.typeOfSize;

    /**
     * Узнать начинку гамбургера
     */
    humbProt.getStuffing = () => humbProt.stuffing.stuffing;

    /**
     * Узнать цену гамбургера
     * @return {Number} Цена в тугриках
     */
    humbProt.calculatePrice = () => humbProt.typeOfHumburger.price + humbProt.stuffing.price + humbProt.calculatePriceOfTopping();

    /**
     * Узнать калорийность
     * @return {Number} Калорийность в калориях
     */
    Hamburger.prototype.calculateCalories = () => humbProt.typeOfHumburger.calories + humbProt.stuffing.calories + humbProt.calculateCaloriesOfTopping();

    /**
     * Представляет информацию об ошибке в ходе работы с гамбургером.
     * Подробности хранятся в свойстве message.
     * @constructor
     */
    function HamburgerException (message) {

        this.name = 'HamburgerException';
        this.message = message;

        console.log(`${this.name}: ${this.message}`);
    }


humbProt.isExist = (element, arrayOfElements) =>  arrayOfElements.find((currentElement, index, arrayOfElements) => element === currentElement);

humbProt.isEmpty = (arrayOfElements) =>  !!arrayOfElements.length;


humbProt.calculatePriceOfTopping = () =>{

    let totalPrice = 0;

    for (let index = 0; index < humbProt.topping.length; index++){
        totalPrice += humbProt.topping[index].price;
    }

    return totalPrice;
};

humbProt.calculateCaloriesOfTopping = () =>{

    let totalCalories = 0;

    for (let index = 0; index < humbProt.topping.length; index++){
        totalCalories += humbProt.topping[index].calories;
    }

    return totalCalories;
};

// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// спросим сколько там калорий
console.log(`Calories: ${hamburger.calculateCalories()}`);

// сколько стоит
console.log(`Price: ${hamburger.calculatePrice()}`);

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// А сколько теперь стоит?
console.log(`Price with sauce: ${hamburger.calculatePrice()}`);

// Проверить, большой ли гамбургер?
console.log(`Is hamburger large: ${hamburger.getSize() === Hamburger.SIZE_LARGE}`); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);

//сколько добавок
console.log(`Have ${hamburger.getToppings().length} toppings`); // 1


// не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

h4.addTopping(Hamburger.TOPPING_MAYO);
h4.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
