import { TextureContext } from "@/components/TextureContext";
import { useContext, useRef } from "react"

export default function Wall( props ) {
	const ref = useRef()
	const { floorMap } = useContext( TextureContext );

	return (
		<group>
			<mesh
				ref={ref}
				position={props.position}
				rotation={props.rotation}
			>
				<boxGeometry args={props.geometry} />
				<meshStandardMaterial map={props.map} />
			</mesh>
			{
				props.seal && (
					<>
						{/* <mesh // Top
							position={[ props.position[ 0 ], props.position[ 1 ] + ( props.geometry[ 1 ] / 2 ) - 0.05, props.position[ 2 ] ]}
							rotation={props.rotation}
						>
							<boxGeometry args={[ props.geometry[ 0 ] + 0.02, 0.05, props.geometry[ 2 ] + 0.02 ]} />
							<meshStandardMaterial map={floorMap} color={'#e3dfd3'} />
						</mesh> */}
						<mesh // Bottom
							position={[ props.position[ 0 ], props.position[ 1 ] - ( props.geometry[ 1 ] / 2 ) + 0.05, props.position[ 2 ] ]}
							rotation={props.rotation}
						>
							<boxGeometry args={[ props.geometry[ 0 ] + 0.02, 0.05, props.geometry[ 2 ] + 0.02 ]} />
							<meshStandardMaterial map={floorMap} color={'#e3dfd3'} />
						</mesh>
					</>
				)
			}

		</group>
	)
}