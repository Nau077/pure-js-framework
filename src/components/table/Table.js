import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
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
  }

  toHTML() {
    return createTable(30)
  }

  onMousedown(e) {
	 if (e.target.dataset.resize) {
		 tableResize(this.$root, e)
	 } else if (e.target.dataset.selected && e.shiftKey){
		 const tableSelect = new TableSelected(this.$root, e)
		 tableSelect.groupSelect()
	 } else if (e.target.dataset.selected) {
		const tableSelected = new TableSelected(this.$root, e)
		tableSelected.select()
	 }
  }

}