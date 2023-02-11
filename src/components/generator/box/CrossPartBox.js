import { useContext, useRef } from 'react'
import { TextureContext } from '@/components/TextureContext'
import Wall from './part/Wall';
import { useFrame, useThree } from '@react-three/fiber';
import { isBoxTooFarFromCamera } from './BoxUtils';

export default function CrossPartBox( props ) {
	const { floorMap, wallMap, ceilingMap } = useContext( TextureContext );
	const ref = useRef()
	const { camera } = useThree()

	useFrame( () => {
		ref.current.visible = isBoxTooFarFromCamera( props.position, camera )
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