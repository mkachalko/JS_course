"use strict";

const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherPercent = document.querySelectorAll(".other-items.percent");
const otherNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback > div > input[type=range]");
const spanRange = document.querySelector(".rollback > div > span.range-value");
const blockCMS = document.querySelector(".hidden-cms-variants");
const openCMS = document.getElementById("cms-open");
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
  servicesPercent: {},
  servicesNumber: {},
  serviceCMS: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePriceCMS: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollbackSum: 0,
  isError: false,
  init: function () {
    this.addTitle();

    screenBtn.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("input", this.getRollback.bind(this));

    startBtn.addEventListener("click", this.valid.bind(this));

    inputRange.addEventListener("input", this.changeRollback.bind(this));

    openCMS.addEventListener("change", this.getCMS);
    document.getElementById("cms-select").addEventListener("change", this.getCMS);

    resetBtn.addEventListener("click", this.reset.bind(this));
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  valid: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      this.isError = false;

      if (select.value === "" || !this.isNumber(input.value)) {
        this.isError = true;
      }
    });

    if (openCMS.checked) {
      switch (true) {
        case blockCMS.querySelector("select").value == "":
        case blockCMS.querySelector("select").value == "other" &&
          !this.isNumber(blockCMS.querySelector("input").value):
          this.isError = true;
          break;
        default:
          this.isError = false;
      }
    }

    if (!this.isError) {
      this.start();
    } else {
      alert("Заполните поля ввода");
    }
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.block();
    this.logger();
  },
  reset: function () {
    this.removeScreens();
    this.clearForms();
    this.clearPropertyValue();
    this.unblock();
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
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
    otherPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });

    if (document.getElementById("cms-select").value == "other") {
      this.serviceCMS = +document.getElementById("cms-other-input").value;
    } else {
      this.serviceCMS = +document.getElementById("cms-select").value;
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null;
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, screen) => sum + screen.price, 0);

    this.screensNumber = this.screens.reduce((sum, screen) => sum + screen.count, 0);

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    this.servicePriceCMS =
      (this.serviceCMS / 100) *
      (this.screenPrice + this.servicePricesPercent + this.servicePricesNumber);

    this.fullPrice =
      this.screenPrice +
      this.servicePricesPercent +
      this.servicePricesNumber +
      this.servicePriceCMS;

    this.rollbackSum = this.fullPrice * (this.rollback / 100);

    this.servicePercentPrice = this.fullPrice - this.rollbackSum;
  },
  getRollback: function () {
    this.rollback = +inputRange.value;
    spanRange.textContent = inputRange.value + "%";
  },
  changeRollback: function () {
    this.rollbackSum = this.fullPrice * (this.rollback / 100);
    this.servicePercentPrice = this.fullPrice - this.rollbackSum;
    totalPriceAfter.value = this.servicePercentPrice;
  },
  getCMS: function () {
    if (openCMS.checked) {
      blockCMS.style.display = "flex";
    } else {
      blockCMS.style.display = "none";
    }
    if (document.getElementById("cms-select").value == "other") {
      blockCMS.querySelector(".main-controls__input").style.display = "flex";
    } else {
      blockCMS.querySelector(".main-controls__input").style.display = "none";
    }
  },
  showResult: function () {
    totalScreensPrice.value = this.screenPrice;
    totalScreensNumber.value = this.screensNumber;
    totalServicesPrice.value =
      this.servicePricesPercent + this.servicePricesNumber + this.servicePriceCMS;
    totalPrice.value = this.fullPrice;
    totalPriceAfter.value = this.servicePercentPrice;
  },
  block: function () {
    const elementsInputs = document.querySelector(".elements").querySelectorAll("input[type=text]");
    const elementsSelects = document.querySelector(".elements").querySelectorAll("select");
    const inputsCheck = document.querySelectorAll("input[type=checkbox]");
    const array = [...elementsInputs, ...elementsSelects, ...inputsCheck];
    array.forEach((item) => {
      if (item.disabled == false) {
        item.disabled = true;
      }
    });
    screenBtn.disabled = true;
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },
  removeScreens: function () {
    while (screens.length !== 1) {
      screens[1].remove();
      screens = document.querySelectorAll(".screen");
    }
  },
  clearForms: function () {
    const check = document.querySelectorAll("input[type=checkbox]");

    screens.forEach((item) => {
      item.querySelector("input").value = "";
      item.querySelector("select").value = "";
    });

    check.forEach((item) => (item.checked = false));

    blockCMS.querySelector("input").value = "";
    blockCMS.querySelector("select").value = "";

    inputRange.value = 0;
    spanRange.textContent = inputRange.value + "%";

    document.querySelectorAll(".total-input").forEach((item) => (item.value = 0));
  },
  clearPropertyValue: function () {
    this.screens = [];
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
  },
  unblock: function () {
    screens = document.querySelectorAll(".screen");
    const inputsCheck = document.querySelectorAll("input[type=checkbox]");
    screens.forEach((item) => {
      item.querySelector("input").disabled = false;
      item.querySelector("select").disabled = false;
    });
    inputsCheck.forEach((item) => (item.disabled = false));
    screenBtn.disabled = false;

    blockCMS.querySelector("input").disabled = false;
    blockCMS.querySelector("select").disabled = false;

    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    blockCMS.style.display = "none";
  },
  logger: function () {
    console.log(this);
  },
};

appData.init();
