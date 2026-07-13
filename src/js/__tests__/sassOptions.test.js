import { describe, it, expect } from 'vitest';
import * as sass from 'sass';
import { sassOptions } from '../sassOptions.js';

const scss = `
.foo {
  color: red;

  .bar {
    color: blue;
  }
}
`;

describe('sassOptions', () => {
  it('compiles the default style as expanded (readable) CSS', () => {
    const { css } = sass.compileString(scss, sassOptions.default);

    expect(css).toContain('\n');
  });

  it('compiles the minified style as compressed (single-line) CSS', () => {
    const { css } = sass.compileString(scss, sassOptions.minified);

    expect(css).not.toContain('\n');
    expect(css.length).toBeLessThan(
      sass.compileString(scss, sassOptions.default).css.length,
    );
  });
});
