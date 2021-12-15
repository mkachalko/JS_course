"use strict";

const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherPercent = document.querySelectorAll(".other-items.percent");
const otherNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback > div > input[type=range]");
const spanRange = document.querySelector(".rollback > div > span.range-value");
const totalInput = document.getElementsByClassName("total-input");
const totalScreensPrice = totalInput[0];
const totalScreensNumber = totalInput[1];
const totalServicesPrice = totalInput[2];
const totalPrice = totalInput[3];
const totalPriceAfter = totalInput[4];
let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screensNumber: 0,
  screenPrice: 0,
  rollback: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollbackSum: 0,
  isError: false,
  init: function () {
    appData.addTitle();

    screenBtn.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.getRollback);

    startBtn.addEventListener("click", appData.valid);

    inputRange.addEventListener("input", appData.changeRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  valid: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      appData.isError = false;

      if (select.value === "" || !appData.isNumber(input.value)) {
        appData.isError = true;
      }
    });

    if (!appData.isError) {
      appData.start();
    } else {
      alert("Заполните поля ввода");
    }
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.logger();
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addServices: function () {
    otherPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null;
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((sum, screen) => sum + screen.price, 0);

    appData.screensNumber = appData.screens.reduce((sum, screen) => sum + screen.count, 0);

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    appData.fullPrice =
      appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

    appData.rollbackSum = appData.fullPrice * (appData.rollback / 100);

    appData.servicePercentPrice = appData.fullPrice - appData.rollbackSum;
  },
  getRollback: function () {
    appData.rollback = +inputRange.value;
    spanRange.textContent = inputRange.value + "%";
  },
  changeRollback: function () {
    appData.rollbackSum = appData.fullPrice * (appData.rollback / 100);
    appData.servicePercentPrice = appData.fullPrice - appData.rollbackSum;
    totalPriceAfter.value = appData.servicePercentPrice;
  },
  showResult: function () {
    totalScreensPrice.value = appData.screenPrice;
    totalScreensNumber.value = appData.screensNumber;
    totalServicesPrice.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalPrice.value = appData.fullPrice;
    totalPriceAfter.value = appData.servicePercentPrice;
  },
  logger: function () {
    console.log(appData);
  },
};

appData.init();
