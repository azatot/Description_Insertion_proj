


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
    buzzer: {
        RU: `<div>(РУС) Здесь шаблон для микрофонов типа BUZZER</div><img href="#">`,
        UA: `<div>(УКР) Тут шаблон для мікрофонів типу BUZZER</div>`
        
    },

    speaker: {
        RU: `<div>(РУС) Здесь шаблон для микрофонов типа SPEAKER</div>`,
        UA: `<div>(УКР) Тут шаблон для мікрофонів типу SPEAKER</div>`
    }

};




const wrapper = document.querySelector(".dos_wrapper"),
        fieldRU = document.querySelector("#textarea1"),
        fieldUA = document.querySelector("#textarea2"),
        openButton = document.querySelector("#dos_open_list"),
        dos_list_wrapper = document.querySelector("#dos_list_wrapper"),
        selList = dos_list_wrapper.querySelector("#dos_templates_options");
        pasteButton = dos_list_wrapper.querySelector("#dos_paste_button"),
        previewBlock = dos_list_wrapper.querySelector("#dos_preview_block");

openButton.value = "Show";

let text = [];

openButton.onclick = function(){
    if (dos_list_wrapper.style.display == "none") {
        this.value = "Hide";
        dos_list_wrapper.style.display = "flex";
        wrapper.style.height = "550px";
        wrapper.style.width = "250px";
    } else {
        this.value = "Show";
        wrapper.style.height = "50px";
        dos_list_wrapper.style.display = "none";
        
    };
};

let setTemplates = (rutext, uatext) => {
    text.length = 0;
    text.push(rutext, uatext);
    previewBlock.children[1].innerText = text[0];
    previewBlock.children[3].innerText = text[1];
}

selList.onchange = function(){
    switch (this.selectedIndex){
        case 1:
            setTemplates(templates.buzzer.RU, templates.buzzer.UA);
        break;

        case 2:
            setTemplates(templates.speaker.RU,  templates.speaker.UA);
        break;

    };
};



pasteButton.onclick = function(){
    fieldRU.innerHTML = text[0];
    fieldUA.innerHTML = text[1];
};

// і оце вся логіка?
// сійозно?

/* 
    нехай шаблон = новий екземпляр класу {
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
