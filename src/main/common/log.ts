import Log4js from 'log4js';

Log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'file',
      filename: `${process.cwd()}/loggers/main/main`, // 文件目录，当目录文件或文件夹不存在时，会自动创建
      alwaysIncludePattern: true,
      maxLogSize: 10 * 1000 * 1000, // 文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件 .log.1的序列自增长的文件
      // encoding: 'utf-8', // default "utf-8"，文件的编码
      numBackups: 30, // 保留10个备份文件
      pattern: 'yyyy-MM-dd.log',
      compress: false // 是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
    },
    layout: {
      type: 'pattern',
      pattern: '%d{yyyyMMdd hh:mm:ss.SSS} [%p] %m'
    }
    // dayfile: {
    //   type: 'dateFile',
    //   filename: 'main.log',
    //   pattern: '.yyyyMMdd'
    // }
  },
  categories: {
    default: {
      appenders: ['console', 'file'],
      level: 'debug'
    }
    // error: {
    //   appenders: ['dayfile'],
    //   level: 'debug'
    // }
  }
});

/**
 * 主进程日志记录
 */
export const mainLogger = Log4js.getLogger();
