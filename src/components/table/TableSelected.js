import {$} from '@core/dom'

function getArray(arrLetters, rowCurrent, rowLast) {
	let arr = [] 

	for (let index = rowCurrent; index <= rowLast; index++) {

		arr.push(arrLetters.map(letter => {
			return `[data-selected="${letter}:${index}"]`
		}))
	}

	return arr
}

export class TableSelected {
	static cells = []
	static $current = null

	constructor($root, e) {
		this.$el = e ? $(e.target) : ''
		this.$current = null
		this.$root = $root
	}

	initSelect() {
		const cellSelector = $(this.$root.find('[data-selected="A:1"]'))
		cellSelector.addClass('selected')
		TableSelected.cells.push(cellSelector)
		TableSelected.$current = cellSelector.data.selected
	}

	select() {
		TableSelected.cells.forEach(el => {
			el.removeClass('selected')
		})

		TableSelected.cells = []

		TableSelected.$current = this.$el.data.selected

		TableSelected.cells.push(this.$el)
		
		this.$el.addClass('selected')
	}
	groupSelect() {
		const current = TableSelected.$current
		const last = this.$el.data.selected

		let colLetterCurrent = +current.split(':')[0].charCodeAt(0)
		let colLetterLast = +last.split(':')[0].charCodeAt(0)

		let rowCurrent = +current.split(':')[1]
		let rowLast = +last.split(':')[1]

		let lettersArr = []

		if (colLetterCurrent > colLetterLast ) {
			[colLetterCurrent, colLetterLast] = [colLetterLast, colLetterCurrent]
		}

		if (rowCurrent > rowLast ) {
			[rowCurrent, rowLast] = [rowLast, rowCurrent]
		}
		
		for (let i = colLetterCurrent; i <= colLetterLast; i++) {
			lettersArr.push(String.fromCharCode(i))
		}

		const complexArr = getArray(lettersArr, rowCurrent, rowLast)

		complexArr.flat().forEach(selector => {
			const cellSelector = $(this.$root.find(selector))
			cellSelector.addClass('selected')
			TableSelected.cells.push(cellSelector)
		})
	}
}