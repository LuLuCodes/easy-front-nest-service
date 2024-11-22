import { JSDOM } from 'jsdom';

function parse_style(style_string: string): Record<string, string> {
  if (!style_string) return {};

  return style_string.split(';').reduce((styles, style) => {
    const [key, value] = style.split(':').map((s) => s.trim());
    if (key && value) {
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styles[camelKey] = value;
    }
    return styles;
  }, {});
}

function convert_color(color: string) {
  if (!color) return null;

  if (color.startsWith('#')) {
    return color.substring(1).toUpperCase();
  }

  if (color.startsWith('rgb')) {
    const values = color.match(/\d+/g);
    if (values && values.length >= 3) {
      return values
        .slice(0, 3)
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase();
    }
  }

  const colorMap = {
    red: 'FF0000',
    black: '000000',
    yellow: 'FFFF00',
    white: 'FFFFFF',
    blue: '0000FF',
    green: '00FF00',
  };

  return colorMap[color.toLowerCase()] || null;
}

export function convert_html_to_ppt(
  html_string: string,
): Array<{ text: string; options: Record<string, any> }> {
  const dom = new JSDOM(html_string);
  const document = dom.window.document;

  const text_array = [];
  const listCounter = new Map<HTMLElement, number>(); // 跟踪有序列表的计数

  function getListItemMarker(node: Element): string {
    if (node.tagName.toLowerCase() === 'li') {
      const parentList = node.parentElement;
      if (parentList) {
        if (parentList.tagName.toLowerCase() === 'ul') {
          return '• '; // 无序列表使用圆点
        } else if (parentList.tagName.toLowerCase() === 'ol') {
          // 获取或初始化计数器
          if (!listCounter.has(parentList)) {
            listCounter.set(parentList, 1);
          }
          const counter = listCounter.get(parentList);
          listCounter.set(parentList, counter + 1);
          return `${counter}. `; // 有序列表使用数字
        }
      }
    }
    return '';
  }

  function getListIndentation(node: Element): number {
    let level = 0;
    let currentNode = node.parentElement;
    while (currentNode) {
      if (['ul', 'ol'].includes(currentNode.tagName.toLowerCase())) {
        level++;
      }
      currentNode = currentNode.parentElement;
    }
    return level;
  }

  function processNode(node: any) {
    // 处理列表项
    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'li') {
      const indentLevel = getListIndentation(node);
      const marker = getListItemMarker(node);
      const indentation = '  '.repeat(indentLevel - 1); // 根据嵌套层级添加缩进

      if (marker) {
        text_array.push({
          text: indentation + marker,
          options: {},
        });
      }
    }

    // 处理文本节点
    if (node.nodeType === 3) {
      const text = node.textContent;
      if (text.trim()) {
        const options: any = {};
        let currentNode = node.parentElement;

        while (currentNode) {
          const style = parse_style(currentNode.getAttribute('style'));

          if (style.backgroundColor) {
            const bgColor = convert_color(style.backgroundColor);
            if (bgColor) {
              options.highlight = bgColor;
            }
          }

          if (style.color) {
            const textColor = convert_color(style.color);
            if (textColor) {
              options.color = textColor;
            }
          }

          if (style.fontSize) {
            const fontSize = parseInt(style.fontSize);
            if (!isNaN(fontSize)) {
              options.fontSize = Math.round(fontSize * 0.75);
            }
          }

          switch (currentNode.tagName.toLowerCase()) {
            case 'strong':
            case 'b':
              options.bold = true;
              break;
            case 'i':
            case 'em':
              options.italic = true;
              break;
            case 'u':
              options.underline = true;
              break;
            case 'strike':
            case 's':
              options.strike = true;
              break;
          }

          currentNode = currentNode.parentElement;
        }

        text_array.push({ text, options });
      }
    }

    // 递归处理子节点
    for (const childNode of node.childNodes) {
      processNode(childNode);
    }

    // 处理块级元素的换行
    if (node.nodeType === 1) {
      const tagName = node.tagName.toLowerCase();
      const display = dom.window.getComputedStyle(node).display;

      if (tagName === 'br') {
        // 添加对 br 标签的处理
        text_array.push({ text: '\n', options: {} });
      } else if (
        // 对列表项和列表容器添加换行
        (display === 'block' || ['li', 'ul', 'ol'].includes(tagName)) &&
        text_array.length > 0 &&
        text_array[text_array.length - 1].text !== '\n'
      ) {
        text_array.push({ text: '\n', options: {} });
      }
    }
  }

  processNode(document.body);

  // 移除末尾的换行
  if (
    text_array.length > 0 &&
    text_array[text_array.length - 1].text === '\n'
  ) {
    text_array.pop();
  }

  return text_array;
}
