
import Fs from '@supercharge/fs'
import { Str } from '@supercharge/strings'
import FrontMatter from 'front-matter'
import { tap } from '@supercharge/goodies'
import { Application } from '@supercharge/contracts'
import { MarkdownRenderer } from '../modules/markdown/markdown-renderer.js'

export class Post {
  /**
   * Stores the post attributes, like title, author, publishedAt, html.
   */
  private readonly post: PostAttributes

  /**
   * Create a new documentation instance.
   */
  constructor () {
    this.post = { title: '', markdown: '' }
  }

  /**
   * Load a post from the given file `path`.
   */
  static async loadFrom (path: string, app: Application): Promise<Post> {
    return this.createFrom(
      await Fs.content(path), app
    )
  }

  /**
   * Returns a new post instance from the `raw` markdown content.
   */
  static async createFrom (raw: string, app: Application): Promise<Post> {
    // @ts-expect-error TODO: fix this
    const parsed = FrontMatter<PostAttributes>(raw)

    return new this()
      .withMarkdownContent(parsed.body)
      .withTitle(parsed.attributes.title)
      .withAuthor(parsed.attributes.author)
      .withPublishedAt(parsed.attributes.publishedAt)
      .withHtml(
        await this.markdownRenderer(app).render(parsed.body)
      )
  }

  /**
   * Returns the markdown renderer instance.
   */
  static markdownRenderer (app: Application): MarkdownRenderer {
    return app.make(MarkdownRenderer)
  }

  /**
   * Assign the given `title` to this post.
   */
  withTitle (title: string): this {
    return tap(this, () => {
      this.post.title = title
    })
  }

  /**
   * Assign the given `author` to this post.
   */
  withAuthor (author?: string): this {
    return tap(this, () => {
      this.post.author = author
    })
  }

  /**
   * Assign the given `publishedAt` date to this post.
   */
  withPublishedAt (publishedAt?: string): this {
    return tap(this, () => {
      this.post.publishedAt = publishedAt
    })
  }

  /**
   * Returns the published at date.
   */
  publishedAt (): Date {
    return new Date(this.post.publishedAt ?? '')
  }

  /**
   * Determine whether this post is already published.
   */
  isPublished (): boolean {
    return Str(this.post.publishedAt).isNotEmpty()
  }

  /**
   * Returns the published at date in format `Nov 07, 2021`.
   */
  formattedPublishedAt (): string {
    return this.publishedAt().toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: '2-digit'
    })
  }

  /**
   * Assign the given `tags` to this post.
   */
  withTags (tags?: string[]): this {
    return tap(this, () => {
      this.post.tags = tags
    })
  }

  /**
   * Assign the given markdown `content` to this post.
   */
  withMarkdownContent (content: string): this {
    return tap(this, () => {
      this.post.markdown = content
    })
  }

  /**
   * Assign the given `html` content to this post.
   */
  withHtml (html: string): this {
    return tap(this, () => {
      this.post.html = html
    })
  }

  /**
   * Returns an object representation of this post.
   */
  toJSON (): object {
    return {
      title: this.post.title,
      author: this.post.author,
      content: this.post.html,
      tags: this.post.tags,
      publishedAt: this.formattedPublishedAt(),
    }
  }
}

interface PostAttributes {
  /**
   * The post title.
   */
  title: string

  /**
   * The author name.
   */
  author?: string

  /**
   * The “published at” date
   */
  publishedAt?: string

  /**
   * The assigned tags.
   */
  tags?: string[]

  /**
   * The markdown content.
   */
  markdown: string

  /**
   * The rendered HTML of the content.
   */
  html?: string
}
