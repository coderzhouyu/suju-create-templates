import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    defaultAvatar: '/logo.png',
    authPageLayout:"panel-center"
  },
  logo: {
    source: "/logo.png"
  },

  copyright:{
    companyName: "速聚科技",
    companySiteLink: "https://www.su0591.com",
    icp: "闽ICP备2020017967号",
    icpLink: "https://beian.miit.gov.cn/",
    date: new Date().getFullYear() + "",
  },
  widget: {
    languageToggle: false,
  },
});
