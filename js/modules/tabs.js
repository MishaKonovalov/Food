function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsParent = document.querySelector(tabsParentSelector),
          tabContent = document.querySelectorAll(tabsContentSelector);


   function hideTabsContent(){
       tabContent.forEach((item) => {
           item.classList.add("hide");
           item.classList.remove("show", "fade");
       });

       tabs.forEach((item) =>{
        item.classList.remove(activeClass);
    });
    }

    function showTabsContent(i = 0){
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener("click", (e) =>{
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) => {
                if(item == target){
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}

export default tabs;