import RegularBox from './RegularBox'
import { useState, useEffect } from 'react'

export default function Generator( props ) {
	const [ boxes, setBoxes ] = useState( [ <RegularBox key={[ 0, 0, 0 ].join( '' )} position={[ 0, 0, 0 ]} /> ] )
	const [ lastGeneratedBoxes, setLastGeneratedBoxes ] = useState( boxes )
	const [ gIndex, setGIndex ] = useState( 1 )
	let boxesInProcess = []

	useEffect( () => {
		if ( gIndex < 1 || gIndex > 10 ) {
			return
		}

		boxesInProcess = []

		for ( let i = 0; i < lastGeneratedBoxes.length; i++ ) {
			const boxesAround = generateBoxesAround( lastGeneratedBoxes[ i ] )
			boxesInProcess.push( ...boxesAround )
		}

		setGIndex( gIndex + 1 )
		setBoxes( boxes.concat( ...boxesInProcess ) )
		setLastGeneratedBoxes( boxesInProcess )
	}, [ boxes ] )

	function generateBoxesAround( baseBox ) {
		const { position } = baseBox.props
		const [ x, y, z ] = position
		return [
			<RegularBox key={[ x + 2, y, z ].join( '' )} position={[ x + 2, y, z ]} />,
			<RegularBox key={[ x - 2, y, z ].join( '' )} position={[ x - 2, y, z ]} />,
			<RegularBox key={[ x, y, z + 2 ].join( '' )} position={[ x, y, z + 2 ]} />,
			<RegularBox key={[ x, y, z - 2 ].join( '' )} position={[ x, y, z - 2 ]} />
		].filter( box => !isBoxOverlaping( box ) )
	}

	function isBoxOverlaping( box2 ) {
		return [ ...boxesInProcess, ...boxes ].find( box1 => box1.key === box2.key )
	}

	function getEmptySpaceBoxQuantity() {
		return Math.floor( Math.random() * 8 ) + 8
	}

	return (
		<>
			{boxes}
		</>
	)
}


