/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
    "use strict";
    this.size = {...size};
    this.stuffing = {...stuffing};
    this.topping = [];
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = { size:'small', price:50, calories:20};
Hamburger.SIZE_LARGE = { size:'large', price:100, calories:40};
Hamburger.STUFFING_CHEESE = { stuffing:'cheese', price:10, calories:20};
Hamburger.STUFFING_SALAD = { stuffing:'salad', price:20, calories:5};
Hamburger.STUFFING_POTATO = { stuffing:'potato',price:15, calories:10};
Hamburger.TOPPING_MAYO = { topping:'mayo',price:20, calories:5};
Hamburger.TOPPING_SPICE = { topping:'spice', price:15, calories:0};


/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = (topping) => {
    if(!isEmpty(Hamburger.topping) && isExist(Hamburger.topping, topping)){
        new Error(`there is topping`);
    }
    hamburger.topping.push(topping);
};

    /**
     * Убрать добавку, при условии, что она ранее была
     * добавлена.
     *
     * @param topping   Тип добавки
     * @throws {HamburgerException}  При неправильном использовании
     */
    Hamburger.prototype.removeTopping = (topping) => {
        if(isEmpty(hamburger.topping) || !isExist(hamburger.topping, topping)){
            new Error(`there isn't topping`);
        }
        delete hamburger.topping[hamburger.topping.indexOf(topping)];
    };

    /**
     * Получить список добавок.
     *
     * @return {Array} Массив добавленных добавок, содержит константы
     *                 Hamburger.TOPPING_*
     */
    Hamburger.prototype.getToppings = () => hamburger.topping;

    /**
     * Узнать размер гамбургера
     */
    Hamburger.prototype.getSize = () => hamburger.size.size;

    /**
     * Узнать начинку гамбургера
     */
    Hamburger.prototype.getStuffing = () => hamburger.stuffing.stuffing;

    /**
     * Узнать цену гамбургера
     * @return {Number} Цена в тугриках
     */
    Hamburger.prototype.calculatePrice = () => hamburger.size.price + hamburger.stuffing.price;

    /**
     * Узнать калорийность
     * @return {Number} Калорийность в калориях
     */
    Hamburger.prototype.calculateCalories = () => hamburger.size.calories + hamburger.stuffing.calories;

    /**
     * Представляет информацию об ошибке в ходе работы с гамбургером.
     * Подробности хранятся в свойстве message.
     * @constructor
     */
    function HamburgerException () {}



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
console.log(`Have ${hamburger.getToppings().length} toppings`); // 1



function isExist(arrayOfElements, element){
    "use strict";
    // return arrayOfElements.find((currentElement) => element === currentElement);
}

function isEmpty(arrayOfElements) {
    "use strict";
    // return !!arrayOfElements.length;
}