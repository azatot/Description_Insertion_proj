


function _dosStart(){
    const stylesObj = {
        firstEL: `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 50px;
            background-color: gray;
            cursor: pointer;
            border: 1px solid;
        `,
        wrapper: `
            display: flex;
            flex-direction: row;
            width: 300px;
            justify-content: space-around;
        
        `
    }

    const _templates = {
        firstTemplate: {
            RU: `(РУС) ПЕРВЫЙ ШАБЛОН`,
            UA: `(УКР) ПЕРШИЙ ШАБЛОН`
            
        },
    
        secondTemplate: {
            RU: `(РУС) ВТОРОЙ ШАБЛОН`,
            UA: `(УКР) ДРУГИЙ ШАБЛОН`
        }
    
    }
    
    function NewNode(tag = "div", id){
        this.tag = document.createElement(tag);
        this.tag.id = id;

        if (this.tagName = "INPUT") {
            this.tag.type = "submit";
        }
        
        return this.tag;
    }

    const categories = ["категория 1", "категория 2", "категория 3", "4"];
    const showButton = new NewNode("input", "dos_button");
    const applyButton = new NewNode("input")
    const select = new NewNode("select");
    const wrapper = new NewNode("div");
    document.body.prepend(wrapper);
    wrapper.append(showButton);
    
    

    showButton.style.cssText = stylesObj.firstEL;
    wrapper.style.cssText = stylesObj.wrapper;

    
    function generateList () {
        if ( !(select.children.length >= categories.length) ) {
            for (let i = 0; i < categories.length; i++) {
                let option = new NewNode("option");
                const el = categories[i];
                option.innerText = el;
                option.value = "val" + Number(i+1);
                select.append(option);
                select[i].selected=true;

                wrapper.append(applyButton);
            } 
        } else {
            return;
        }
    }

    function checkOption(){
        
    }





    function showList () {
        wrapper.append(select);
        generateList();

    }







    showButton.addEventListener("click", showList);
}
_dosStart();
