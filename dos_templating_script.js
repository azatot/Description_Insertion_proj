


function _dos_Start_JSLayout () {
    const stylesObj = {
        wrapper: `
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-content: center;
            align-items: center;

            width: auto;
            height: auto;
            margin: 20px;
            
            position: fixed;


        `,
        showButton: `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 50px;
            background-color: gray;
            cursor: pointer;
            border: 1px solid;

        
        `,
        

    };
    
    class GenerateElement {
        constructor(tag, setCss, type = '', ) {
            this.tag = document.createElement(tag);
            this.tag.style.cssText = setCss;
            
            type != '' ? this.tag.type = type : false;
            return this.tag;

        }
    }

    const showButton = new GenerateElement("input", stylesObj.showButton, "submit");

    
    
}  
_dos_Start_JSLayout();


const templates = {
    firstTemplate: {
        RU: `<div>(РУС) ПЕРВЫЙ ШАБЛОН</div>`,
        UA: `<div>(УКР) ПЕРШИЙ ШАБЛОН</div>`
        
    },

    secondTemplate: {
        RU: `(РУС) ВТОРОЙ ШАБЛОН`,
        UA: `(УКР) ДРУГИЙ ШАБЛОН`
    }

};

// і оце вся логіка?
// сійозно?

const 
wrapper = document.querySelector(".dos_wrapper"),
fieldRU = document.querySelector("#textarea1"),
fieldUA = document.querySelector("#textarea2"),
openButton = document.querySelector("#dos_open_list"),
listWrapper = document.querySelector("#dos_list_wrapper"),
selList = listWrapper.querySelector("#dos_templates_options");
pasteButton = listWrapper.querySelector("#dos_paste_button"),
previewBlock = listWrapper.querySelector("#dos_preview_block");

openButton.value = "Show";

openButton.onclick = function(){
    if (listWrapper.style.display == "none") {
        this.value = "Hide";
        listWrapper.style.display = "flex";
        wrapper.style.height = "550px";
    } else {
        this.value = "Show";
        wrapper.style.height = "50px";
        listWrapper.style.display = "none";
        
    };
};

selList.onchange = function(){
    switch (this.selectedIndex){
        case 1:
            previewBlock.children[1].innerHTML = templates.firstTemplate.RU;
            previewBlock.children[3].innerHTML = templates.firstTemplate.UA;
        break;

        default:
            previewBlock.children[1].innerHTML = "пусто";
            previewBlock.children[3].innerHTML = "пусто";
        break;

    };
};

pasteButton.onclick = function(){
    switch (document.querySelector("#dos_templates_options").selectedIndex) {
        case 1:
            fieldRU.innerHTML = previewBlock.children[1].innerHTML;
            fieldUA.innerHTML = previewBlock.children[3].innerHTML;
            
            break;
    
        default:
            fieldRU.innerText = previewBlock.children[1].innerHTML;
            fieldUA.innerText = previewBlock.children[3].innerHTML;
            break;
    };
    
};


/* 
    нехай шаблон = новий об'єкт {
        конструктор з default параметрами
        параметр "текст" - змінний
        інші - по-стандарту

        далі методи

        метод створення елементу та вставки його в документ

        метод, який задає стилі переданому елементу

        метод, який вішає прослуховувачі на елементи

        метод, що при кліку бере з конструктора
    }


*/
