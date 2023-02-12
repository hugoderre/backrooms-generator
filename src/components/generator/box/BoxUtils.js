export function isBoxCloseFromCamera( boxPosition, camera ) {
	const cameraDistanceSquared = 100
	const distanceSquared = Math.pow( boxPosition[ 0 ] - camera.position.x, 2 ) + Math.pow( boxPosition[ 1 ] - camera.position.y, 2 ) + Math.pow( boxPosition[ 2 ] - camera.position.z, 2 )
	return distanceSquared < cameraDistanceSquared
}