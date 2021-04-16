import { useRouteMatch, Link } from "react-router-dom";

const LinkActive = ({ label, to, icon, activeOnlyWhenExact }) => {
	let match = useRouteMatch({
		path: to,
		exact: activeOnlyWhenExact,
	});

	return (
		<>
			<li className={match ? "active" : ""}>
				<Link to={to}>
					<i className={icon}></i>
					{/* <pre>{JSON.stringify(match, 0, 2)}</pre> */}
					{label}
				</Link>
			</li>
		</>
	);
};

export default LinkActive;
