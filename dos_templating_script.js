// і оце вся логіка?
// сійозно?

let fieldRU = document.querySelector("#textarea1");
let fieldUA = document.querySelector("#textarea2");

document.querySelector("#dos_templates_options").onchange = function(){
    switch (this.selectedIndex) {
        case 0:
            fieldRU.innerHTML = templates.firstTemplate.RU;
            fieldUA.innerHTML = templates.firstTemplate.UA;
            break;
    
        default:
            fieldRU.innerText = "НИЧЕГО";
            fieldUA.innerText = "НІЧОГО";
            break;
    }
    
}

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
