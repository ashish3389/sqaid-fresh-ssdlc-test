import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

async function readJson(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'))
}

const health = await readJson('health.json')
assert.equal(health.status, 'ok')
assert.equal(health.service, 'forge-fresh-ssdlc-test')
assert.ok(health.requirement)

const proof = await readJson('forge-flow-proof.json')
assert.equal(proof.humanReviewRequired, true)
assert.equal(proof.policyEnforced, true)
assert.equal(proof.testsCaptured, true)
assert.match(proof.provider, /^[a-z0-9-]+$/)
assert.ok(!Number.isNaN(Date.parse(proof.generatedAt)))

console.log('repository contract tests passed')
