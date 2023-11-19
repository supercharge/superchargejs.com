import { test } from 'uvu'
import { expect } from 'expect'
import Supertest from 'supertest'
import { createHttpApp } from '../bootstrap/create-http-app.js'

const httpKernel = createHttpApp()

test('docs root path navigates to installation', async () => {
  const response = await Supertest(await httpKernel.serverCallback())
    .get('/docs')
    .expect(302)

  expect(response.headers.location).toEqual('/docs/3.x/installation')
})

test('routes to latest docs path', async () => {
  const response = await Supertest(await httpKernel.serverCallback())
    .get('/docs/strings')
    .expect(302)

  expect(response.headers.location).toEqual('/docs/3.x/strings')
})

test('retrieves a 2.x docs page', async () => {
  const response = await Supertest(await httpKernel.serverCallback())
    .get('/docs/2.x/strings')
    .expect(200)

  expect(response.text).toContain('package provides chainable string utilities for Node.js')
})

test('retrieves a 3.x docs page', async () => {
  const response = await Supertest(await httpKernel.serverCallback())
    .get('/docs/3.x/strings')
    .expect(200)

  expect(response.text).toContain('package provides chainable string utilities for Node.js')
})

test.run()
