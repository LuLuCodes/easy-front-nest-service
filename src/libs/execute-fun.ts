/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-08-06 10:55:38
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-08-27 19:11:45
 * @FilePath: /easy-front-nest-service/src/libs/execute-fun.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// import * as vm from 'vm';

// export async function executeFunction(
//   functionBody: string,
//   args: Record<string, any>,
// ): Promise<any> {
//   try {
//     // Create a new context
//     const context: vm.Context = {
//       console: console,
//       // Add other global variables or functions as needed
//     };

//     // Wrap the function string in an immediately invoked function expression (IIFE)
//     // that accepts parameters
//     const wrappedFunction = `
//         (async function(args) {
//           const func = function(){${functionBody}};
//           return func(args);
//         })(${JSON.stringify(args)})
//       `;

//     // Execute the function in a sandboxed environment
//     const result = await vm.runInNewContext(wrappedFunction, context);

//     return result;
//   } catch (error) {
//     console.error('Error executing custom function:', error);
//     throw new Error('Failed to execute custom function');
//   }
// }

// 兼容前后端，使用 eval 函数来执行代码,因为浏览器环境中没有 vm 模块
export async function executeFunction(
  functionBody: string,
  args: Record<string, any>,
): Promise<any> {
  try {
    // 创建一个包装函数,接受参数并执行代码
    const wrappedFunction = `
      (async function(args) {
        const func = async function(){${functionBody}};
        return await func(args);
      })(${JSON.stringify(args)})
    `;

    // 使用 eval 执行包装函数
    const result = await eval(wrappedFunction);

    return result;
  } catch (error) {
    console.error('执行自定义函数出错:', error);
    throw new Error('执行自定义函数失败');
  }
}
