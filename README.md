# koaLearn

## 环境搭建

开发依赖：[ts-node](https://typestrong.org/ts-node/)、[nodemon](https://www.npmjs.com/package/nodemon)、[tsconfig-paths
](https://www.npmjs.com/package/tsconfig-paths)
ts-node -r : Require a node module before execution
tsconfig-paths:

使用它来加载位置在 tsconfig.json 的路径部分中指定的模块。支持在运行时加载和通过 API 加载。

Typescript 默认模仿模块的 Node.js 运行时解析策略。但它也允许使用路径映射，允许指定任意模块路径（不以“/”或“.”开头）并将其映射到文件系统中的物理路径。 typescript 编译器可以从 tsconfig 解析这些路径，因此它可以编译。但是，如果您尝试使用 node（或 ts-node）执行编译后的文件，它只会在 node_modules 文件夹中一直查找到文件系统的根目录，因此不会找到 tsconfig 中路径指定的模块。

## 参考

[typeScript + Koa](https://www.keysking.com/index.php/archives/4/)

[koa-note](https://chenshenhai.github.io/koa2-note/note/route/koa-router.html)
