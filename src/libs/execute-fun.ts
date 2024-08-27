/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-08-06 10:55:38
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-08-27 19:07:44
 * @FilePath: /easy-front-nest-service/src/libs/execute-fun.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import * as vm from 'vm';

export async function executeFunction(
  functionBody: string,
  args: Record<string, any>,
): Promise<any> {
  try {
    // Create a new context
    const context: vm.Context = {
      console: console,
      // Add other global variables or functions as needed
    };

    // Wrap the function string in an immediately invoked function expression (IIFE)
    // that accepts parameters
    const wrappedFunction = `
        (async function(args) { 
          const func = function(){${functionBody}};
          return func(args);
        })(${JSON.stringify(args)})
      `;

    // Execute the function in a sandboxed environment
    const result = await vm.runInNewContext(wrappedFunction, context);

    return result;
  } catch (error) {
    console.error('Error executing custom function:', error);
    throw new Error('Failed to execute custom function');
  }
}
