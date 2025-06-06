class BaseComponent {
    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error('Cant create new BaseComponent');
        }
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop]
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop]

                target[prop] = newValue

                if (newValue !== oldValue) {
                    this.updateUI()
                }


                return true
            },
        })
    }
    // Перерисовка UI в ответ на обновление сотсояния
    updateUI() {
        throw new Error('Need to state method "updateUI"')
    }
}

export default BaseComponent;