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
    try {
        if (!size && !stuffing)
            throw new HamburgerException(`no size given`);
        if (typeof size !== 'SIZE_SMALL' || typeof size !== 'SIZE_LARGE')
            throw new HamburgerException(`invalid size 'TOPPING_SAUCE'`);
        Hamburger.prototype.size = {...size};
        Hamburger.prototype.stuffing = {...stuffing};
        Hamburger.prototype.topping = [];
    } catch (exception){
        if (exception instanceof HamburgerException)
            console.log(`${exception.name} : ${exception.message}`);
    }


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
    if(!Hamburger.prototype.isEmpty(Hamburger.prototype.topping) && Hamburger.prototype.isExist(topping, Hamburger.prototype.topping)){
        new Error(`there is topping`);
    }
    Hamburger.prototype.topping.push(topping);
};

    /**
     * Убрать добавку, при условии, что она ранее была
     * добавлена.
     *
     * @param topping   Тип добавки
     * @throws {HamburgerException}  При неправильном использовании
     */
    Hamburger.prototype.removeTopping = (topping) => {
        if(Hamburger.prototype.isEmpty(Hamburger.prototype.topping) || !Hamburger.prototype.isExist(Hamburger.prototype.topping, topping)){
            new Error(`there isn't topping`);
        }
        Hamburger.prototype.topping.splice(Hamburger.prototype.topping.indexOf(topping), 1);
    };

    /**
     * Получить список добавок.
     *
     * @return {Array} Массив добавленных добавок, содержит константы
     *                 Hamburger.TOPPING_*
     */
    Hamburger.prototype.getToppings = () => Hamburger.prototype.topping;

    /**
     * Узнать размер гамбургера
     */
    Hamburger.prototype.getSize = () => Hamburger.prototype.size.size;

    /**
     * Узнать начинку гамбургера
     */
    Hamburger.prototype.getStuffing = () => Hamburger.prototype.stuffing.stuffing;

    /**
     * Узнать цену гамбургера
     * @return {Number} Цена в тугриках
     */
    Hamburger.prototype.calculatePrice = () => Hamburger.prototype.size.price + Hamburger.prototype.stuffing.price + Hamburger.prototype.calculatePriceOfTopping();

    /**
     * Узнать калорийность
     * @return {Number} Калорийность в калориях
     */
    Hamburger.prototype.calculateCalories = () => Hamburger.prototype.size.calories + Hamburger.prototype.stuffing.calories + Hamburger.prototype.calculateCaloriesOfTopping();

    /**
     * Представляет информацию об ошибке в ходе работы с гамбургером.
     * Подробности хранятся в свойстве message.
     * @constructor
     */
    function HamburgerException (message) {
        "use strict";
        this.name = 'HamburgerException';
        this.message = message;
    }


Hamburger.prototype.isExist = (element, arrayOfElements) => {
    "use strict";
     return arrayOfElements.find((currentElement, index, arrayOfElements) => element === currentElement);
};

Hamburger.prototype.isEmpty = (arrayOfElements) => {
    "use strict";
    return !!arrayOfElements.length;
};

Hamburger.prototype.calculatePriceOfTopping = () =>{
    let totalPrice = 0;
    for (let index = 0; index < Hamburger.prototype.topping.length; index++){
        totalPrice += Hamburger.prototype.topping[index].price;
    }
    return totalPrice;
};

Hamburger.prototype.calculateCaloriesOfTopping = () =>{
    let totalCalories = 0;
    for (let index = 0; index < Hamburger.prototype.topping.length; index++){
        totalCalories += Hamburger.prototype.topping[index].calories;
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
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
