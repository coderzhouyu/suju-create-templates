#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import {
    blue,
    cyan,
    green,
    lightRed,
    magenta,
    red,
    reset,
    yellow
} from 'kolorist';

// 定义支持的框架和模板
const FRAMEWORKS = [
    {
        name: 'Vue',
        color: green
    }
];

// 格式化框架选择显示
const formatFramework = (framework) => {
    return framework.color(framework.name);
};

// 格式化变体选择显示
const formatVariant = (variant, framework) => {
    return variant.color(`${framework.name} ${variant.display}`);
};

// 主函数
async function createProject(projectName, options) {
    const cwd = process.cwd();
    const targetDir = path.resolve(cwd, projectName || '.');

    // 检查目录是否存在
    if (fs.existsSync(targetDir)) {
        if (options.force) {
            await fs.remove(targetDir);
        } else {
            const { overwrite } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: `目标目录 "${projectName}" 已存在。是否覆盖?`,
                    default: false
                }
            ]);

            if (!overwrite) {
                console.log('✖ 操作已取消');
                return;
            }

            console.log(`\n正在移除现有目录...`);
            await fs.remove(targetDir);
        }
    }

    // 询问用户选择框架
    const { framework } = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: '选择一个框架:',
            choices: FRAMEWORKS.map(fw => ({
                name: formatFramework(fw),
                value: fw
            }))
        }
    ]);



    console.log(`\n正在创建项目于 ${green(targetDir)}...`);
    const TEMPLATE_REPO = "";// gitee 上面存一份
    // 这里使用degit从模板仓库克隆代码
    // 实际使用时，你需要替换为自己的模板仓库
    const templateRepo = options.repo || TEMPLATE_REPO;
    const templatePath = `${framework.name.toLowerCase()}`; // 模板路径

    try {
        // 克隆模板
        console.log(`\n正在拉取模板 ${cyan(templateRepo)}...`);
        //'degit', [
        // `${templateRepo}#master:${templatePath}`, // main是分支名，根据实际修改
        //     targetDir
        // ]
        execSync(`npx degit ${templateRepo}#master:${templatePath} ${targetDir} --allow-untrusted`);

        // 修改package.json中的项目名称
        const pkgPath = path.join(targetDir, 'package.json');
        if (fs.existsSync(pkgPath)) {
            const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
            pkg.name = projectName || path.basename(targetDir);
            await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
        }

        // 安装依赖
        console.log(`\n正在安装依赖...`);
        execSync('npm install', { cwd: targetDir, stdio: 'inherit' });

        // 成功信息
        console.log(`\n${green('✓')} 项目创建成功!`);
        console.log(`\n进入项目目录并启动开发服务器:`);
        console.log(`  ${cyan('cd')} ${projectName || '.'}`);
        console.log(`  ${cyan('npm run dev')}`);
    } catch (error) {
        console.error(`\n${red('✖')} 创建项目失败:`, error.message);
        process.exit(1);
    }
}

// 配置命令行
program
    .name('create-my-project')
    .description('创建一个新的项目')
    .version('1.0.0')
    .argument('[project-name]', '项目名称')
    .option('-f, --force', '强制覆盖现有目录')
    .option('-r, --repo <url>', '指定自定义模板仓库地址') // 新增：允许动态指定仓库
    .action(createProject);

// 解析命令行参数
program.parse(process.argv);
