"use strict";

let title;
let screens;
let screenPrice;
let rollback = 20;
let adaptive;
let service1;
let servicePrice;
let allServicePrices, fullPrice, servicePercentPrice, rollbackSum;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num !== null;
};

const asking = function () {
  title = prompt("Как называется ваш проект?");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  do {
    screenPrice = prompt("Сколько будет стоить данная работа");
  } while (!isNumber(screenPrice));
  screenPrice = +screenPrice; // после проверки записываем в переменную число

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  switch (true) {
    case price >= 30000:
      return "Даем скидку в 10%";
    case price >= 15000 && price < 30000:
      return "Даем скидку в 5%";
    case price >= 0 && price < 15000:
      return "Скидка не предусмотрена";
    default:
      return "Что то пошло не так";
  }
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    service1 = prompt("Какой дополнительный тип услуги нужен?");
    servicePrice = prompt("Сколько это будет стоить?");

    while (!isNumber(servicePrice)) {
      servicePrice = prompt("Сколько это будет стоить?");
    }
    servicePrice = +servicePrice; // после проверки записываем в переменную число
    sum += servicePrice;
  }

  return sum;
};

function getFullPrice(screen, service) {
  return screen + service;
}

const getTitle = function (ttl) {
  ttl = ttl.trim();
  return ttl[0].toUpperCase() + ttl.substring(1).toLowerCase();
};

function getServicePercentPrices(foo, rollb) {
  return foo - rollb;
}

asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
rollbackSum = fullPrice * (rollback / 100);
servicePercentPrice = getServicePercentPrices(fullPrice, rollbackSum);
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);

// Проверка
// console.log(allServicePrices);
// console.log(fullPrice);
// console.log(title);
// console.log(servicePercentPrice);
// showTypeOf(allServicePrices);
// showTypeOf(fullPrice);
// showTypeOf(rollbackSum);
// showTypeOf(servicePercentPrice);
