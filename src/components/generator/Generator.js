import { useEffect, useState } from 'react'
import RegularBox from './box/RegularBox'
import { getRandomEvenInt } from '../Helpers'
import CrossPartBox from './box/CrossPartBox'

export default function Generator( props ) {
	const initialPosition = [ 0, 0, 0 ]
	const [ boxes, setBoxes ] = useState( [ <RegularBox
		type={'regular'}
		key={initialPosition.join()}
		position={initialPosition}
		scale={2}
		generate={generate}
		visibleWalls={{
			top: false,
			back: true,
			left: true,
			right: true,
		}}
	/>
	] )

	let newBoxes = []

	function generate( baseBoxProps ) {
		newBoxes = generateNewBoxes( baseBoxProps )
		if ( newBoxes.length === 0 ) {
			return
		}

		setBoxes( ( prevState ) => {
			// Filter out the new boxes that are already in the previous boxes saved in the state
			newBoxes = newBoxes.filter( box => {
				return !prevState.find( box1 => box1.key === box.key ) // TODO : optimize this
			} )
			return prevState.concat( ...newBoxes )
		} )
	}

	function generateNewBoxes( baseBoxProps ) {
		const { type: baseType, position: basePos, scale: baseScale, visibleWalls: baseVisibleWalls } = baseBoxProps
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
			if ( isGeneratePatternedBoxes() ) {
				const random = Math.floor( Math.random() * 2 )
				switch ( random ) {
					case 0:
						generatedBoxesInProcess.push( ...generateEmptyBoxPattern( position ) )
						break;
					case 1:
						generatedBoxesInProcess.push( ...generateCrossBoxPattern( position ) )
						break;
					default:
						break;
				}
			}
			else if ( baseType === 'regular' && isGenerateSameBoxThanPrev() ) {
				generatedBoxesInProcess.push( <RegularBox type={'regular'} key={position.join()} position={position} scale={2} generate={generate} visibleWalls={baseVisibleWalls} /> )
			} else {
				generatedBoxesInProcess.push( <RegularBox type={'regular'} key={position.join()} position={position} scale={2} generate={generate} visibleWalls={getRandomVisibleWall()} /> )
			}
		}

		// Find duplicate boxes
		const occurence = {}
		for ( const box of generatedBoxesInProcess ) {
			occurence[ box.key ] ? occurence[ box.key ]++ : occurence[ box.key ] = 1
		}

		// Remove duplicate boxes and boxes that are already generated
		generatedBoxesInProcess = generatedBoxesInProcess.filter( box => {
			return ![ ...newBoxes, ...boxes ].find( box1 => box1.key === box.key ) && occurence[ box.key ] === 1
		} )

		return generatedBoxesInProcess
	}

	function generateEmptyBoxPattern( basePosition ) {
		const newBoxes = []
		const [ x, y, z ] = basePosition
		const quantity = getRandomEvenInt( 4, 8 )
		const row = getRandomEvenInt( 2, 4 )
		for ( let i = 0; i < quantity; i++ ) {
			const rowNumber = Math.floor( i / row )
			const colNumber = i % row
			const position = [ x + colNumber * 2, y, z + rowNumber * 2 ]
			newBoxes.push( <RegularBox type={'regular'} key={position.join()} position={position} scale={2} generate={generate} visibleWalls={{
				top: false,
				bottom: true,
				left: false,
				right: false,
			}} /> )
		}

		return newBoxes
	}

	function generateCrossBoxPattern( basePosition ) {
		const newBoxes = []
		const [ x, y, z ] = basePosition
		const quantity = 12
		const row = 2
		for ( let i = 0; i < quantity; i++ ) {
			const rowNumber = Math.floor( i / row )
			const colNumber = i % row
			const position = [ x + colNumber * 2, y, z + rowNumber * 2 ]
			let crossRotationDelta = null

			if ( rowNumber % 2 === 0 && i % 2 === 1 ) {
				crossRotationDelta = 0
			} else if ( rowNumber % 2 === 0 && i % 2 === 0 ) {
				crossRotationDelta = 1
			} else if ( rowNumber % 2 === 1 && i % 2 === 0 ) {
				crossRotationDelta = 2
			} else if ( rowNumber % 2 === 1 && i % 2 === 1 ) {
				crossRotationDelta = 3
			}

			newBoxes.push( <CrossPartBox type={'cross'} key={position.join()} position={position} scale={2} crossRotationDelta={crossRotationDelta} generate={generate} /> )
		}
		return newBoxes
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

	function isGenerateSameBoxThanPrev() {
		return Math.floor( Math.random() * 2 ) === 1
	}

	function isGeneratePatternedBoxes() {
		return Math.floor( Math.random() * 15 ) === 1
	}

	return (
		<>
			{boxes}
		</>
	)
}


