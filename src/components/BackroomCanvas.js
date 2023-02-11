'use client'

import Generator from '@/components/generator/Generator'
import { Canvas } from '@react-three/fiber'
import KeyboardControls from '@/components/scene/controls/KeyboardControls'
import LookControls from '@/components/scene/controls/LookControls'
import InitCamera from '@/components/scene/InitCamera'
import { TextureProvider } from '@/components/TextureContext'
import { Perf } from 'r3f-perf'
import PostProcessing from '@/components/PostProcessing'

export default function BackroomCanvas() {
	return (
		<Canvas resize={{ scroll: true }}>
			<Perf />
			<ambientLight />
			<pointLight position={[ 10, 10, 10 ]} />
			<InitCamera />
			<KeyboardControls />
			<LookControls />
			<gridHelper args={[ 100, 100, 'white', 'white' ]} />
			<TextureProvider>
				<Generator />
			</TextureProvider>
			<PostProcessing />
		</Canvas >
	)
}