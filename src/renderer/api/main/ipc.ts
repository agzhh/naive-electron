import { ipcRenderer, OpenDialogSyncOptions } from 'electron';

/**
 * 隐藏窗口
 */
export async function hideWindow() {
  await ipcRenderer.invoke('hideWindow');
}

/**
 * 窗口最大化
 */
export async function maxmizeWindow() {
  await ipcRenderer.invoke('maxmizeWindow');
}

/**
 * 窗口最小化
 */
export async function minimizeWindow() {
  await ipcRenderer.invoke('minimizeWindow');
}

/**
 * 取消窗口最大化
 */
export async function unmaximizeWindow() {
  await ipcRenderer.invoke('unmaximizeWindow');
}

/**
 * 获取窗口是否最大化
 */
export function getIsMaximized() {
  return ipcRenderer.invoke('getIsMaximized');
}

/**
 * 通过传递不同的参数，可以获得不同的系统位置
 * @param name
 */
export function getPath(name: string) {
  return ipcRenderer.invoke('getPath', name);
}

/**
 * 打开选择文件或文件夹对话框
 */
export function showOpenDialogSync({ options, modal = true }: { options: OpenDialogSyncOptions; modal?: boolean }): Promise<string[] | undefined> {
  return ipcRenderer.invoke('showOpenDialogSync', { options, modal });
}

/**
 * 打开指定目录
 * @param dir
 */
export function openDirectory(dir: string) {
  return ipcRenderer.invoke('openDirectory', dir);
}

/**
 * 获取本地系统变量配置
 * @param dir
 */
export function getLocalConf() {
  return ipcRenderer.invoke('getLocalConf');
}
