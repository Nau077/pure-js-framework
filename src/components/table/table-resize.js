import {$} from '@core/dom'

export function tableResize($root, e) {
	const $resizer = $(e.target)
	// const $parent = $resizer.$el.parentNode // bad, если column перестанет быть прямым родителем, всё сломается
	// const $parent = $resizer.$el.closest('.column') // привяка селектора стилей, не даёт поменять селектор
	const $parent = $resizer.closest('[data-type="resizable"]')
	const letter = $parent.$el.innerText
	const coords = $parent.getCoords()
	const cells = $root.findAll(`[data-letter="${letter}"]`)
	const type = $resizer.data.resize
	const resizeField = type == 'col' ? 'bottom': 'right'
	let value

	$resizer.css([
		['opacity', 1],
		[resizeField, '-6000px']
	])

	 document.onmousemove = event => {
		 if (type == 'col') {
			const delta = event.pageX - coords.right 
			value = coords.width + delta
			$resizer.css([
				['right', -delta + 'px']
			]) 
		 } else {
			const delta = event.pageY - coords.bottom 
			value = coords.height + delta
			$resizer.css([
				['bottom', -delta + 'px']
			])
		 }
	 }

	 document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null

		if (type == 'col') {
			$parent.css([
				['width', value + 'px']
			])

			cells.forEach(cell => {
				cell.style.width = value + 'px'
			}); 

		} else {
			$parent.css(
				[
					['height', value + 'px']
				]
			)
		}
		$resizer.css([
				['opacity', 0],
				['bottom', 0],
				['right', 0]
			])			
	 }
}