module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.node.json']
  },
  plugins: ['vue'],
  rules: {
    'import/prefer-default-export': 'off', // 关闭导出一个只能用export default 的限制
    'import/extensions': 'off', // 解决eslint不识别 @ 别名
    'import/no-unresolved': 'off', // 解决eslint不识别 @ 别名
    'import/no-extraneous-dependencies': 'off', // 关闭内置模块审查
    'vue/multi-word-component-names': 'off', // 关闭名称校验
    // 开发环境不对console进行审查
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 允许使用自增自减符号
    'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],
    // 允许修改函数的入参
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['config', 'app', 'state']
      }
    ],
    'newline-per-chained-call': 'off', // 允许使用链式调用
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
