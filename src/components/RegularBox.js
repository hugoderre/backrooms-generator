import React, { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Group, TextureLoader, RepeatWrapping } from 'three'

export default function RegularBox( props ) {
	const ref = useRef()

	const floorMap = useLoader( TextureLoader, 'assets/materials/floor.jpg' )
	floorMap.wrapS = RepeatWrapping
	floorMap.wrapT = RepeatWrapping
	floorMap.repeat.set( 10, 10 )
	const wallMap = useLoader( TextureLoader, 'assets/materials/wall.jpg' )

	return (
		<group position={props.position} scale={props.scale} >
			<mesh // Floor
				position={[ 0, 0, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ 1, 0.1, 1 ]} />
				<meshStandardMaterial map={floorMap} />
			</mesh>
			{props.visibleWalls.top && (
				<mesh // Top
					position={[ 0, 0.5, 0.5 - 0.1 * 0.5 ]}
					ref={ref}
				>
					<boxGeometry args={[ 1, 1, 0.1 ]} />
					<meshStandardMaterial map={wallMap} />
				</mesh>
			)}
			{props.visibleWalls.back && (
				<mesh // Back
					position={[ 0, 0.5, -0.5 + 0.1 * 0.5 ]}
					ref={ref}
				>
					<boxGeometry args={[ 1, 1, 0.1 ]} />
					<meshStandardMaterial map={wallMap} />
				</mesh>
			)}
			{props.visibleWalls.right && (
				<mesh // Right
					position={[ 0.5 - 0.1 * 0.5, 0.5, 0 ]}
					ref={ref}
				>
					<boxGeometry args={[ 0.1, 1, 1 ]} />
					<meshStandardMaterial map={wallMap} />
				</mesh>
			)}
			{props.visibleWalls.left && (
				<mesh // Left
					position={[ -0.5 + 0.1 * 0.5, 0.5, 0 ]}
					ref={ref}
				>
					<boxGeometry args={[ 0.1, 1, 1 ]} />
					<meshStandardMaterial map={wallMap} />
				</mesh>
			)}
		</group>
	)
}