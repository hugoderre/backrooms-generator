import { useContext, useRef, useState } from 'react'
import { TextureContext } from '@/components/TextureContext'

export default function CrossPartBox( props ) {
	const ref = useRef()
	const { floorMap, wallMap } = useContext( TextureContext );

	switch ( props.crossPartRotation ) {
		case 'bl':
			ref.current.rotation.y = Math.PI / 2 * 3
			break
		case 'br':
			ref.current.rotation.y = Math.PI / 2 * 2
			break
		case 'tr':
			ref.current.rotation.y = Math.PI / 2 * 1
			break
		case 'tl':
			ref.current.rotation.y = Math.PI / 2 * 0
			break
	}

	return (
		<group position={props.position} scale={props.scale} rotation={[ 0, Math.PI / 2 * props.crossRotationDelta, 0 ]}>
			<mesh // Floor
				position={[ 0, 0, 0 ]}
				ref={ref}
			>
				<boxGeometry args={[ 1, 0.1, 1 ]} />
				<meshStandardMaterial map={floorMap} />
			</mesh>
			<mesh // Left
				position={[ -0.35, 0.5, 0.15 ]}
				ref={ref}
				rotation={[ 0, Math.PI / 2, 0 ]}
			>
				<boxGeometry args={[ 0.65, 1, 0.3 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh>
			<mesh // Left
				position={[ -0.35 / 2, 0.5, 0.35 ]}
				ref={ref}
				rotation={[ 0, 0, 0 ]}
			>
				<boxGeometry args={[ 0.65, 1, 0.3 ]} />
				<meshStandardMaterial map={wallMap} />
			</mesh>

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