

import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";

// import dynamic from 'next/dynamic'

export default function PostProcessing( props ) {
	// const EffectComposer = dynamic( () => import( '@react-three/postprocessing' ), )
	// const DepthOfField = dynamic( () => import( '@react-three/postprocessing' ), )
	// const Bloom = dynamic( () => import( '@react-three/postprocessing' ), )
	// const Noise = dynamic( () => import( '@react-three/postprocessing' ), )
	// const Vignette = dynamic( () => import( '@react-three/postprocessing' ), )

	return (
		<EffectComposer>
			<DepthOfField blendFunction={BlendFunction.NORMAL} focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
			<Bloom luminanceThreshold={0.4} luminanceSmoothing={0.6} height={300} />
			<Noise opacity={0.2} />
			<Vignette eskil={false} offset={0.1} darkness={1.1} />
			{/* <Glitch
				delay={[ 1.5, 3.5 ]} // min and max glitch delay
				duration={[ 0.6, 1.0 ]} // min and max glitch duration
				strength={[ 0.3, 1.0 ]} // min and max glitch strength
				mode={GlitchMode.SPORADIC} // glitch mode
				active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
				ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
			/> */}

		</EffectComposer>
	)
}


