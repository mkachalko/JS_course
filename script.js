let title;
let screens;
let screenPrice;
let rollback;
let fullPrice;
let adaptive;

title = "JS course";
screens = "Простые, Сложные, Интерактивные";
screenPrice = 180;
rollback = 20;
fullPrice = 450;
adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов" + " " + screenPrice + " " + "рублей");
console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");

screens = screens.toLowerCase();
console.log(screens.split(", "));

console.log(fullPrice * (rollback / 100));
