export default {
  Common: {
    // Admin: require('../../vue/pages/common/Admin'),
    index: require('@/pages/Index/Index.vue'),
    home: require('@/pages/Content/Home/Home.vue')
    // UpdatePassword: r => require.ensure([], () => r(require('../../vue/pages/users/UpdatePassword')), 'users')
  },
  Content: {
    menuSetting: require('@/pages/Content/Setting/MenuSetting.vue'),
    langSetting: require('@/pages/Content/Setting/LangSetting.vue'),
    langType: require('@/pages/Content/Setting/LangType.vue'),
    factorySetting: require('@/pages/Content/Setting/FactorySetting.vue'),
    userSetting: require('@/pages/Content/Setting/UserSetting.vue'),
    menuButtonSetting: require('@/pages/Content/Setting/MenuButtonSetting.vue'),
    structureSetting: require('@/pages/Content/Setting/StructureSetting.vue'),
    roleAuthSetting: require('@/pages/Content/Setting/RoleAuthSetting.vue'),
    userAuthSetting: require('@/pages/Content/Setting/UserAuthSetting.vue'),
    measUnitsGrSetting: require('@/pages/Content/Setting/measUnitsGrSetting.vue'),
    measUnitsSetting: require('@/pages/Content/Setting/measUnitsSetting.vue'),
    measUnitConvert: require('@/pages/Content/Setting/measUnitConvert.vue'),
    basicLang: require('@/pages/Content/Setting/BasicLang.vue')
  }
}
