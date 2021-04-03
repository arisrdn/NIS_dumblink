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
					<i class={icon}></i>
					{label}
				</Link>
			</li>
		</>
	);
};

export default LinkActive;
