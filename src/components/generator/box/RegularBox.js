import { useContext, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Group, TextureLoader, RepeatWrapping, Vector3 } from 'three'
import { TextureContext } from '@/components/TextureContext'

export default function RegularBox( props ) {
	const ref = useRef()
	const { floorMap, wallMap } = useContext( TextureContext );

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
					rotation={[ 0, Math.PI / 2, 0 ]}
				>
					<boxGeometry args={[ 1, 1, 0.1 ]} />
					<meshStandardMaterial map={wallMap} />
				</mesh>
			)}
			{props.visibleWalls.left && (
				<mesh // Left
					position={[ -0.5 + 0.1 * 0.5, 0.5, 0 ]}
					ref={ref}
					rotation={[ 0, Math.PI / 2, 0 ]}
				>
					<boxGeometry args={[ 1, 1, 0.1 ]} />
					<meshStandardMaterial map={wallMap} />
				</mesh>
			)}

			{/* <mesh // Roof
				position={[ 0, 1, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ 1, 0.1, 1 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh> */}

		</group>

	)
}

// function Wall( props ) {
// 	const ref = useRef()

// 	const positions = {
// 		top: [ 0, 0.5, 0.5 - 0.1 * 0.5 ],
// 		back: [ 0, 0.5, -0.5 + 0.1 * 0.5 ],
// 		right: [ 0.5 - 0.1 * 0.5, 0.5, 0 ],
// 		left: [ -0.5 + 0.1 * 0.5, 0.5, 0 ],
// 	}

// 	const rotations = {
// 		right: [ 0, Math.PI / 2, 0 ],
// 		left: [ 0, Math.PI / 2, 0 ],
// 	}

// 	return (
// 		<mesh
// 			ref={ref}
// 			position={positions[ props.type ]}
// 			rotation={rotations[ props.type ]}
// 		>
// 			<boxGeometry args={[ 1, 1, 0.1 ]} />
// 			<meshStandardMaterial map={props.map} />
// 		</mesh>
// 	)
// }