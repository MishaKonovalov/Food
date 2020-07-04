import  tabs  from "./modules/tabs";
import  modal  from "./modules/modal";
import  timer  from "./modules/timer";
import  calc  from "./modules/calc";
import  cards  from "./modules/cards";
import  forms  from "./modules/forms";
import  slider  from "./modules/slider";
import  {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () =>{ 
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);
 
        
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("button[data-model]", ".modal", modalTimerId);
    timer(".timer", "2020-7-30");
    calc();
    cards();
    forms(modalTimerId, "form");
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prewArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
});