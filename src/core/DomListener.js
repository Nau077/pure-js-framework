import { makeEventName } from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    // this здесь это formula/др компоненты
     this.listeners.forEach(listener => {
       const method = getMethodName(listener)
       if (!method) {
         throw new Error(`${method} is not implemented in ${this.name || ''} component`)
       }
       // сделать method глобальным методом класса, чтобы функция метода не вызывалась заново, а была одной и той же
	   this[method] = this[method].bind(this)
       this.$root.on(listener, this[method])
     })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => { 
      const method = getMethodName(listener)

      this.$root.off(listener, this[method])
      
    })
  }
}

function getMethodName(listener) {
  return 'on' + makeEventName(listener)
}
