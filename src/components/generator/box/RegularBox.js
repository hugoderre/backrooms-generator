import { useContext, useEffect, useRef, useState } from 'react'
import { TextureContext } from '@/components/TextureContext'
import Wall from './part/Wall'
import { useFrame, useThree } from '@react-three/fiber';
import { isVisibleBox } from './BoxUtils';

export default function RegularBox( props ) {
	const { floorMap, wallMap, ceilingMap } = useContext( TextureContext );
	const ref = useRef()
	const { camera } = useThree()
	const [ isVisible, setIsVisible ] = useState( false )

	useEffect( () => {
		if ( isVisible ) {
			props.generate( props )
		}
	}, [ isVisible ] )

	useFrame( () => {
		if ( isVisibleBox( ref.current, camera ) ) {
			ref.current.visible = true
			setIsVisible( ref.current.visible )
		} else {
			ref.current.visible = false
			setIsVisible( ref.current.visible )
		}
	} )

	return (
		<group ref={ref} position={props.position} scale={props.scale} dispose={null}>
			<Wall position={[ 0, 0, 0 ]} geometry={[ 1, 0.1, 1 ]} map={floorMap} />

			{props.visibleWalls.top && (
				<Wall position={[ 0, 0.5, 0.5 - 0.1 * 0.5 ]} geometry={[ 1, 1, 0.1 ]} seal={true} map={wallMap} />
			)}
			{props.visibleWalls.back && (
				<Wall position={[ 0, 0.5, -0.5 + 0.1 * 0.5 ]} geometry={[ 1, 1, 0.1 ]} seal={true} map={wallMap} />
			)}
			{props.visibleWalls.right && (

				<Wall position={[ 0.5 - 0.1 * 0.5, 0.5, 0 ]} geometry={[ 1, 1, 0.1 ]} rotation={[ 0, Math.PI / 2, 0 ]} seal={true} map={wallMap} />
			)}
			{props.visibleWalls.left && (
				<Wall position={[ -0.5 + 0.1 * 0.5, 0.5, 0 ]} geometry={[ 1, 1, 0.1 ]} rotation={[ 0, Math.PI / 2, 0 ]} seal={true} map={wallMap} />
			)}

			<Wall position={[ 0, 1, 0 ]} geometry={[ 1, 0.1, 1 ]} map={ceilingMap} />
		</group>
	)
}