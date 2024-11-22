import { JSDOM } from 'jsdom';

interface HTMLToMarkdownOptions {
  /**
   * Whether to preserve empty lines in the HTML
   * @default true
   */
  preserveEmptyLines?: boolean;
  /**
   * Maximum consecutive empty lines to preserve
   * @default 2
   */
  maxConsecutiveEmptyLines?: number;
  /**
   * Whether to preserve line breaks in text content
   * @default true
   */
  preserveLineBreaks?: boolean;
}

export function htmlToMarkdown(
  html: string,
  options: HTMLToMarkdownOptions = {},
): string {
  const {
    preserveEmptyLines = true,
    maxConsecutiveEmptyLines = 2,
    preserveLineBreaks = true,
  } = options;

  // 使用 jsdom 创建虚拟 DOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  function convertNode(node: HTMLElement | ChildNode): string {
    if (node.nodeType === document.TEXT_NODE) {
      let text = (node as Text).textContent || '';
      // 处理空白字符
      text = preserveLineBreaks ? text : text.replace(/\n/g, ' ');
      return text.replace(/\s+/g, ' ');
    }

    if (node.nodeType !== document.ELEMENT_NODE) {
      return '';
    }

    const element = node as HTMLElement;
    const childrenContent = Array.from(element.childNodes)
      .map((child) => convertNode(child))
      .join('');

    switch (element.tagName.toLowerCase()) {
      case 'h1':
        return `# ${childrenContent}\n\n`;
      case 'h2':
        return `## ${childrenContent}\n\n`;
      case 'h3':
        return `### ${childrenContent}\n\n`;
      case 'h4':
        return `#### ${childrenContent}\n\n`;
      case 'h5':
        return `##### ${childrenContent}\n\n`;
      case 'h6':
        return `###### ${childrenContent}\n\n`;
      case 'p':
        return `${childrenContent}\n\n`;
      case 'strong':
      case 'b':
        return `**${childrenContent}**`;
      case 'em':
      case 'i':
        return `*${childrenContent}*`;
      case 'a': {
        const href = (element as HTMLAnchorElement).getAttribute('href');
        return href ? `[${childrenContent}](${href})` : childrenContent;
      }
      case 'img': {
        const imgElement = element as HTMLImageElement;
        const src = imgElement.getAttribute('src');
        if (src.startsWith('data:')) {
          return '';
        }
        const alt = imgElement.getAttribute('alt') || '';
        return src ? `![${alt}](${src})` : '';
      }
      case 'ul':
        return processListItems(element, '*');
      case 'ol':
        return processListItems(element, '1.');
      case 'li':
        // 列表项的处理将在 processListItems 中完成
        return childrenContent;
      case 'code': {
        const isInPre = element.parentElement?.tagName.toLowerCase() === 'pre';
        if (isInPre) {
          const className = element.getAttribute('class') || '';
          const language = className.match(/language-(\w+)/)?.[1] || '';
          return `${language}\n${childrenContent}`;
        }
        return `\`${childrenContent}\``;
      }
      case 'pre':
        return `\`\`\`${childrenContent}\`\`\`\n\n`;
      case 'hr':
        return '---\n\n';
      case 'br':
        return '\n';
      case 'blockquote':
        return (
          childrenContent
            .split('\n')
            .map((line) => `> ${line}`)
            .join('\n') + '\n\n'
        );
      case 'table':
        return processTable(element as HTMLTableElement);
      case 'del':
      case 's':
        return `~~${childrenContent}~~`;
      case 'input': {
        const inputElement = element as HTMLInputElement;
        const type = inputElement.getAttribute('type');
        const checked = inputElement.hasAttribute('checked');
        if (type === 'checkbox') {
          return `[${checked ? 'x' : ' '}] `;
        }
        return '';
      }
      default:
        return childrenContent;
    }
  }

  function processTable(tableElement: HTMLTableElement): string {
    let markdown = '\n';
    const rows = Array.from(tableElement.rows);

    if (rows.length === 0) return '';

    // 处理表头
    const headerCells = Array.from(rows[0].cells);
    markdown +=
      '| ' +
      headerCells.map((cell) => cell.textContent?.trim() || '').join(' | ') +
      ' |\n';
    markdown += '| ' + headerCells.map(() => '---').join(' | ') + ' |\n';

    // 处理数据行
    for (let i = 1; i < rows.length; i++) {
      const cells = Array.from(rows[i].cells);
      markdown +=
        '| ' +
        cells.map((cell) => cell.textContent?.trim() || '').join(' | ') +
        ' |\n';
    }

    return markdown + '\n';
  }

  function processListItems(listElement: HTMLElement, marker: string): string {
    let result = '\n';
    const items = Array.from(listElement.children);
    const baseIndentation = getElementIndentation(listElement);

    items.forEach((item, index) => {
      if (item.tagName.toLowerCase() === 'li') {
        const itemContent = convertNode(item).trim();
        const indentation = ' '.repeat(baseIndentation);
        const prefix = marker === '1.' ? `${index + 1}.` : marker;
        result += `${indentation}${prefix} ${itemContent}\n`;
      }
    });

    return result + '\n';
  }

  function getElementIndentation(element: HTMLElement): number {
    let indent = 0;
    let parent = element.parentElement;
    while (parent) {
      if (
        parent.tagName.toLowerCase() === 'ul' ||
        parent.tagName.toLowerCase() === 'ol'
      ) {
        indent += 2;
      }
      parent = parent.parentElement;
    }
    return indent;
  }

  // 开始转换
  let markdown = convertNode(document.body);
  // 处理连续的空行
  if (!preserveEmptyLines) {
    markdown = markdown.replace(/\n\s*\n/g, '\n');
  } else if (maxConsecutiveEmptyLines > 0) {
    const maxEmptyLines = '\n'.repeat(maxConsecutiveEmptyLines + 1);
    const replacement = '\n'.repeat(maxConsecutiveEmptyLines);

    markdown = markdown.replace(new RegExp(maxEmptyLines, 'g'), replacement);
  }

  // 清理 DOM
  dom.window.close();
  // 移除所有星号
  markdown = markdown.replace(/\*/g, '');

  return markdown.trim();
}
