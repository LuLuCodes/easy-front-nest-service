import {
  arrayToTree,
  await2,
  dateFormat,
  ErrorResponse,
  invitationCode,
  isDefined,
  OkResponse,
  OtherErrorResponse,
  OtherOkResponse,
  randomNo,
  safetyParseJson,
  sortAsc,
  transArrayToObject,
  wait,
} from './util';

describe('libs/util', () => {
  describe('transArrayToObject', () => {
    it('rekeys an array by the given property', () => {
      const out = transArrayToObject(
        [
          { id: 1, n: 'a' },
          { id: 2, n: 'b' },
        ],
        'id',
      );
      expect(out).toEqual({ 1: { id: 1, n: 'a' }, 2: { id: 2, n: 'b' } });
    });
  });

  describe('sortAsc', () => {
    it('produces an ampersand-joined sorted query-ish string for flat objects', () => {
      expect(sortAsc({ b: 2, a: 1 })).toBe('a=1&b=2');
    });

    it('drops empty-string values but keeps zero', () => {
      expect(sortAsc({ a: '', b: 0, c: 'x' })).toBe('b=0&c=x');
    });

    it('recursively flattens nested objects', () => {
      expect(sortAsc({ inner: { a: 1 }, b: 2 })).toBe('b=2&inner={a=1}');
    });

    it('flattens nested arrays of primitives + objects', () => {
      const out = sortAsc({ arr: [1, { x: 2 }] });
      expect(out.startsWith('arr=[')).toBe(true);
    });
  });

  describe('dateFormat', () => {
    it('renders default yyyy-MM-dd hh:mm:ss', () => {
      const out = dateFormat(new Date('2026-05-09T10:11:12.345Z'));
      expect(out).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it('respects a custom format', () => {
      const out = dateFormat(new Date(2026, 4, 9, 10, 11, 12), 'yyyy/MM/dd');
      expect(out).toBe('2026/05/09');
    });
  });

  describe('response envelopes', () => {
    it('OkResponse wraps data', () => {
      expect(OkResponse({ x: 1 })).toEqual({ code: expect.anything(), data: { x: 1 }, msg: 'OK' });
    });

    it('ErrorResponse handles string', () => {
      expect(ErrorResponse(1 as never, 'bad')).toMatchObject({ data: null, msg: 'bad' });
    });

    it('ErrorResponse handles Error instance', () => {
      expect(ErrorResponse(1 as never, new Error('boom'))).toMatchObject({ msg: 'boom' });
    });

    it('OtherOkResponse / OtherErrorResponse use success boolean', () => {
      expect(OtherOkResponse({})).toMatchObject({ success: true });
      expect(OtherErrorResponse(1 as never, 'x')).toMatchObject({ success: false });
      expect(OtherErrorResponse(1 as never, new Error('e'))).toMatchObject({ success: false });
    });
  });

  describe('await2', () => {
    it('returns [null, value] on resolve', async () => {
      const [err, val] = await await2(Promise.resolve(7));
      expect(err).toBeNull();
      expect(val).toBe(7);
    });

    it('returns [err, undefined] on reject', async () => {
      const [err, val] = await await2(Promise.reject(new Error('x')));
      expect(err).toBeInstanceOf(Error);
      expect(val).toBeUndefined();
    });

    it('attaches errorExt onto the rejection', async () => {
      const [err] = await await2(Promise.reject(new Error('x')), { tag: 'extra' });
      expect((err as unknown as { tag?: string }).tag).toBe('extra');
    });
  });

  describe('randomNo', () => {
    it('returns a numeric-string longer than the timestamp itself', () => {
      const v = randomNo(6);
      expect(v.length).toBeGreaterThan(String(Date.now()).length);
      expect(/^\d+$/.test(v)).toBe(true);
    });
  });

  describe('invitationCode', () => {
    it('returns a 4-character invitation code', () => {
      const code = invitationCode(12345);
      expect(code).toHaveLength(4);
    });
  });

  describe('isDefined', () => {
    it('treats null/undefined as not defined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
    });
  });

  describe('safetyParseJson', () => {
    it('parses valid JSON', () => {
      expect(safetyParseJson('{"a":1}')).toEqual({ a: 1 });
    });

    it('returns null on invalid JSON', () => {
      expect(safetyParseJson('{bad}')).toBeNull();
    });
  });

  describe('wait', () => {
    it('resolves after at least the requested ms', async () => {
      const t = Date.now();
      await wait(10);
      expect(Date.now() - t).toBeGreaterThanOrEqual(8);
    });
  });

  describe('arrayToTree', () => {
    it('builds a parent/children tree from a flat list', () => {
      const items = [
        { id: 1, parent_id: 0, n: 'root' },
        { id: 2, parent_id: 1, n: 'child' },
        { id: 3, parent_id: 2, n: 'grandchild' },
      ];
      const tree = arrayToTree(items);
      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe(1);
      expect(tree[0].children[0].id).toBe(2);
      expect(tree[0].children[0].children[0].id).toBe(3);
    });

    it('keeps orphan child grouped under a synthetic parent map', () => {
      const items = [{ id: 5, parent_id: 99 }];
      const tree = arrayToTree(items);
      // No node with parent_id=0, so the result array stays empty —
      // orphan ends up in itemMap[99].children
      expect(tree).toEqual([]);
    });
  });
});
