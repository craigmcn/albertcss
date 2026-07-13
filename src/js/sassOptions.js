// Dart Sass's modern compileString/compileStringAsync API (used by gulp-sass
// 6+) takes a `style` option, not the legacy renderSync API's `outputStyle`.
// Unknown option keys are silently ignored, so passing the wrong name here
// produces valid but unminified "minified" output instead of an error.
export const sassOptions = {
  default: {
    style: 'expanded',
  },
  minified: {
    style: 'compressed',
  },
};
