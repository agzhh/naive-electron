import ini from 'ini';
import fs from 'fs';
import path from 'path';

export const getConfig = async () => {
  try {
    const config = fs.readFileSync(path.join(process.cwd(), 'resources/config/config.ini'), 'utf-8').toString();
    return ini.parse(config);
  } catch (e) {
    return Promise.resolve({});
  }
};
