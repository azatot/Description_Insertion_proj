// створюємо в хеді документу тег стилів та даємо йому id для ідентифікації в подальшому
(function createStylesTagInHead() {
    const styles = document.createElement("style");
    const mainHead = document.querySelector("head");

    mainHead.append(styles);

    styles.type = 'text/css';
    styles.id = "dos_styles_sheet";

})();

// собсна весь хтмл я вставлю саме так, бо гємора буде хоть жопой жуй, якшо я буду верстати на ванільному JS, як даун
(function allPluginHTML() {
    const _allHTML = `
    <input type="submit" id="dos_open_button" class="dos_buttons" value="Показать">

    <div id="dos_list_wrapper" class="dos_list_wrapper_unactive">
        <select id="dos_templates_options" class="dos_select_list">
            <option selected disabled>Категория</option>
        </select>
        <input type="submit" value="Вставить" id="dos_paste_button" class="dos_buttons">
    
        <div id="dos_preview_block" class="dos_preview_block">
        <label for="dos_preview_area_ru">RU</label>
        <textarea name="RU" id="dos_preview_area_ru" cols="30" rows="10" placeholder="Только для чтения" class="dos_text_area"></textarea>
        <label for="dos_preview_area_ua">UA</label>
        <textarea name="UA" id="dos_preview_area_ua" cols="30" rows="10" placeholder="Только для чтения" class="dos_text_area"></textarea>
        </div>
    
    </div>
    `;

    let _dos_wrapper = document.createElement("div");
    _dos_wrapper.id = "dos_wrapper";
    _dos_wrapper.className = "dos_wrapper";
    document.body.prepend(_dos_wrapper);
    _dos_wrapper.innerHTML = _allHTML;
})();

// пакуємо айдішнік стилів з хеду в константу
const styles = document.querySelector("#dos_styles_sheet");
console.log(styles);

// модель створення стилів, та їх розміщення в тегу <style> усередині <head> сайта
class CSS_Style {
    constructor(name, props) {
        this.innerHTML = `${name} { ${props} }`;
        return styles.innerHTML += this.innerHTML;
    };
};

// собсна безпосереднє створення цих самих стилів та
(function(){
const dos_wrapperClass = new CSS_Style('.dos_wrapper', `
    position: fixed;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
    height: 50px;
    border-radius: 5px;
    
    background-color: rgb(233, 233, 233);
    transition: 0.2s;
    z-index: 1;
    box-shadow: 0 0 9px 2px #4c4c4cb0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
`);
const dos_buttonsClass = new CSS_Style('.dos_buttons', `
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    margin: 15px 0;
    padding: 0.7em 0.5em;
    min-width: 234px;
    
    background: lightgrey;
    border: 1px solid;
    z-index: 100;

    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1em;
`);
const dos_list_wrapperClassUnactive = new CSS_Style('.dos_list_wrapper_unactive', `
    display: none;

`);
const dos_list_wrapperClass = new CSS_Style('.dos_list_wrapper', `
    display: flex;
    flex-direction: column;
    align-items: center;

    border-top: 1px solid;
    padding-top: 1em;
`)

const dos_select_listClass = new CSS_Style('.dos_select_list',`
    display: flex;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    font-size: larger;
    padding-left: 1em;
`);
const dos_preview_blockClass = new CSS_Style('.dos_preview_block',`
    display: flex;
    flex-direction: column;
    justify-content: center;
`);
const dos_text_areaClass = new CSS_Style(`.dos_text_area`,`width: 300px; height: 200px`);

})();


// функція старту плагіна та його логіки
function _dos_template_start(){
    // визначення усіх елементів плагіну
    const dos_wrapper = document.querySelector("#dos_wrapper"),
        dos_openButton = document.querySelector("#dos_open_button"),
        dos_list_wrapper = document.querySelector("#dos_list_wrapper"),
        dos_templates_options = document.querySelector("#dos_templates_options"),
        dos_paste_button = document.querySelector("#dos_paste_button"),
        dos_preview_block = document.querySelector("#dos_preview_block"),
        dos_preview_area_ru = document.querySelector("#dos_preview_area_ru"),
        dos_preview_area_ua= document.querySelector("#dos_preview_area_ua"),
    
        dos_target_area_ru = document.querySelector("#textarea1"),
        dos_target_area_ua = document.querySelector("#textarea2");
    
        
    //модель створення опцій для списку select
    class Template {
        constructor(label, textRU, textUA) {
            this.ru = String(textRU);
            this.ua = String(textUA);
            this.option = document.createElement("option");
            this.option.label = label;
            console.log(this);
            console.log(dos_templates_options)
            return dos_templates_options.append(this.option);
        };
    };
    // створення опції
    const buzzer = new Template(` - buzzer`, "ru", "ua");
    const speaker = new Template(` - speaker`, `<div href="">RURU</div>`, `<div href="">UAUA</div>`);

    // показати весь плагін
    dos_openButton.onclick = function(){
        if (!(dos_list_wrapper.classList.contains('dos_list_wrapper'))) {
            this.value = "Спрятать";
            dos_list_wrapper.classList.toggle('dos_list_wrapper')
            dos_wrapper.style.height = "600px";

        } else {
            this.value = "Показать";
            dos_wrapper.style.height = "50px";
            dos_list_wrapper.classList.toggle('dos_list_wrapper');

        };
    };

    // вставити в поля для прев'ю
    dos_templates_options.onchange = function(){
        switch(this.selectedIndex){
            case 1:
                getTextFromTemplate(buzzer.ru, buzzer.ua);
            break;

            case 2:
                getTextFromTemplate(speaker.ru, speaker.ua);
            break;
            default:
                alert("Нет такого...");
            break;
        };
    };

    // для вставки в поля 
    getTextFromTemplate = (textRU, textUA)=>{
        dos_preview_area_ru.innerHTML = textRU;
        dos_preview_area_ua.innerHTML = textUA;
    };

    // для вставки в основні поля 
    dos_paste_button.onclick = function(){
        dos_target_area_ru.textContent = dos_preview_area_ru.textContent;
        dos_target_area_ua.textContent = dos_preview_area_ua.textContent;
    };

};
_dos_template_start();



