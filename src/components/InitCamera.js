import { useThree } from "@react-three/fiber"
import { Euler } from "three"

export default function InitCamera() {
	const { camera } = useThree()
	camera.position.set( 0, 5, 5 )

	const euler = new Euler( 0, 0, 0, 'YXZ' )
	euler.setFromQuaternion( camera.quaternion )
	euler.y -= 0.001
	euler.x -= 0.20
	camera.quaternion.setFromEuler( euler )

	return null
}