import React from "react";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";
import {
	FaTachometerAlt,
	FaGem,
	FaList,
	FaGithub,
	FaRegLaughWink,
	FaHeart,
} from "react-icons/fa";
// import sidebarBg from "./assets/bg1.jpg";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
	// const intl = useIntl();
	return (
		<ProSidebar
			// image={image ? sidebarBg : false}
			rtl={rtl}
			collapsed={collapsed}
			toggled={toggled}
			breakPoint="md"
			onToggle={handleToggleSidebar}
		>
			<SidebarHeader>
				<div
					style={{
						padding: "24px",
						textTransform: "uppercase",
						fontWeight: "bold",
						fontSize: 14,
						letterSpacing: "1px",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					title
				</div>
			</SidebarHeader>

			<SidebarContent>
				<Menu iconShape="circle">
					<MenuItem
						icon={<FaTachometerAlt />}
						suffix={<span className="badge red">new</span>}
					>
						Dashboard
					</MenuItem>
					<MenuItem icon={<FaGem />}> component</MenuItem>
				</Menu>
				<Menu iconShape="circle">
					<SubMenu
						suffix={<span className="badge yellow">3</span>}
						title={"withSuffix"}
						icon={<FaRegLaughWink />}
					>
						<MenuItem>sub 1</MenuItem>
						<MenuItem>sub 2</MenuItem>
						<MenuItem>sub 3</MenuItem>
					</SubMenu>
					<SubMenu
						prefix={<span className="badge gray">3</span>}
						title={"sdsd"}
						icon={<FaHeart />}
					>
						<MenuItem>sub 1</MenuItem>
					</SubMenu>
					<SubMenu title={"multiLevel"} icon={<FaList />}>
						<MenuItem>sub </MenuItem>
					</SubMenu>
				</Menu>
			</SidebarContent>

			<SidebarFooter style={{ textAlign: "center" }}>
				<div
					className="sidebar-btn-wrapper"
					style={{
						padding: "20px 24px",
					}}
				>
					<a
						href="https://github.com/azouaoui-med/react-pro-sidebar"
						target="_blank"
						className="sidebar-btn"
						rel="noopener noreferrer"
					>
						<FaGithub />
						<span> ww</span>
					</a>
				</div>
			</SidebarFooter>
		</ProSidebar>
	);
};

export default Aside;
