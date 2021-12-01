"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа", "12000");
let rollback = 20;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let allServicePrices, fullPrice, servicePercentPrice, rollbackSum;

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

const getAllServicePrices = function (serv1, serv2) {
  return serv1 + serv2;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
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
