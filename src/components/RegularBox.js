import React, { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Group, TextureLoader, Vector3 } from 'three'

export default function RegularBox( props ) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()

	// Hold state for hovered and clicked events
	// const [ hovered, hover ] = useState( false )
	// const [ clicked, click ] = useState( false )

	// Subscribe this component to the render-loop, rotate the mesh every frame
	// useFrame( ( state, delta ) => ( ref.current.rotation.x += delta ) )

	const floorMap = useLoader( TextureLoader, 'assets/materials/floor.jpg' )
	const wallMap = useLoader( TextureLoader, 'assets/materials/wall.jpg' )

	return (
		<group position={props.position} >
			<mesh // Floor
				{...props}
				position={[ 0, -0.5, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ 1, 0.1, 1 ]} />
				<meshStandardMaterial map={floorMap} />
			</mesh>
			<mesh // Wall 1
				{...props}
				position={[ 0, 0, -0.5 + 0.1 * 0.5 ]}
				ref={ref}
			>
				<boxGeometry args={[ 1, 1, 0.1 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh>
			<mesh // Wall 2
				{...props}
				position={[ 0, 0, 0.5 - 0.1 * 0.5 ]}
				ref={ref}
			>
				<boxGeometry args={[ 1, 1, 0.1 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh>
			<mesh // Wall 3
				{...props}
				position={[ -0.5 + 0.1 * 0.5, 0, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ 0.1, 1, 1 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh>
			{/* <mesh // Wall 4
				{...props}
				position={[ 0.5 - 0.1 * 0.5, 0, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ 0.1, 1, 1 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh> */}
		</group>
	)
}