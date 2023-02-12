import { useContext, useEffect, useRef, useState } from 'react'
import { TextureContext } from '@/components/TextureContext'
import Wall from './part/Wall';
import { useFrame, useThree } from '@react-three/fiber';
import { isBoxCloseFromCamera } from './BoxUtils';

export default function CrossPartBox( props ) {
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
		if ( isBoxCloseFromCamera( props.position, camera ) ) {
			ref.current.visible = true
			setIsVisible( ref.current.visible )
		} else {
			ref.current.visible = false
			setIsVisible( ref.current.visible )
		}
	} )

	return (
		<group ref={ref} position={props.position} scale={props.scale} rotation={[ 0, Math.PI / 2 * props.crossRotationDelta, 0 ]}>
			<Wall position={[ 0, 0, 0 ]} geometry={[ 1, 0.1, 1 ]} map={floorMap} />
			<Wall position={[ -0.35, 0.5, 0.35 / 2 ]} rotation={[ 0, Math.PI / 2, 0 ]} geometry={[ 0.65, 1, 0.3 ]} seal={true} map={wallMap} />
			<Wall position={[ -0.35 / 2, 0.5, 0.35 ]} geometry={[ 0.65, 1, 0.3 ]} seal={true} map={wallMap} />
			<Wall position={[ 0, 1, 0 ]} geometry={[ 1, 0.1, 1 ]} map={ceilingMap} />
		</group>

	)
}