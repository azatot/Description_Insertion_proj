// створюємо в хеді документу тег стилів та даємо йому id для ідентифікації в подальшому
setTimeout(function () {
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
        <div id="dos_select_wrapper" class="dos_select_wrapper">
            <select id="dos_templates_options" class="dos_select_list">
                <option selected disabled>Категория</option>
            </select>
            <input value="╋" type="submit" id="dos_add_new_option" class="dos_buttons dos_button_add">
        </div>
        <input type="submit" value="Вставить" id="dos_paste_button" class="dos_buttons">
        <input type="submit" value="Сброс" id="dos_reset_button" class="dos_buttons dos_reset_button">
        
        <div id="dos_preview_block" class="dos_preview_block">
            <label for="dos_preview_area_ru">RU</label> 
            <textarea readonly name="RU" id="dos_preview_area_ru" cols="30" rows="10" placeholder="Только для чтения" class="dos_text_area">
            </textarea>
            <label for="dos_preview_area_ua">UA</label> 
            <textarea readonly name="UA" id="dos_preview_area_ua" cols="30" rows="10" placeholder="Только для чтения"class="dos_text_area">
            </textarea>
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

    let arr = [];

    let dos_target_area_ru = document.querySelectorAll("iframe")[0].contentDocument.body;;
    let dos_target_area_ua = document.querySelectorAll("iframe")[1].contentDocument.body;;

    let state;



    // модель створення стилів, та їх розміщення в тегу <style> усередині <head> сайта
    class CSS_Style {
        constructor(name, props) {
            this.innerHTML = `${name} { ${props} }`;
            return styles.innerHTML += this.innerHTML;
        };
    };

    // собсна безпосереднє створення цих самих стилів та
    (function () {
        const dos_wrapperClass = new CSS_Style('.dos_wrapper', `
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5em;
    
    height: 49px;
    background-color: rgb(233, 233, 233);
    transition: 0.2s;
    z-index: 1;
    box-shadow: 0px 0px 12px 3px #4c4c4c4d;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
`);
        const dos_buttonsClass = new CSS_Style('.dos_buttons', `
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
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
`)

        const dos_select_listClass = new CSS_Style('.dos_select_list', `
    display: flex;
    height: 48px;
    border: none;
    border-radius: 15px 0 0 15px;
    font-size: unset;
    padding-left: 0.3em;
    padding-right: 0.5em;
    width: 185px;
`);
        const dos_preview_blockClass = new CSS_Style('.dos_preview_block', `
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1em;
`);
        const dos_text_areaClass = new CSS_Style(`.dos_text_area`, `width: 220px; height: 200px`);
        const dos_select_wrapper = new CSS_Style(`.dos_select_wrapper`, `
display: flex;
border-top: 1px solid;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin: 1em 0 0 ;
padding: 1em 0;
width: -webkit-fill-available;
`);
        const dos_button_add = new CSS_Style(`.dos_button_add`, `
    display: flex;
    min-width: 20px;
    width: 25px;
    line-height: 0px;
    border-radius: 0 15px 15px 0;
    border: none;
    background: #c8d7ff;
    padding: 22px 25px 25px 25px;
`)
    })();

    // для збереження початкового стану (тексту html) внутрішнього документу
    (function getStateOfAreas() {
        state = {
            stateRU: String(dos_target_area_ru.innerHTML),
            stateUA: String(dos_target_area_ua.innerHTML)
        };
    })();

    // для установки  початкового стану (скидування)
    function setStateToAreas() {
        console.log(state.stateRU);
        dos_target_area_ru.innerHTML = state.stateRU;
        dos_target_area_ua.innerHTML = state.stateUA;
    }

    // функція старту плагіна та його логіки
    function _dos_template_start() {
        // визначення усіх елементів плагіну
        const dos_wrapper = document.querySelector("#dos_wrapper"),
            dos_openButton = document.querySelector("#dos_open_button"),
            dos_list_wrapper = document.querySelector("#dos_list_wrapper"),
            dos_templates_options = document.querySelector("#dos_templates_options"),
            dos_paste_button = document.querySelector("#dos_paste_button"),
            dos_reset_button = document.querySelector("#dos_reset_button"),
            dos_preview_block = document.querySelector("#dos_preview_block"),
            dos_preview_area_ru = document.querySelector("#dos_preview_area_ru"),
            dos_preview_area_ua = document.querySelector("#dos_preview_area_ua"),
            dos_add_new_option = document.querySelector("#dos_add_new_option"),

            textareas = dos_preview_block.querySelectorAll("textarea");

        //модель створення опцій для списку select
        class Template {
            constructor(label, textRU, textUA) {
                this.ru = String(textRU);
                this.ua = String(textUA);
                this.option = document.createElement("option");
                this.option.label = label;
                this.option.value = label;
                arr.push(this);
                return dos_templates_options.append(this.option);
            };
        };
        // створення опції
        const buzzer = new Template(`Buzzer`, "ru", "ua");
        const speaker = new Template(`Speaker`, `<div href="">RURU</div>`, `<div href="">UAUA</div>`);
        
        const sim_holder = new Template(`SIM-держатель`, `
            <p><strong>{$prefix}&nbsp;{$brand_name}&nbsp;{$name}&nbsp;{$mod}.</strong></p><p style="margin-bottom: 24px;"><u><strong>Держатель SIM-карты (лоток) смартфона</strong></u>&nbsp;&mdash; это маленькая и довольно хрупкая деталь. Держатели к разным смартфонам изготовлены из разных материалов, в зависимости от бренда и модели: пластик, метал, а также композитные. Наиболее осторожными нужно быть с пластиковым держателем, так как он является самым хрупким, металлические, в свою очередь - чаще теряются. Ломаются держатели от того, что их вставляют небрежно или не той стороной, также при неосторожной установке сим-карты. В худшем случае, вы можете повредить контактные усики внутри разъема (коннектора) или вовсе отломать разъем от контактов платы. Ломают держатели реже, так как владельцами устройств используется совсем не часто. Самой распостраненной причиной замены нового держателя является потеря старого.</p><hr/><div>Когда нужно купить новый держатель сим карты:</div><div>&nbsp;</div><div>держатель был утерян;</div><div>сим-лоток деформирован;</div><div>на поверхность лотка попадала вода или любая другая жидкость;</div><div>появление ржавчины на лотке (в случае металлических держателей);</div><div>отсутствует часть или половина сим держателя;</div><div>если слот симкарты застрял в неподвижном положении - следует обратится в сервисный центр.<br/>​</div><hr/><p style="margin-bottom: 24px;"><br/>Если же у вас недостаточно опыта в обращении с техникой или составляющими мелкими деталями - не стоит самостоятельно пытаться склеить или почистить лоток. Также категорически не рекомендуем использовать держатель с другой модели смартфона.&nbsp;</p><p style="margin-bottom: 24px;">Обратитесь в сервисный центр нашего магазина, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке, помогут выбрать нужный товар и проконсультируют вас.</p><style type="text/css">.gost:hover{color: green; /* Цвет ссылки */}</style>`, `
            <div><div><strong>{$prefix}{$brand_name}{$name}{$mod}.</strong></div><div>&nbsp;</div><div><u><strong>Тримач SIM-карти (лоток) смартфона</strong></u>&nbsp;- це маленька і досить тендітна деталь. Тримачі до різних смартфонів виготовлені з різних матеріалів, залежно від бренду та моделі: пластик, метал, а також композитні. Найбільш обережними потрібно бути з пластиковим тримачем, так як він є найтендітнішим, металеві, в свою чергу - частіше губляться. Ламаються тримачі від того, що їх вставляють недбало або не тією стороною, а також при необережній установці сім-карти. У гіршому випадку, ви можете пошкодити контактні вусики всередині роз&#39;єму (коннектора) або зовсім відламати роз&#39;єм від контактів плати. Ламають тримачі рідше, так як власниками пристроїв використовується зовсім не часто. Найбільш поширеною причиною заміни тримача є втрата старого.</div><div>&nbsp;</div><div><hr/><div>Коли варто купувати новий тримач сім:</div></div><ul><li>&nbsp;</li><li><div>тримач був загублений;</div><div>сім-лоток деформований;</div><div>відсутня частина або половина лотка;</div><div>на поверхню лотка потрапляла вода або будь-яка інша рідина;</div><div>поява іржі на лотку (в разі металевих утримувачів);</div><div>якщо слот сім карти застряг в нерухомому положенні - варто звернутися до сервісного центру.</div><div>&nbsp;</div></li></ul><div><hr/><p><br/>Якщо ж у вас недостатньо досвіду в поводженні з технікою або складовими дрібними деталями - не варто самостійно намагатися склеїти або очистити лоток. Також категорично не рекомендуємо використовувати тримач з іншої моделі смартфона.</p></div><div>&nbsp;</div><div>Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку, допоможуть вибрати потрібний товар і проконсультують вас.</div><div>&nbsp;</div></div><style type="text/css">.gost:hover{color: green; /* Цвет ссылки */}</style>
        `);
        const micro = new Template(`Микрофон`, `
            <div><span style="font-family:tahoma,geneva,sans-serif;"><u><strong>Микрофон</strong></u> - одна из важнейших деталей смартфона, так как именно с помощью его мы можем общаться с другими людьми и сложно было бы себе представить телефон без микрофона. Основной задачей микрофона является преобразование звуковых волн в электромагнитные. Зачастую, производители устанавливают в свои мобильные устройства микрофоны 2-х типов: микрофон шумоподавления и цифровой (основной).&nbsp; Данные компоненты часто распаяны на нижней плате телефона. А наружу видны только крохотные круглые отверстия в нижней части корпуса. В случае с основным микрофоном, именно через такое отверстие звук и поступает в микрофон.</span></div><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">Основные <strong>признаки</strong> неисправности микрофона:</span><br/>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">ваш собеседник плохо вас слышит или не слышит вовсе;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">вы или ваш собеседник слышите шум во время звонка;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">микрофон перестает работать в отдельном приложении.</span></li></ul><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;"><strong>Причины</strong> неисправности:</span><br/>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">повреждение шлейфа;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">в микрофон попадала влага или пыль;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">микрофон физически поврежден;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">программные неполадки устройства.</span></li></ul><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">В таком случае, не стоит пытаться самостоятельно чистить или чинить микрофон, не имея опыта такой работы, подобные действия могут привести к повреждению корпуса, самого микрофона или платы, на которой тот расположен.</span></div><div><span style="font-family:tahoma,geneva,sans-serif;">Обратитесь в сервисный центр нашего магазина, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке и проконсультируют вас.</span></div>`, `
            <div><span style="font-family:tahoma,geneva,sans-serif;"><u><strong>Мікрофон</strong></u> - одна з найважливіших деталей смартфона, так як саме за допомогою нього ми можемо спілкуватися з іншими людьми і важко було б собі уявити телефон без мікрофона. Головною завданням мікрофону є перетворення звукових хвиль на електромагнітні. Часто, виробники встановлюють в свої мобільні пристрої мікрофони 2-х типів: мікрофон шумозаглушення та цифровий(основний). Дані компоненти часто розпаяні на нижній платі телефону. А назовні видно тільки крихітні круглі отвори в нижній частині корпусу. У випадку з основним мікрофоном, саме через такий отвір звук і потрапляє до мікрофону.&nbsp;</span><br/>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">Основні <strong>ознаки </strong>несправності мікрофона:</span></div><div>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">ваш співрозмовник погано вас чує або не чує зовсім;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">ви або ваш співрозмовник чуєте шум під час дзвінка;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">мікрофон перестає працювати в окремому додатку.</span></li></ul><div><br/><span style="font-family:tahoma,geneva,sans-serif;"><strong>Причини </strong>несправності:</span></div><div>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">пошкодження шлейфу;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">в мікрофон потрапляла волога або пил;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">мікрофон фізично пошкоджений;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">програмні збої.</span></li></ul><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">В такому випадку, не варто намагатися самостійно чистити або лагодити мікрофон, не маючи досвіду такої роботи, подібні дії можуть привести до пошкодження корпусу, самого мікрофона або плати зарядки, на якій той розміщений.</span></div><div><span style="font-family:tahoma,geneva,sans-serif;">Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку і проконсультують вас.</span></div>
        `);
        const camera_lens = new Template(`Стекло камеры`, `
            <p><strong>{$prefix}&nbsp;{$brand_name}&nbsp;{$name}&nbsp;{$mod}.</strong></p><p><u><strong>Стекло камеры</strong></u>&nbsp;- наружная часть камеры устройства, которая не является составной модуля камеры, а крепится поверх модуля, также может быть частью задней крышки корпуса смартфона и выступать наружу. Основной функцией стекла камеры является защита. Оно защищает камеру от пыли, влаги и мусора, которые могут негативно повлиять на качество съемки или, в худшем случае, повредить модуль камеры.&nbsp;</p><hr/><p>Основные&nbsp;<strong>причины</strong>&nbsp;замены:</p><ul><li>царапины или трещины на стекле камеры;</li><li>нарушение герметичности (люфты и зазоры);</li><li>попадание влаги под стекло;</li><li>деформация или повреждения рамки стекла;</li><li>потеря стекла камеры.</li></ul><hr/><p><br/>В таком случае, не стоит пытаться самостоятельно чистить или доставать стекло, не имея опыта такой работы, подобные действия могут привести к повреждению корпуса, рамки камеры, или неработоспособности модуля камеры.</p><p>Обратитесь в сервисный центр нашего магазина, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке и проконсультируют вас.</p>`, `
            <p><strong>{$prefix}&nbsp;{$brand_name}&nbsp;{$name}&nbsp;{$mod}.</strong></p><p><u><strong>Скло камери</strong></u>&nbsp;- зовнішня частина камери пристрою, яка не є складовою модуля камери, а кріпиться поверх модуля, також може бути частиною задньої кришки корпусу смартфона і виступати назовні. Основною функцією скла камери є захист. Воно перешкоджує потраплянню пилу, вологи і сміття, що може негативно вплинути на якість зйомки або, в гіршому випадку, пошкодити модуль камери.</p><hr/><div>Основні&nbsp;<strong>причини&nbsp;</strong>заміни:</div><div>&nbsp;</div><ul><li>подряпини або тріщини на склі камери;</li><li>порушення герметичності (люфти і зазори);</li><li>потрапляння вологи під скло;</li><li>деформація або пошкодження рамки скла;</li><li>втрата скла камери.</li></ul><hr/><p><br/>У такому випадку, не варто намагатися самостійно чистити або діставати скло, не маючи досвіду такої роботи, подібні дії можуть привести до пошкодження корпусу, рамки камери, або непрацездатності модуля камери.</p><p>Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку і проконсультують вас.</p>
        `);
        const button_hover = new Template(`Кнопка(Home)`, 
            `<div> {$prefix} {$brand_name} {$name} {$mod} - одна из основных и наиболее часто взаимодействующих с владельцем деталей смартфона, что ускоряет появление царапин, потертостей и других неприятных визуальных или функциональных повреждений. У пользователей бывают случаи, когда накладка отваливалась и терялась, а также кнопка может западать или болтаться в отсутствии фиксации. Подобные признаки могут стать причиной замены. </div> <div> </div> <div> Если вы решили обратиться за помощью в наш магазин или сервисный центр, то вы получите помощь от опытных профессионалов, которые смогут определить точную причину поломки и проконсультировать при покупке нужной детали. Если вы имеете опыт в разборке уcтройств и починке мелких комплектующих, тогда можете провести замену самостоятельно.</div> `, 
            `<div> {$prefix} {$brand_name} {$name} {$mod} - одна з основних і найбільш часто взаємодіючих з власником деталей смартфона, що прискорює появу подряпин, потертостей та інших неприємних візуальних або функціональних пошкоджень. У користувачів бувають випадки, коли накладка відвалювалася і губилася, а також кнопка може западати або рухатися при відсутності фіксації. Подібні ознаки можуть стати причиною заміни.</div><div> &nbsp;</div><div> Якщо ви вирішили звернутися за допомогою в наш магазин або сервісний центр, то ви отримаєте допомогу від досвідчених професіоналів, які зможуть визначити точну причину поломки і проконсультувати при покупці потрібної деталі. Якщо ви маєте досвід в розбиранні пристроїв і лагодження дрібних комплектуючих, тоді можете провести заміну самостійно.</div>`);
            
        // показати весь плагін
        dos_openButton.onclick = function () {
            if (!(dos_list_wrapper.classList.contains('dos_list_wrapper'))) {
                this.value = "Спрятать";
                dos_list_wrapper.classList.toggle('dos_list_wrapper')
                dos_wrapper.style.height = "100%";
            } else {
                this.value = "Показать";
                dos_wrapper.style.height = "49px";
                dos_list_wrapper.classList.toggle('dos_list_wrapper');
            };
        };

        // вставити в поля для прев'ю
        dos_templates_options.onchange = function () {
            textareas.forEach(el => {
                el.readOnly = true;
            });
            dos_preview_area_ru.textContent = arr[this.selectedIndex - 1].ru;
            dos_preview_area_ua.textContent = arr[this.selectedIndex - 1].ua;
        };


        // для вставки в основні поля 
        dos_paste_button.onclick = function () {
            dos_target_area_ru = document.querySelectorAll("iframe")[0].contentDocument.body;
            dos_target_area_ua = document.querySelectorAll("iframe")[1].contentDocument.body;
            dos_target_area_ru.innerHTML = dos_preview_area_ru.textContent;
            dos_target_area_ua.innerHTML = dos_preview_area_ua.textContent;

        };

        // для додавання шаблону через інтерфейс
        dos_add_new_option.onclick = function () {
            alert("Данная функция в разработке...")
        }

        // для повернення в поля початкового тексту
        dos_reset_button.onclick = setStateToAreas;
    };


    _dos_template_start();
}, 500);

