var marked = require('marked')
var hljs = require('~/plugins/highlight.js')

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight(code) {
        return hljs.highlightAuto(code).value
    }
})

// 段落解析
const paragraphParse = text => `<p>${text}</p>`

// 对连接进行权重防流和新窗处理
const linkParse = (href, title, text) => {
  const isSelf = href.includes('localhost') || href.includes('zhuding.xyz')
  const textIsImage = text.includes('<img')
  return `<a href="${href}" 
             target="_blank" 
             class="${textIsImage ? 'image-link' : 'link'}"
             title="${title || (textIsImage ? href : text)}" 
             ${isSelf ? '' : 'rel="external nofollow"'}>${text}</a>`.replace(/\s+/g, ' ').replace('\n', '')
}

// 对图片进行弹窗处理
const imageParse = (src, title, alt) => {
  src = src.replace(/^http:\/\//ig, "/proxy/")
  return `<img src="${src}" 
               class="article_img"
               title="${title || alt || 'zhuding.xyz'}" 
               alt="${alt || title || src}" 
               onclick="if(window.utils) window.utils.openImgPopup('${src}')"/>`.replace(/\s+/g, ' ').replace('\n', '')
}

// 代码解析器（行号处理）
const codeParse = function(code, lang, escaped) {
  if (this.options.highlight) {
    const out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }
  const lineNums = code.split('\n').map((l, i) => {
    return `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' ')
  }).join('')
  if (!lang) {
    return `<pre>
              <ul class="code-lines">${lineNums}</ul>
              <code>${(escaped ? code : escape(code, true))}\n</code>
            </pre>`.replace('\n', '')
  } else {
    return `<pre data-lang="${lang}">
              <ul class="code-lines">${lineNums}</ul>
              <code class="${this.options.langPrefix}${escape(lang, true)}">${(escaped ? code : escape(code, true))}\n</code>
            </pre>\n`.replace('\n', '')
  }
}

var renderer = new marked.Renderer()

renderer.link = linkParse
renderer.code = codeParse
renderer.image = imageParse
renderer.paragraph = paragraphParse

export default (content, parseHtml = false) => {
    // 评论不解析html
    marked.setOptions({sanitize: !parseHtml})

    if (!content || typeof content !== "string") {
        return ''
    }

    return marked(content, {renderer})
}