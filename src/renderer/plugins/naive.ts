import {
  create,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NDropdown,
  NSpace,
  NTooltip,
  NAvatar,
  NTabs,
  NTabPane,
  NCard,
  NRow,
  NCol,
  NDrawer,
  NDrawerContent,
  NDivider,
  NH2,
  NH1,
  NH3,
  NH4,
  NTag,
  NGrid,
  NIcon,
  NForm,
  NList,
  NStep,
  NTree,
  NSpin,
  NText,
  NRate,
  NBadge,
  NInput,
  NThing,
  NAlert,
  NRadio,
  NSteps,
  NTable,
  NModal,
  NEmpty,
  NImage,
  NSwitch,
  NSelect,
  NLayout,
  NButton,
  NUpload,
  NResult,
  NElement,
  NPopover,
  NBackTop,
  NProgress,
  NGridItem,
  NListItem,
  NSkeleton,
  NCascader,
  NCheckbox,
  NFormItem,
  NPopselect,
  NStatistic,
  NDataTable,
  NDatePicker,
  NPagination,
  NRadioGroup,
  NInputGroup,
  NTimePicker,
  NTreeSelect,
  NPopconfirm,
  NFormItemGi,
  NGlobalStyle,
  NButtonGroup,
  NLayoutSider,
  NRadioButton,
  NInputNumber,
  NLayoutFooter,
  NLayoutHeader,
  NDynamicInput,
  NDescriptions,
  NGradientText,
  NLayoutContent,
  NCheckboxGroup,
  NUploadDragger,
  NInputGroupLabel,
  NDescriptionsItem,
  NLoadingBarProvider,
  NNotificationProvider
} from 'naive-ui';
import { App } from 'vue';
import layLayer from '@layui/layer-vue';

const naive = create({
  components: [
    NMessageProvider,
    NDialogProvider,
    NConfigProvider,
    NInput,
    NButton,
    NForm,
    NFormItem,
    NGlobalStyle,
    NCheckboxGroup,
    NCheckbox,
    NIcon,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NBreadcrumb,
    NBreadcrumbItem,
    NDropdown,
    NSpace,
    NTooltip,
    NAvatar,
    NTabs,
    NTabPane,
    NCard,
    NRow,
    NCol,
    NDrawer,
    NDrawerContent,
    NDivider,
    NSwitch,
    NBadge,
    NAlert,
    NElement,
    NTag,
    NNotificationProvider,
    NProgress,
    NDatePicker,
    NGrid,
    NGridItem,
    NList,
    NListItem,
    NThing,
    NPopover,
    NPagination,
    NSelect,
    NRadioGroup,
    NRadio,
    NSteps,
    NStep,
    NInputGroup,
    NResult,
    NDescriptions,
    NDescriptionsItem,
    NTable,
    NInputNumber,
    NLoadingBarProvider,
    NModal,
    NUpload,
    NTree,
    NSpin,
    NTimePicker,
    NBackTop,
    NSkeleton,
    NH2,
    NPopconfirm,
    NButtonGroup,
    NTreeSelect,
    NEmpty,
    NInputGroup,
    NInputGroupLabel,
    NPopselect,
    NH1,
    NDynamicInput,
    NFormItemGi,
    NUploadDragger,
    NText,
    NH3,
    NH4,
    NDataTable,
    NRadioButton,
    NGradientText,
    NImage,
    NStatistic,
    NCascader,
    NRate
  ]
});

export function setupNaive(app: App): void {
  app.use(naive);
  app.use(layLayer);
}
