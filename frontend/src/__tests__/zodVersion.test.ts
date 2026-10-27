import { describe, expect, it } from 'vitest';
import pkgRaw from '../../package.json?raw';
import lockRaw from '../../package-lock.json?raw';

// GHSA-mrhx-c7xc-m3w5: zod < 4.6.6 is vulnerable to uncontrolled memory
// consumption when validating oversized constrained arrays. This test guards
// that the repository pins the fixed version in both the manifest and the
// lockfile so installations actually receive the patched code.
describe('zod CVE fix (GHSA-mrhx-c7xc-m3w5)', () => {
  const pkg = JSON.parse(pkgRaw);
  const lock = JSON.parse(lockRaw);

  it('declares the fixed zod version in package.json', () => {
    const spec = pkg.dependencies?.zod;
    expect(spec).toBeDefined();
    // zod 3.x and all 4.x before 4.6.6 are vulnerable; the range must
    // resolve to the patched 4.6.6 release.
    expect(spec).toMatch(/\^4\.6\.6/);
  });

  it('locks zod to the fixed version in the lockfile', () => {
    const zodEntry = lock.packages?.['node_modules/zod'];
    expect(zodEntry).toBeDefined();
    expect(zodEntry.version).toBe('4.6.6');
    expect(zodEntry.resolved).toContain('/zod-4.6.6.tgz');
  });
});
