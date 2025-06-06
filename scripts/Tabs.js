
import BaseComponent from "./BaseComponent.js";


const rootSelector  = '[data-js-tabs]'        // создаем переменную в которой храниться элемент с атрибутом data-js-tabs


class Tabs extends BaseComponent {
    selectors = {                                           // Селекторы элементов по data-js-smthng атрибуту
        root: rootSelector,
        button: '[data-js-tabs-button]',                      // Селектор кнопки
        content: '[data-js-tabs-content]',                    // Селектор контента
    }

    stateClasses = {
        isActive: 'is-active',                              // Для проверки наличия класса is-active
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',                  
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        super()
        this.rootElement = rootElement

        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)       // Nodelist со всеми элементами button с data-js-tabs-button атрибутом
        console.log(this.buttonElements)

        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)     // NodeList со всеми элементами content с data-js-tabs-content атрибутом
        console.log(this.contentElements)
        
        
        this.state = this.getProxyState({                                   // this.state становится {activeTabIndex: 0}
            activeTabIndex: [...this.buttonElements]
            .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))     // находим индекс buttonElement который contains is-active 
        })

        this.limitTabsIndex = this.buttonElements.length - 1          // Сохраняем максимальный индекс табов (берем общее количество кнопок вычитаем 1)

        this.bindEvents()  // Привязываем события (клики по кнопкам)
    }



    updateUI() {
        const {activeTabIndex} = this.state        // Деструктурируем из объекта state ключ значение activeTabIndex

        this.buttonElements.forEach((buttonElement, index) => {               // Для каждой кнопки производим следующую логику 
            const isActive = index === activeTabIndex                            // Создаем boolean переменную которая будет проверять соответствует ли индекс кнопки из nodeList индексу кнопки по которой нажал пользователь
            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)      // Если isActive true (activeTabIndex соответствует текущему index) то добавляем класс is-active к элементу если isActive false то убираем 
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())  // Устанавливаем значение атрибута ariaSelected у кнопки на превращенное в строку значение isActive
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')      
        })

        this.contentElements.forEach((contentElement, index) => {                    // Для каждого блока контента производим следующую логику 
            const isActive = index === activeTabIndex                                 // Создаем boolean переменную которая будет проверять соответствует ли индекс блока контента из nodeList индексу кнопки по которой нажал пользователь
            contentElement.classList.toggle(this.stateClasses.isActive, isActive)     // Если isActive true (activeTabIndex соответствует текущему index) то добавляем класс is-active к элементу если isActive false то убираем 
            
        })
    }

    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.buttonElements[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0
            ? this.limitTabsIndex
            : this.state.activeTabIndex - 1

        this.activateTab(newTabIndex)
        
    }

    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
            ? 0
            : this.state.activeTabIndex + 1

        this.activateTab(newTabIndex)
        
    }

    firstTab = () => {
        this.activateTab(0)
        
    }

    lastTab = () => {
        this.activateTab(this.limitTabsIndex)
        
        
    }


    onButtonCLick(buttonIndex) {                          // В качестве аргумента получаем buttonIndex из NodeList который соответствует индексу нажатой кнопки. 
        this.state.activeTabIndex = buttonIndex             // В объекте state переназначаем значение ключа activeTabIndex на индекс нажатой кнопки
                                           // Вызываем функцию обновления пользовательского интерфейса

    }

    onKeyDown = (event) => {
        const {code, metaKey} = event


        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]

        const isMacHomeKey = metaKey && code === 'ArrowLeft'

        if (isMacHomeKey) {
            this.firstTab()
            
            return
        }


        const isMacEndKey = metaKey && code === 'ArrowRight'

        if (isMacEndKey) {
            this.lastTab()
            
            return
        }


        action?.()
    }

    bindEvents() {    
        this.buttonElements.forEach((buttonElement, index) => {                  // В цикле каждой кнопке вешаем обработчик события по клику, который будет передавать в функцию onButtonClick(сюда будет возвращать индекс нажатой кнопки)
            buttonElement.addEventListener('click', () => this.onButtonCLick(index))
        })
        this.rootElement.addEventListener('keydown', this.onKeyDown)
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {     // Находим все элементы по rootSelector т.е data-js-tabs в данном случае он 1
            new Tabs(element)                                               // Вызываем класс Tabs и передаем в его конструктор элемент с атрибутом data-js-tabs и для каждого из них создаем 
        })
    }
}



export default TabsCollection