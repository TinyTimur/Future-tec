const rootSelector  = '[data-js-tabs]'        // создаем переменную в которой храниться элемент с атрибутом data-js-tabs


class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
        this.state = {
            activeTabIndex: [...this.buttonElements]
            .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        }

        this.limitTabsIndex = this.buttonElements.length - 1
        this.bindEvents() 
    }

    updateUI() {
        const {activeTabIndex} = this.state

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex
            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex
            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })
    }

    onButtonCLick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI()

    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonCLick(index))
        })
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {     // Находим все элементы по rootSelector т.е data-js-tabs в данном случае он 1
            new Tabs(element)                                               // Вызываем класс Tabs и передаем в его конструктор элемент с атрибутом data-js-tabs 
        })
    }
}


export default TabsCollection