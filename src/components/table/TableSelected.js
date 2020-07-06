import {$} from '@core/dom'

export class TableSelected {
	static cells = []

	constructor($root, e) {
		this.$el = $(e.target)
		this.$root = $root
	}

	select() {
		TableSelected.cells.forEach(el => {
			el.removeClass('selected')
		})

		TableSelected.cells.push(this.$el)
		this.$el.addClass('selected')
	}
	groupSelect() {

	}
}