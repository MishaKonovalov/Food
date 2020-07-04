function openModal(modalSelector, modalTimerId){
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove("hide");
    modalWindow.classList.add("show");
    document.body.style.overflow = "hidden";
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function closeModalWindow(modalSelector){
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(trigerSelector, modalSelector, modalTimerId){
//Modal 

    const btnModal = document.querySelectorAll(trigerSelector),
          modalWindow = document.querySelector(modalSelector);


    btnModal.forEach(btn => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });
    

    modalWindow.addEventListener("click", (e) =>{
       if(e.target === modalWindow || e.target.getAttribute("data-close") == ""){
        closeModalWindow(modalSelector);
       }
   });

    document.addEventListener("keydown", (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains("show")){
            closeModalWindow(modalSelector);
        }
   });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}

export default modal;
export {closeModalWindow};
export {openModal};