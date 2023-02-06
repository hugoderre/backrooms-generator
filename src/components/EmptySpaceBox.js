import React, { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Group, TextureLoader, RepeatWrapping, Vector3, Material } from 'three'

export default function EmptySpaceBox( props ) {
	const ref = useRef()

	const floorMap = useLoader( TextureLoader, 'assets/materials/floor.jpg' )
	floorMap.wrapS = RepeatWrapping
	floorMap.wrapT = RepeatWrapping
	floorMap.repeat.set( 10, 10 )

	return (
		<group position={props.position} >
			<mesh // Floor
				position={[ 0, 0, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ props.scale, 0.1, props.scale ]} />
				<meshStandardMaterial map={floorMap} />
			</mesh>
		</group>
	)
}