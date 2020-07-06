import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  toHTML() {
    return ''
  }

  toPrepare() {
    return ''
  }

  init() {
    this.initDomListeners()
  }
  remove() {
    this.removeDomListeners()
  }
}