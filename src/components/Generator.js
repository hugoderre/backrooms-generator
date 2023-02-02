import RegularBox from './RegularBox'

export default function Generator( props ) {

	return (
		<>
			<RegularBox position={[ 0, 0, 0 ]} />
			<RegularBox position={[ 0, 0, 1 ]} />
			<RegularBox position={[ 0, 0, 2 ]} />
			<RegularBox position={[ 0, 0, 3 ]} />
		</>
	)
}


