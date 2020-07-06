import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    // создаём главный div excel
    const $root = $.create('div', 'excel')
    // проходимся по компонентам, создаём в каждом div с необходимым классом
    // вкладываем в этот div html
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // debug
      if (component.name) {
        window['s' + component.name] = component
      }
      // debug
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
     
    return $root
  }

  render() {
    // вставить div (например, excel) в селектор app
    this.$el.append(this.getRoot())
    this.components.forEach(component => {
      component.initDomListeners()    
    });
  }
}


 
