const uppercamelcase = require('uppercamelcase');
module.exports = {
    description: '新建组件',
    prompts: [
        {
            type: 'list',
            name: 'module',
            message: '请选择组件模块',
            choices: [
                '业务组件',
                '表单组件',
                '展示组件',
                'F2',
                'WeChat'
              ],
        },
        {
            type: 'input',
            name: 'cName',
            message: '请输入组件中文名',
            validate: v => {
                if (!v || v.trim === '') {
                    return '中文名不能为空'
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'tName',
            message: '请输入组件名称',
            validate: v => {
                if (!v || v.trim === '') {
                    return '组件名称不能为空'
                } else {
                    return true
                }
            }
        }
    ],
    actions: (data) => {
        console.log()
        const name = 'V' + uppercamelcase(data.tName)
        const vName = 'v-' + '{{dashCase tName}}';
        const vSmallName = 'v' + '{{Lower tName}}';
        const actions = [
            {
                force: true,
                type: 'add',
                path: `./lib/${vName}/${vName}.js`,
                templateFile: './plop-templates/lib/component.hbs',
                data: {
                    name,
                }
            },
            {
                force: true,
                type: 'add',
                path: `./lib/${vName}/index.js`,
                templateFile: './plop-templates/lib/index.js.hbs',
                data: {
                    name,
                }
            },
            {
                force: true,
                type: 'add',
                path: `./lib/${vName}/index.less`,
                templateFile: './plop-templates/lib/index.less.hbs',
                data: {
                    name,
                }
            },
            {
                force: true,
                type: 'append',
                pattern: "/* PLOP_INJECT_EXPORT_1 */",
                path: './lib/index.js',
                template: `import ${name} from './${vName}'`,
            },
            {
                force: true,
                type: 'append',
                pattern: "/* PLOP_INJECT_EXPORT_2 */",
                path: './lib/index.js',
                template: `  ${name},`,
            },
            {
                force: true,
                type: 'add',
                path: `./examples/views/${vSmallName}/index.vue`,
                templateFile: './plop-templates/examples/index.hbs',
                data: {
                    name,
                }
            },
            {
                force: true,
                type: 'add',
                path: `./examples/views/${vSmallName}/README.md`,
                templateFile: './plop-templates/examples/readme.hbs',
                data: {
                    name,
                }
            },
            {
                force: true,
                type: 'append',
                pattern: `/* PLOP_INJECT_EXPORT_${data.module} */`,
                path: './examples/config.js',
                template: `        { path: '${vSmallName}', title: '${vName}' },`,
            },
        ]
        return actions
    }
}