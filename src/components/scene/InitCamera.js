import { useThree } from "@react-three/fiber"
import { Euler } from "three"

export default function InitCamera() {
	const { camera } = useThree()
	// cameraInAir( camera )
	cameraOnGround( camera )
}

function cameraInAir( camera ) {
	camera.position.set( 0, 5, 5 )

	const euler = new Euler( 0, 0, 0, 'YXZ' )
	euler.setFromQuaternion( camera.quaternion )
	euler.y -= 0.001
	euler.x -= 0.20
	camera.quaternion.setFromEuler( euler )
}

function cameraOnGround( camera ) {
	camera.position.set( 0, 1, 0 )
}