class Dom {
  constructor(selector) {
    // el это главный селектор каждого элемента: напр. формулы
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  //  this.$$listeners = {}
  }
  // чтобы вставить в div наш html 
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn)
    // this.$$listeners[eventType] = fn
  }

  off(eventType, fn) {
    // this.$el.removeEventListener(this.$$listeners[eventType])
    this.$el.removeEventListener(eventType, fn)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  closest(selector) {
	  return $(this.$el.closest(selector))
  }

  getCoords() {
	  return this.$el.getBoundingClientRect()
  }

  get data() {
	  return this.$el.dataset
  }

  findAll(selector) {
	  return this.$el.querySelectorAll(selector)
  }

  find(selector) {
	  return this.$el.querySelector(selector)
  }

  css(style = []) {
	  for (let [key, value] of style) {
		this.$el.style[key] = value
	  }
	  return this.$el
  }

  addClass(className) {
	this.$el.classList.add(className)
  }
  
  removeClass(className) {
	  this.$el.classList.remove(className)
  }
}

// event.target
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
