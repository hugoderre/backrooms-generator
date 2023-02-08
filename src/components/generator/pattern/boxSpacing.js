import { getRandomEvenInt } from '../../Helpers'
import CrossPartBox from '../box/CrossPartBox'
import RegularBox from '../box/RegularBox'

export default function boxSpacing( basePosition ) {
	const random = Math.floor( Math.random() * 2 )
	// switch ( random ) {
	// 	case 0:
	// 		return generateEmptySpace( basePosition )
	// 	case 1:
	return generateCrossSpace( basePosition )
	// default:
	// 	return []
	// }
}

function generateEmptySpace( basePosition ) {
	const newBoxes = []
	const [ x, y, z ] = basePosition
	const quantity = getRandomEvenInt( 4, 6 )
	const row = getRandomEvenInt( 2, 4 )
	for ( let i = 0; i < quantity; i++ ) {
		const rowNumber = Math.floor( i / row )
		const colNumber = i % row
		const position = [ x + colNumber * 2, y, z + rowNumber * 2 ]
		newBoxes.push( <RegularBox key={position.join()} position={position} scale={2} visibleWalls={{
			top: false,
			bottom: true,
			left: false,
			right: false,
		}} /> )
	}

	return newBoxes
}

function generateCrossSpace( basePosition ) {
	const newBoxes = []
	const [ x, y, z ] = basePosition
	const quantity = 8
	const row = 2
	for ( let i = 0; i < quantity; i++ ) {
		const rowNumber = Math.floor( i / row )
		const colNumber = i % row
		const position = [ x + colNumber * 2, y, z + rowNumber * 2 ]
		newBoxes.push( <CrossPartBox key={position.join()} position={position} scale={2} crossRotationDelta={i} /> )
	}

	return newBoxes
}