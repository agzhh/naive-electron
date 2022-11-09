import { App, Component } from 'vue';
import {
  SettingTwotone,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PicCenterOutlined,
  OrderedListOutlined,
  MenuOutlined,
  PlusOutlined,
  FilterOutlined,
  LeftOutlined,
  RightOutlined,
  ClusterOutlined,
  MinusOutlined,
  BarChartOutlined,
  FileUnknownOutlined,
  StarOutlined,
  SnippetsOutlined,
  ContainerOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  CodeSandboxOutlined,
  FundProjectionScreenOutlined
} from '@vicons/antd';

export const Icons: { [key: string]: Component } = {
  PlusOutlined,
  CodeSandboxOutlined,
  FundProjectionScreenOutlined,
  SettingTwotone,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PicCenterOutlined,
  OrderedListOutlined,
  MenuOutlined,
  FilterOutlined,
  LeftOutlined,
  RightOutlined,
  ClusterOutlined,
  MinusOutlined,
  BarChartOutlined,
  FileUnknownOutlined,
  StarOutlined,
  SnippetsOutlined,
  ContainerOutlined,
  PieChartOutlined,
  AppstoreOutlined
};

export function setupIcon(app: App) {
  Object.keys(Icons).forEach((item) => {
    app.component(item, Icons[item]);
  });
}
