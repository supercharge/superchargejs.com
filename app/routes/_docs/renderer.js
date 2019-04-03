'use strict'

const Markdown = require('marked')
const renderer = new Markdown.Renderer()
const alertRenderer = new Markdown.Renderer()

const icon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
    class="icon">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
`

alertRenderer.heading = function(text, level) {
  return `<h${level} class="alert-heading">${text}</h${level}>`
}

renderer.heading = function(text, level) {
  if (level === 1) {
    return `<h1>${text}</h1>`
  }

  const slug = text.toLowerCase().replace(/[^\w]+/g, '-')

  return `<h${level} class="docs__heading">
            <a href="#${slug}" name="${slug}">
              ${icon}
            </a>
            ${text}
          </h${level}>`
}

renderer.code = function(content, identifier, escaped) {
  if (['info', 'success', 'warning'].includes(identifier)) {
    return `<div class="alert alert-${identifier} docs__alert row">
              <div class="col-1">
                  <img src="/images/icons/alerts/${identifier}.svg" />
              </div>
              <div class="col">
                ${Markdown(content, { renderer: alertRenderer })}
              </div>
            </div>`
  }

  // use standard renderer if not matching alert identifier
  return new Markdown.Renderer().code(content, identifier, escaped)
}

Markdown.setOptions({
  renderer
})

module.exports = Markdown
