export const CODES = {
	'A' : 65,
	'Z' : 90
}

function toCell(rowNumber) {

	return function (cell) {
		return `
			<div class="cell" contentitable data-letter="${cell}" data-selected="${cell}:${rowNumber+1}">
				<div data-cellresize="${cell}"></div>
			</div>
		`
	}
}

function toColumn(col) {
	return `
		<div class="column" data-type="resizable" data-letter="${col}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function toRow(index, cols) {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
	const dataRow = index ? `data-row-number=${index}` : ''
	return `
	 <div class='row' data-type="resizable" ${dataRow}>
		 <div class='row-info'>
			${index ? index : ''}
			${resize}
		 </div>
	 	<div class='row-data'>${cols}</div>
	 </div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount) {
	const rows = []
	const colsCount = CODES.Z - CODES.A +1

 	const cols = new Array(colsCount)
			.fill("")
			.map(toChar)
			.map(toColumn)
			.join('')

	rows.push(toRow(null, cols))

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(rowsCount)
			.fill("")
			.map(toChar)
			.map(toCell(i))
			.join('')

		 rows.push(toRow(i+1, cells))
	}
	
	return rows.join('')
}