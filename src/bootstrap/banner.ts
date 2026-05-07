/* eslint-disable no-useless-escape */
const BUDDHA_ART = `
                 _oo0oo_
                o8888888o
                88" . "88
                (| -_- |)
                0\\  =  /0
              ___/'---'\\___
            .' \\|       |/ '.
           / \\|||  :  |||// \\
          / _||||| -:- |||||- \\
         |   | \\\  -  /// |   |
         | \\_|  ''\\---/''  |_/ |
         \\  .-\\__  '-'  ___/-. /
       ___'. .'  /--.--\\  '. .'___
    ."" '<  '.___\\_<|>_/___.' >' "".
   | | :  '- \\'.;'\\ _ /';.'/ - ' : | |
   \\  \\ '_.   \\_ __\\ /__ _/   .-' /  /
    '-._'.___  /__\\.-.\\__/__.- _.-'

        佛祖保佑  永无BUG  永不宕机
`;

export function printBanner(url: string): void {
  console.log(`Application is running on: ${url}`);

  console.log(BUDDHA_ART);
}
