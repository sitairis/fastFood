class Hamburger{

    /**
     * Конструктор
     * @param sizeOfHamburger
     * @param stuffing
     */
    constructor(sizeOfHamburger, stuffing){

        if (!sizeOfHamburger && !stuffing)
            new HamburgerException(`no size or stuffing given`);

        if (sizeOfHamburger !==  Hamburger.SIZE_SMALL && sizeOfHamburger !== Hamburger.SIZE_LARGE)
            new HamburgerException(`invalid size`);

        this.typeOfHumburger = {...sizeOfHamburger};
        this.stuffing = {...stuffing};
        this.topping = [];
    }

    /**
     * Добавляет добавку
     * @param topping
     */
    addTopping (topping) {

        if (!topping)
            new HamburgerException(`no topping given`);

        if (this.isExist(topping, this.topping))
            new HamburgerException(`duplicate topping '${topping.topping}'`);

        this.topping.push(topping);
    };

    /**
     * Убирает добавку
     * @param topping
     */
    removeTopping(topping){
        if (!topping)
            new HamburgerException(`no topping given`);

        if (!this.isExist(topping, this.topping))
            new HamburgerException(`there is no topping '${topping.topping}'`);

        this.topping.splice(this.topping.indexOf(topping), 1);
    };

    /**
     * Возвращает массив добавок
     * @returns {Array}
     */
    getToppings () {
        return this.topping;
    }

    /**
     * Возвращает массив гамбургера
     * @returns {string}
     */
    getSize() {
        return this.typeOfHumburger.typeOfSize;
    }

    /**
     * Возвращает  название начинки
     * @returns {string}
     */
    getStuffing (){
        return this.stuffing.stuffing;
    }

    /**
     * Подсчитывает цену гамбургера
     * @returns {number}
     */
    calculatePrice () {
        return this.typeOfHumburger.price + this.stuffing.price + this.calculatePriceOfTopping();
    }

    /**
     * Подсчитывает количество каллорий в гамбургере
     * @returns {*}
     */
    calculateCalories (){
        return this.typeOfHumburger.calories + this.stuffing.calories + this.calculateCaloriesOfTopping();
    }

    /**
     * Проверяет наличие добавки в гамбургере
     * @returns {T}
     * @param topping
     * @param toppings
     */
    isExist(topping, toppings){
        return toppings.find((currentTopping, index, toppings) => topping === currentTopping);
    }

    /**
     * Проверяет есть ли какие-нибудь добавоки
     * @returns {boolean}
     * @param toppings
     */
    static isEmpty(toppings) {
        return !!toppings.length;
    }

    /**
     * Подсчет цены добавок
     * @returns {number}
     */
    calculatePriceOfTopping(){

        let totalPrice = 0;

        for (let index = 0; index < this.topping.length; index++){
            totalPrice += this.topping[index].price;
        }

        return totalPrice;
    };

    /**
     * Подсчет каллорий добавок
     * @returns {number}
     */
    calculateCaloriesOfTopping () {

        let totalCalories = 0;

        for (let index = 0; index < this.topping.length; index++){
            totalCalories += this.topping[index].calories;
        }

        return totalCalories;
    };
}


/**
 * Класс исключения
 */
class HamburgerException {

    /**
     * Конструктор
     * @param message
     */
    constructor(message) {
        this.name = 'HamburgerException';
        this.message = message;
        console.log(`${this.name}: ${this.message}`);
    }

}


/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = { typeOfSize:'SIZE_SMALL', price:50, calories:20};
Hamburger.SIZE_LARGE = { typeOfSize:'SIZE_LARGE', price:100, calories:40};
Hamburger.STUFFING_CHEESE = { stuffing:'STUFFING_CHEESE', price:10, calories:20};
Hamburger.STUFFING_SALAD = { stuffing:'STUFFING_SALAD', price:20, calories:5};
Hamburger.STUFFING_POTATO = { stuffing:'STUFFING_POTATO',price:15, calories:10};
Hamburger.TOPPING_MAYO = { topping:'TOPPING_MAYO',price:20, calories:5};
Hamburger.TOPPING_SPICE = { topping:'TOPPING_SPICE', price:15, calories:0};


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