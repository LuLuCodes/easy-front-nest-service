import { executeFunction } from './execute-fun';

describe('executeFunction', () => {
  it('runs the wrapped body and returns the value', async () => {
    const out = await executeFunction('return args.a + args.b;', { a: 1, b: 2 });
    expect(out).toBe(3);
  });

  it('supports async logic inside the function body', async () => {
    const out = await executeFunction(
      'await new Promise((r) => setTimeout(r, 5)); return args.value;',
      { value: 'ok' },
    );
    expect(out).toBe('ok');
  });

  it('throws when the body has a syntax error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    await expect(executeFunction('not-valid-js', { a: 1 })).rejects.toThrow('执行自定义函数失败');
  });
});
