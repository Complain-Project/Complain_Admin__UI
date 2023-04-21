/* Getter type::start */
const Getters = {
	HAS_PERMISSION: 'hasPermission'
}
/* Getter type::end */

/* Action type::start */
const Actions = {
	LOGOUT: 'logout'
}
/* Action type::end */

/* Mutation type::start */
const Mutations = {
	/* auth::start */
	SET_AUTH: "setAuth",
	SET_LOGIN_STATUS: 'updateLoginStatus',
	/* auth::end */
	
	/* Layout::start */
	SET_ACTIVE_MENU: "setActiveMenu",
	SET_COLLAPSE_SIDEBAR: "setCollapseSidebar",
	SET_COLLAPSE_PROFILE: "setCollapseProfile",
	/* Layout::end */

	/* Home::start */
	SET_TITLE: "changeTitle",
	SET_BREADCRUMB: "changeBreadCrumb",
	SET_IS_LOGIN: "updateIsLogin",
	/* Home::end */

}
/* Mutation type::end */

export {Getters, Actions, Mutations};