import { ResponseCode } from '@config/global';

interface SignJsonData {
  [key: string]: unknown;
}

export function transArrayToObject<T extends Record<string, unknown>>(
  ary: T[],
  key: keyof T,
): Record<string, T> {
  const obj: Record<string, T> = {};
  for (const item of ary) {
    obj[String(item[key])] = { ...item };
  }
  return obj;
}

export function sortAsc(o: SignJsonData): string {
  const n: string[] = [];
  for (const k in o) n.push(k);
  n.sort();
  let str = '';
  for (let i = 0; i < n.length; i++) {
    let v: unknown = o[n[i]];
    if (v !== '') {
      if ({}.toString.call(v) === '[object Object]') {
        v = `{${sortAsc(v as SignJsonData)}}`;
      } else if ({}.toString.call(v) === '[object Array]') {
        let ary = '';
        for (const t of v as unknown[]) {
          if ({}.toString.call(t) === '[object Object]') {
            ary += `,{${sortAsc(t as SignJsonData)}}`;
          } else {
            ary += `,${sortAsc(t as SignJsonData)}`;
          }
        }
        v = '[' + ary.slice(1) + ']';
      }
      str += '&' + n[i] + '=' + String(v);
    }
  }
  return str.slice(1);
}

type DateFmtTokens = Record<string, number | string>;

export function dateFormat(date: Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string {
  const o: DateFmtTokens = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds().toString().substr(0, 3),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? String(o[k]) : ('00' + String(o[k])).substr(String(o[k]).length),
      );
    }
  }
  return fmt;
}

export function OkResponse(data?: unknown, msg = 'OK') {
  return {
    code: ResponseCode.OK,
    data,
    msg,
  };
}

export function ErrorResponse(code: ResponseCode, msg: string | Error) {
  if (typeof msg === 'string') {
    return {
      code,
      data: null,
      msg,
    };
  }

  return {
    code,
    data: null,
    msg: msg.message || JSON.stringify(msg),
  };
}

export function OtherOkResponse(data?: unknown, msg = 'OK') {
  return {
    success: true,
    data,
    msg,
  };
}

export function OtherErrorResponse(code: ResponseCode, msg: string | Error) {
  if (typeof msg === 'string') {
    return {
      success: false,
      data: null,
      msg,
    };
  }

  return {
    success: false,
    data: null,
    msg: msg.message || JSON.stringify(msg),
  };
}

export function randomNo(len = 6): string {
  let random_no = '';
  for (let i = 0; i < len; i++) {
    random_no += Math.floor(Math.random() * 10);
  }
  return String(Date.now()) + random_no;
}

export function invitationCode(id: number | string): string {
  const sourceString = '431EYZDOWGVJ5AQMSFCU2TBIRPN796XH0KL';

  let num = typeof id === 'number' ? id : parseInt(id, 10);

  let code = '';

  while (num > 0) {
    const mod = num % 35;
    num = (num - mod) / 35;
    code = sourceString.substr(mod, 1) + code;
  }

  code = '888888' + code;
  code = code.slice(code.length - 4, code.length);

  return code;
}

export function await2<T, U = Error>(
  promise: Promise<T>,
  errorExt?: Record<string, unknown>,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err as object, errorExt);
      }
      return [err, undefined];
    });
}

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const safetyParseJson = <T = unknown>(str: string): T | null => {
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
};

export function isDefined<T>(value: T): value is NonNullable<T> {
  return value != null;
}

type TreeItem<T> = T & { children: TreeItem<T>[] };

export function arrayToTree<T>(
  items: T[],
  primary_key: string = 'id',
  parent_key: string = 'parent_id',
): TreeItem<T>[] {
  const result: TreeItem<T>[] = [];
  const itemMap: Record<string, TreeItem<T>> = {};
  for (const item of items) {
    const record = item as unknown as Record<string, unknown>;
    const id = String(record[primary_key]);
    const pid = record[parent_key];

    if (!itemMap[id]) {
      itemMap[id] = { children: [] } as TreeItem<T>;
    }
    itemMap[id] = {
      ...(item as object),
      children: itemMap[id].children,
    } as TreeItem<T>;

    const treeItem = itemMap[id];

    if (pid === 0 || pid === '0') {
      result.push(treeItem);
    } else {
      const pidStr = String(pid);
      if (!itemMap[pidStr]) {
        itemMap[pidStr] = { children: [] } as TreeItem<T>;
      }
      itemMap[pidStr].children.push(treeItem);
    }
  }
  return result;
}
