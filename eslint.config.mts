import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['src/uni_modules/', 'src/static/', '.vscode', '.husky'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      // 不允许存在未使用的变量
      '@typescript-eslint/no-unused-vars': 'warn',
      // vue 组件多单词驼峰命名
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['App', 'Index', 'Home'], // 允许这些单词组件名
        },
      ],
      // 禁止变量重新声明
      '@typescript-eslint/no-redeclare': 'error',
      // 禁止变量重新声明，与 @typescript-eslint 重复提示了，关闭它
      'no-redeclare': 'off',
    },
  },
])
