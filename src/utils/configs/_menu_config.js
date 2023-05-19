export const MENUS = [
	{
		pages: [
			{
				title: "Tổng quan",
				route: "",
				svgIcon: require('@/assets/images/icons/table-layout.svg'),
				index: 1,
				permission: ''
			},
		]
	},
	{
		heading: "Hệ thống",
		pages: [
			{
				title: "Cán bộ",
				route: "employees",
				svgIcon: require('@/assets/images/icons/user.svg'),
				index: 2,
				permission: 'ADM-L'
			},
			{
				title: "Vai trò",
				route: "roles",
				svgIcon: require('@/assets/images/icons/role.svg'),
				index: 3,
				permission: 'ROLE-L'
			},
		],
	},
	{
		heading: "Khiếu nại",
		pages: [
			{
				title: "Quản lý người khiếu nại",
				route: "customers",
				svgIcon: require('@/assets/images/icons/user-group.svg'),
				index: 4,
				permission: 'COMPLAINANT-L'
			},
			{
				title: "Khiếu nại",
				route: "complains",
				svgIcon: require('@/assets/images/icons/shield.svg'),
				index: 5,
				permission: 'COMPLAIN-L'
			},
		],
	},
	{
		heading: "Quản lý",
		pages: [
			{
				title: "Bài viết",
				route: "posts",
				svgIcon: require('@/assets/images/icons/file-invoice.svg'),
				index: 6,
				permission: 'POST-L'
			},
		],
	},
];