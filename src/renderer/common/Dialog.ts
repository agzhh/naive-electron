export const createDialog = async (url: string, config: any): Promise<Window> => {
  return new Promise((resolve) => {
    const windowProxy = window.open(url, '_blank', JSON.stringify(config));
    const readyHandler = (e: any): void => {
      const msg = e.data;
      // 监听子窗口准备完成
      if (msg.msgName === `__dialogReady`) {
        window.removeEventListener('message', readyHandler);
        resolve(windowProxy as Window);
      }
    };
    // 监听子窗口发过来的消息
    window.addEventListener('message', readyHandler);
  });
};

/**
 * 这个方法是为子窗口服务的，当子窗口完成了必要的业务逻辑之后，就可以执行这个方法，通知父窗口自己已经加载成功。
 */
export const dialogReady = (): void => {
  const msg = { msgName: `__dialogReady` };
  window.opener.postMessage(msg);
};
