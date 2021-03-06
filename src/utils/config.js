const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const ADMINV1 = '/admin'

module.exports = {
  name: '',
  prefix: 'antdAdmin',
  footerText: 'MUY Admin  © 2018 yanglikai',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    // userLogin: `${APIV1}/user/login`,
    userLogin: `${APIV2}/auth/password`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,


    users: `${APIV1}/users`,
    saveUser: `${APIV1}/users/save`,
    deleteUser: `${APIV1}/users/delete`,
    citys: `${APIV1}/citys`,
    positions: `${APIV1}/groups/roles`,

    groups: `${APIV1}/groups`,
    saveGroups: `${APIV1}/groups/save`,
    deleteGroups: `${APIV1}/groups/delete`,
    bindRole: `${APIV1}/groups/bind/role`,
    saveGroupRole: `${APIV1}/groups/role/save`,

    roles: `${APIV1}/roles`,
    saveRoles: `${APIV1}/roles/save`,
    deleteRoles: `${APIV1}/roles/delete`,
    bindMenu: `${APIV1}/roles/bind/menu`,
    saveRoleMenu: `${APIV1}/roles/menu/save`,

    allMenus: `${APIV1}/menus/all`,
    menus: `${APIV1}/menus`,
    saveMenus: `${APIV1}/menus/save`,
    deleteMenus: `${APIV1}/menus/delete`,

    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    // menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
