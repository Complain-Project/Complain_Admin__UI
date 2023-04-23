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
				title: "Nhân viên",
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
				permission: 'list-user'
			},
		],
	},
	// {
	// 	heading: "Quản lý",
	// 	pages: [
	// 		{
	// 			sectionTitle: "Nội dung",
	// 			svgIcon: require('@/assets/images/icons/bookmark.svg'),
	// 			permission: '',
	// 			subs: [
	// 				{
	// 					title: "Khóa học",
	// 					route: "courses",
	// 					index: 4,
	// 					permission: ''
	// 				},
	// 				{
	// 					title: "Danh mục",
	// 					route: "categories",
	// 					index: 5,
	// 					permission: ''
	// 				},
	// 				{
	// 					title: "Hướng dẫn",
	// 					route: "instructors",
	// 					index: 6,
	// 					permission: ''
	// 				},
	// 				{
	// 					title: "Thư viện",
	// 					route: "libraries",
	// 					index: 7,
	// 					permission: ''
	// 				},
	// 			],
	// 		},
	// 	],
	// },
];