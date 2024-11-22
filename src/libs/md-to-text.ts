// 定义转换选项接口
interface MarkdownToTextOptions {
  /** 是否保留列表符号 (• 和数字) */
  preserveListMarkers?: boolean;
  /** 是否在标题前后保留换行 */
  preserveHeadingSpace?: boolean;
  /** 转换链接时是否保留URL */
  preserveLinks?: boolean;
  /** 替换多个换行符时保留的最大数量 */
  maxConsecutiveNewlines?: number;
}

/**
 * Markdown文本转换器类
 * 将Markdown格式文本转换为纯文本
 */
class MarkdownToText {
  private readonly options: Required<MarkdownToTextOptions>;

  constructor(options: MarkdownToTextOptions = {}) {
    // 设置默认选项
    this.options = {
      preserveListMarkers: true,
      preserveHeadingSpace: true,
      preserveLinks: false,
      maxConsecutiveNewlines: 2,
      ...options,
    };
  }

  /**
   * 转换Markdown文本为纯文本
   * @param markdown - 输入的Markdown格式文本
   * @returns 转换后的纯文本
   * @throws {Error} 如果输入无效
   */
  public convert(markdown: string): string {
    if (typeof markdown !== 'string') {
      throw new Error('输入必须是字符串');
    }

    if (!markdown.trim()) {
      return '';
    }

    let text = markdown;

    // 应用所有转换规则
    text = this.removeCodeBlocks(text);
    text = this.removeInlineCode(text);
    text = this.processImages(text);
    text = this.processLinks(text);
    text = this.processHeadings(text);
    text = this.processEmphasis(text);
    text = this.processLists(text);
    text = this.processBlockquotes(text);
    text = this.processHorizontalRules(text);
    text = this.processTables(text);
    text = this.cleanupWhitespace(text);

    return text.trim();
  }

  /**
   * 删除代码块
   */
  private removeCodeBlocks(text: string): string {
    return text.replace(/```[\s\S]*?```/g, '');
  }

  /**
   * 删除行内代码
   */
  private removeInlineCode(text: string): string {
    return text.replace(/`([^`]+)`/g, '$1');
  }

  /**
   * 处理图片标记
   */
  private processImages(text: string): string {
    return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '');
  }

  /**
   * 处理链接
   */
  private processLinks(text: string): string {
    return text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      this.options.preserveLinks ? '$1 ($2)' : '$1',
    );
  }

  /**
   * 处理标题
   */
  private processHeadings(text: string): string {
    const newline = this.options.preserveHeadingSpace ? '\n\n' : '\n';
    return text.replace(/^(#{1,6})\s+(.+)$/gm, `$2${newline}`);
  }

  /**
   * 处理强调语法（粗体、斜体、删除线）
   */
  private processEmphasis(text: string): string {
    // 处理粗体
    text = text.replace(/\*\*(.+?)\*\*/g, '$1');
    text = text.replace(/__(.+?)__/g, '$1');

    // 处理斜体
    text = text.replace(/\*(.+?)\*/g, '$1');
    text = text.replace(/_(.+?)_/g, '$1');

    // 处理删除线
    text = text.replace(/~~(.+?)~~/g, '$1');

    return text;
  }

  /**
   * 处理列表
   */
  private processLists(text: string): string {
    if (this.options.preserveListMarkers) {
      // 处理无序列表
      text = text.replace(/^\s*[-*+]\s+(.+)/gm, '• $1');
      // 处理有序列表
      text = text.replace(/^\s*(\d+)\.\s+(.+)/gm, '$1. $2');
    } else {
      // 移除所有列表标记
      text = text.replace(/^\s*[-*+]\s+(.+)/gm, '$1');
      text = text.replace(/^\s*\d+\.\s+(.+)/gm, '$1');
    }
    return text;
  }

  /**
   * 处理引用块
   */
  private processBlockquotes(text: string): string {
    return text.replace(/^\s*>\s+(.+)/gm, '$1');
  }

  /**
   * 处理水平分割线
   */
  private processHorizontalRules(text: string): string {
    return text.replace(/^\s*[-*_]{3,}\s*$/gm, '\n');
  }

  /**
   * 处理表格
   */
  private processTables(text: string): string {
    // 移除表格分隔符行
    text = text.replace(/^\|?(?:[-:]|[:]-|:-:|\|-)+\|?$/gm, '');
    // 处理表格内容行，保留单元格内容
    text = text.replace(/^\|(.+)\|$/gm, (_, cells) => {
      return cells
        .split('|')
        .map((cell) => cell.trim())
        .join(' ');
    });
    return text;
  }

  /**
   * 清理空白字符
   */
  private cleanupWhitespace(text: string): string {
    // 替换多个换行符
    const maxNewlines = this.options.maxConsecutiveNewlines;
    const newlineRegex = new RegExp(`\\n{${maxNewlines + 1},}`, 'g');
    text = text.replace(newlineRegex, '\n'.repeat(maxNewlines));

    // 清理行首行尾空白
    return text
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  }
}

// 导出类型和类
export { MarkdownToText, MarkdownToTextOptions };
