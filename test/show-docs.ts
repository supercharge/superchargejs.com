import { test } from 'uvu'
import expect from 'expect'
import Supertest from 'supertest'
import { createHttpApp } from '../bootstrap/create-http-app'

const httpKernel = createHttpApp()

test.skip('docs root path navigates to installation', async () => {
  await Supertest(httpKernel.callback())
    .get('/docs')
    .expect(200)
})

test.skip('routes to latest docs path', async () => {
  const response = await Supertest(httpKernel.callback())
    .get('/docs/strings')
    .expect(200)

  expect(response.body).toContain('npm install @supercharge/strings')
})

test.run()
