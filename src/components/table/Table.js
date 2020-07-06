import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table-template'
import {tableResize} from './table-resize'
import {TableSelected} from '@/components/table/TableSelected'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
	super($root, {
		listeners : ['mousedown']
	})
  }

  toPrepare() {
	const tableSelect = new TableSelected(this.$root)
	tableSelect.initSelect()
  }

  toHTML() {
    return createTable(26)
  }

  onMousedown(e) {
	 if (e.target.dataset.resize) {
		 tableResize(this.$root, e)
	 }
	 
	 if (e.target.dataset.selected) {
		const tableSelect = new TableSelected(this.$root, e)

		if (e.shiftKey) {
			tableSelect.groupSelect()
		} else {
			tableSelect.select()
		}
	 }
  }

}