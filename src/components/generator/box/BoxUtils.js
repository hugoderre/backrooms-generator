import * as THREE from 'three'

export function isVisibleBox( box, camera ) {
	return isBoxCloseFromCamera( box, camera, 50 ) || ( isBoxInFrustum( box, camera ) && isBoxCloseFromCamera( box, camera, 800 ) )
}

function isBoxInFrustum( box, camera, scene ) {
	if ( !( box instanceof THREE.Object3D ) ) {
		return false
	}

	const frustum = new THREE.Frustum().setFromProjectionMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );

	if ( box.children.length > 0 ) {
		for ( let i = 0; i < box.children.length; i++ ) {
			const wall = box.children[ i ];
			if ( wall.children[ 0 ] instanceof THREE.Mesh ) {
				if ( frustum.intersectsObject( wall.children[ 0 ] ) ) {
					return true
				}
			}
		}
	}
}

function isBoxCloseFromCamera( box, camera, distance ) {
	const cameraDistanceSquared = distance
	const distanceSquared = Math.pow( box.position.x - camera.position.x, 2 ) + Math.pow( box.position.y - camera.position.y, 2 ) + Math.pow( box.position.z - camera.position.z, 2 )
	return distanceSquared < cameraDistanceSquared
}