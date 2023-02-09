import { useLoader } from '@react-three/fiber'
import { createContext, useState } from 'react'
import { RepeatWrapping, TextureLoader } from 'three'

const TextureContext = createContext()
const TextureDispatchContext = createContext();

function TextureProvider( { children } ) {
	const floorMap = useLoader( TextureLoader, 'assets/materials/floor.jpg' )
	floorMap.wrapS = RepeatWrapping
	floorMap.wrapT = RepeatWrapping
	floorMap.repeat.set( 10, 10 )
	const wallMap = useLoader( TextureLoader, 'assets/materials/wall.jpg' )
	const ceilingMap = useLoader( TextureLoader, 'assets/materials/ceiling.jpg' )

	const [ textures, setTextures ] = useState( {
		floorMap,
		wallMap,
		ceilingMap
	} );

	return (
		<TextureContext.Provider value={textures}>
			<TextureDispatchContext.Provider value={setTextures}>
				{children}
			</TextureDispatchContext.Provider>
		</TextureContext.Provider>
	)
}

export { TextureContext, TextureDispatchContext, TextureProvider }