import { useContext, useRef } from 'react'
import { TextureContext } from '@/components/TextureContext'
import Wall from './part/Wall'
import { useFrame, useThree } from '@react-three/fiber';
import { isBoxTooFarFromCamera } from './BoxUtils';

export default function RegularBox( props ) {
	const { floorMap, wallMap, ceilingMap } = useContext( TextureContext );
	const ref = useRef()
	const { camera } = useThree()

	useFrame( () => {
		ref.current.visible = isBoxTooFarFromCamera( props.position, camera )
	} )

	return (
		<group ref={ref} position={props.position} scale={props.scale} >
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