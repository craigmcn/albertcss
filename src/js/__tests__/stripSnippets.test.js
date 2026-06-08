import { describe, it, expect } from 'vitest';
import { applyStripSnippets } from '../stripSnippets';

describe('applyStripSnippets', () => {
  it('passes through HTML with no snippet markers unchanged', () => {
    const html = '<html><body><p>Hello world</p></body></html>';
    expect(applyStripSnippets(html)).toBe(html);
  });

  it('removes a single <details class="sg-snippet"> element', () => {
    const html = `<section>
  <p>Some content</p>
  <details class="sg-snippet">
    <summary>Show code</summary>
    <div class="sg-snippet__code"><pre><code>&lt;p&gt;Hello&lt;/p&gt;</code></pre></div>
  </details>
  <p>After</p>
</section>`;
    const result = applyStripSnippets(html);
    expect(result).not.toContain('sg-snippet');
    expect(result).toContain('<p>Some content</p>');
    expect(result).toContain('<p>After</p>');
  });

  it('removes multiple <details class="sg-snippet"> elements', () => {
    const html = `<section>
  <details class="sg-snippet">
    <summary>Snippet 1</summary>
    <div class="sg-snippet__code"><pre><code>code 1</code></pre></div>
  </details>
  <details class="sg-snippet">
    <summary>Snippet 2</summary>
    <div class="sg-snippet__code"><pre><code>code 2</code></pre></div>
  </details>
</section>`;
    const result = applyStripSnippets(html);
    expect(result).not.toContain('sg-snippet');
    expect(result).toContain('<section>');
    expect(result).toContain('</section>');
  });

  it('removes the /* ---- Code snippets ---- */ CSS block', () => {
    const html = `<style>
      .other-rule {
        color: red;
      }

      /* ---- Code snippets ---- */
      .sg-snippet {
        border: 1px solid var(--grey200);
      }

      /* ---- Next section ---- */
      .something-else {
        display: block;
      }
    </style>`;
    const result = applyStripSnippets(html);
    expect(result).not.toContain('/* ---- Code snippets ---- */');
    expect(result).not.toContain('.sg-snippet {');
    expect(result).toContain('.other-rule {');
    expect(result).toContain('/* ---- Next section ---- */');
  });

  it('removes the // Copy buttons JS block', () => {
    const html = `<script>
      // Dark mode toggle
      document.querySelectorAll('[data-mode]').forEach((btn) => {
        btn.addEventListener('click', () => {});
      });

      // Copy buttons
      document.querySelectorAll('.sg-snippet__copy').forEach((btn) => {
        btn.addEventListener('click', () => {
          const code = btn.closest('.sg-snippet__code').querySelector('code');
          navigator.clipboard.writeText(code.textContent).then(() => {
            btn.textContent = 'Copied!';
          });
        });
      });

      // Active nav highlight on scroll
    </script>`;
    const result = applyStripSnippets(html);
    expect(result).not.toContain('// Copy buttons');
    expect(result).not.toContain('.sg-snippet__copy');
    expect(result).toContain('// Dark mode toggle');
    expect(result).toContain('// Active nav highlight on scroll');
  });

  it('strips all three markers in a combined document', () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <style>
      .base-rule { color: red; }

      /* ---- Code snippets ---- */
      .sg-snippet { border: 1px solid; }

      /* ---- Other section ---- */
      .other { display: block; }
  </style>
</head>
<body>
  <details class="sg-snippet">
    <summary>Code</summary>
    <pre><code>example</code></pre>
  </details>
  <script>
      // App logic
      console.log('hello');

      // Copy buttons
      document.querySelectorAll('.sg-snippet__copy').forEach((btn) => {
        btn.addEventListener('click', () => {});
      });

      // More logic
  </script>
</body>
</html>`;
    const result = applyStripSnippets(html);
    expect(result).not.toContain('sg-snippet');
    expect(result).not.toContain('/* ---- Code snippets ---- */');
    expect(result).not.toContain('// Copy buttons');
    expect(result).toContain('.base-rule');
    expect(result).toContain('/* ---- Other section ---- */');
    expect(result).toContain('// App logic');
    expect(result).toContain('// More logic');
  });
});
