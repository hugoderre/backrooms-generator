import RegularBox from './RegularBox'
import { useState, useEffect } from 'react'

export default function Generator( props ) {
	const initialPosition = [ 0, 0, 0 ]
	const [ boxes, setBoxes ] = useState( [ <RegularBox
		key={initialPosition.join( '' )}
		position={initialPosition}
		scale={2}
		visibleWalls={{
			top: true,
			left: true,
			right: true,
		}}
	/>
	] )
	const [ lastGeneratedBoxes, setLastGeneratedBoxes ] = useState( boxes )
	const [ gIndex, setGIndex ] = useState( 1 )
	let newBoxes = []

	useEffect( () => {
		generate()
	}, [ boxes ] )

	function generate() {
		if ( gIndex < 1 || gIndex > 5 ) {
			return
		}

		newBoxes = []

		for ( let i = 0; i < lastGeneratedBoxes.length; i++ ) {
			newBoxes.push( ...generateNewBoxes( lastGeneratedBoxes[ i ] ) )
		}

		setGIndex( gIndex + 1 )
		setBoxes( boxes.concat( ...newBoxes ) )
		setLastGeneratedBoxes( newBoxes )
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

		const newBoxes = []

		for ( let i = 0; i < newBoxesData.length; i++ ) {
			const { position } = newBoxesData[ i ]
			if ( isEmptyBoxesSpace() ) {
				newBoxes.push( ...getEmptyBoxesSpace( position, 12, 4 ) )
			} else if ( isSameBoxThanBaseBox() ) {
				newBoxes.push( <RegularBox key={position.join( '' )} position={position} scale={2} visibleWalls={baseVisibleWalls} /> )
			} else {
				// newBoxes.push( <RegularBox key={position.join( '' )} position={position} scale={2} visibleWalls={getRandomVisibleWall()} /> )
			}
		}

		return newBoxes.filter( box => !isBoxOverlaping( box ) )
	}

	function getRandomVisibleWall() {
		const visibleWalls = {
			top: false,
			left: false,
			right: false,
		}
		const randomWall = Math.floor( Math.random() * 3 )
		switch ( randomWall ) {
			case 0:
				visibleWalls.top = true
				break
			case 1:
				visibleWalls.left = true
				break
			case 2:
				visibleWalls.right = true
				break
		}
		return visibleWalls
	}

	function getEmptyBoxesSpace( position, quantity, row ) {
		const newBoxes = []
		const [ x, y, z ] = position
		for ( let i = 0; i < quantity; i++ ) {
			const rowNumber = Math.floor( i / row )
			const colNumber = i % row
			const position = [ x + colNumber * 2, y, z + rowNumber * 2 ]
			newBoxes.push( <RegularBox key={position.join( '' )} position={position} scale={2} visibleWalls={{
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
		return Math.floor( Math.random() * 10 ) === 1
	}

	function getEmptySpaceBoxQuantity() {
		return Math.floor( Math.random() * 8 ) + 8
	}

	function isBoxOverlaping( box2 ) {
		return [ ...newBoxes, ...boxes ].find( box1 => box1.key === box2.key )
	}

	return (
		<>
			{boxes}
		</>
	)
}


