import { useState, useEffect } from 'react'
import RegularBox from './RegularBox'
import { getRandomEvenInt } from './Helpers'

export default function Generator( props ) {
	const initialPosition = [ 0, 0, 0 ]
	const [ boxes, setBoxes ] = useState( [ <RegularBox
		key={initialPosition.join()}
		position={initialPosition}
		scale={2}
		visibleWalls={{
			top: false,
			back: true,
			left: true,
			right: true,
		}}
	/>
	] )
	const [ lastGeneratedBoxes, setLastGeneratedBoxes ] = useState( boxes )
	const [ gIndex, setGIndex ] = useState( 1 )
	let generatedBoxes = []

	useEffect( () => {
		generate()
	}, [ boxes ] )

	function generate() {
		if ( gIndex < 1 || gIndex > 15 ) {
			return
		}

		generatedBoxes = []

		for ( let i = 0; i < lastGeneratedBoxes.length; i++ ) {
			generatedBoxes.push( ...generateNewBoxes( lastGeneratedBoxes[ i ] ) )
		}

		setGIndex( gIndex + 1 )
		setBoxes( boxes.concat( ...generatedBoxes ) )
		setLastGeneratedBoxes( generatedBoxes )
	}

	function generateNewBoxes( baseBox ) {
		const { position: basePos, scale: baseScale, visibleWalls: baseVisibleWalls } = baseBox.props
		const [ x, y, z ] = basePos

		const newBoxesData = [
			{ position: [ x, y, z + baseScale ] },
			{ position: [ x, y, z - baseScale ] },
			{ position: [ x + baseScale, y, z ] },
			{ position: [ x - baseScale, y, z ] },
		]

		let generatedBoxesInProcess = []

		for ( let i = 0; i < newBoxesData.length; i++ ) {
			const { position } = newBoxesData[ i ]
			if ( isEmptyBoxesSpace() ) {
				generatedBoxesInProcess.push( ...getEmptyBoxesSpace( position, 4, 2 ) )
			} else if ( isSameBoxThanBaseBox() ) {
				generatedBoxesInProcess.push( <RegularBox key={position.join()} position={position} scale={2} visibleWalls={baseVisibleWalls} /> )
			} else {
				generatedBoxesInProcess.push( <RegularBox key={position.join()} position={position} scale={2} visibleWalls={getRandomVisibleWall()} /> )
			}
		}

		// Find duplicate boxes
		const occurence = {}
		for ( const box of generatedBoxesInProcess ) {
			occurence[ box.key ] ? occurence[ box.key ]++ : occurence[ box.key ] = 1
		}

		// Remove duplicate boxes and boxes that are already generated
		generatedBoxesInProcess = generatedBoxesInProcess.filter( box => {
			return ![ ...generatedBoxes, ...boxes ].find( box1 => box1.key === box.key ) && occurence[ box.key ] === 1
		} )

		return generatedBoxesInProcess
	}

	function getRandomVisibleWall() {
		const visibleWalls = {
			top: false,
			back: false,
			left: false,
			right: false,
		}

		for ( const wall in visibleWalls ) {
			visibleWalls[ wall ] = Math.floor( Math.random() * 2 ) === 1
		}
		return visibleWalls
	}

	function getEmptyBoxesSpace( basePos ) {
		const newBoxes = []
		const [ x, y, z ] = basePos
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

	function isSameBoxThanBaseBox() {
		return Math.floor( Math.random() * 2 ) === 1
	}

	function isEmptyBoxesSpace() {
		return Math.floor( Math.random() * 8 ) === 1
	}

	return (
		<>
			{boxes}
		</>
	)
}


