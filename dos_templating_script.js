function _dosStart () {
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
    
    const templates = {
        firstTemplate: {
            RU: `(РУС) ПЕРВЫЙ ШАБЛОН`,
            UA: `(УКР) ПЕРШИЙ ШАБЛОН`
            
        },
    
        secondTemplate: {
            RU: `(РУС) ВТОРОЙ ШАБЛОН`,
            UA: `(УКР) ДРУГИЙ ШАБЛОН`
        }

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
_dosStart();

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