const path = require('path')
const fs = require('fs')
const isTest = false

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '项目名称',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: '鸟瞰智能项目描述',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: '作者',
    },
    build: {
      when: 'isNotTest',
      type: 'list',
      message: 'Vue build',
      choices: [
        {
          name: 'Runtime + Compiler: recommended for most users',
          value: 'standalone',
          short: 'standalone',
        },
        {
          name:
            'Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
          value: 'runtime',
          short: 'runtime',
        },
      ],
    },
    router: {
      when: 'isNotTest',
      type: 'confirm',
      message: '集成 vue-router?',
    },
    vuex: { //  add
      when: 'isNotTest',
      type:'confirm',
      message:'集成 vuex?'
    },
    http: {
      when: 'isNotTest',
      type:'confirm',
      message:'集成封装好的 axios?'
    },
    weixin: {
      when: 'isNotTest',
      type: 'confirm',
      message: '集成微信SDK?',
    },
    lint: {
      when: 'isNotTest',
      type: 'confirm',
      message: '使用ESLint来约束代码?',
    },
    lintConfig: {
      when: 'isNotTest && lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ],
    },
    // unit: {
    //   when: 'isNotTest',
    //   type: 'confirm',
    //   message: '设置单元测试?',
    // },
    // runner: {
    //   when: 'isNotTest && unit',
    //   type: 'list',
    //   message: 'Pick a test runner',
    //   choices: [
    //     {
    //       name: 'Jest',
    //       value: 'jest',
    //       short: 'jest',
    //     },
    //     {
    //       name: 'Karma and Mocha',
    //       value: 'karma',
    //       short: 'karma',
    //     },
    //     {
    //       name: 'none (configure it yourself)',
    //       value: 'noTest',
    //       short: 'noTest',
    //     },
    //   ],
    // },
    // e2e: {
    //   when: 'isNotTest',
    //   type: 'confirm',
    //   message: 'Setup e2e tests with Nightwatch?',
    // },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    'test/*': isTest,
    'config/test.env.js': isTest,
    'build/webpack.test.conf.js': isTest,
    // 'config/test.env.js': 'unit || e2e',
    // 'build/webpack.test.conf.js': "unit && runner === 'karma'",
    // 'test/unit/**/*': 'unit',
    // 'test/unit/index.js': "unit && runner === 'karma'",
    // 'test/unit/jest.conf.js': "unit && runner === 'jest'",
    // 'test/unit/karma.conf.js': "unit && runner === 'karma'",
    // 'test/unit/specs/index.js': "unit && runner === 'karma'",
    // 'test/unit/setup.js': "unit && runner === 'jest'",
    // 'test/e2e/**/*': 'e2e',
    'src/router/**/*': 'router',
    'src/store/**/*': 'vuex', // add 加入自己的目录
    'src/http.js': 'http', //add 加入自己的目录
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
