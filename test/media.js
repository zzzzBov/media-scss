const { expect } = require("chai");
const sass = require("sass");

describe(`media($from, $to, $map)`, () => {
  it(`should add a media query using values from the default map`, () => {
    const result = sass.renderSync({
      data: `
        @use 'index' as m;

        .test {
          @include m.media(sm, lg) {
            color: blue;
          }
        }
      `,
      includePaths: [".."],
    });

    expect(result.css.toString()).to.equal(
      `
@media (min-width: 30em) and (max-width: 63.999em) {
  .test {
    color: blue;
  }
}
`.trim()
    );
  });

  it(`should add min-width media queries when only '$from' is specified`, () => {
    const result = sass.renderSync({
      data: `
        @use 'index' as m;

        .test {
          @include m.media(xs) {
            all: unset;
          }

          @include m.media(sm) {
            background: red;
          }

          @include m.media(md) {
            color: green;
          }

          @include m.media(lg) {
            display: block;
          }

          @include m.media(xl) {
            empty-cells: hide;
          }
        }
      `,
    });

    expect(result.css.toString()).to.equal(
      `
@media (min-width: 20em) {
  .test {
    all: unset;
  }
}
@media (min-width: 30em) {
  .test {
    background: red;
  }
}
@media (min-width: 48em) {
  .test {
    color: green;
  }
}
@media (min-width: 64em) {
  .test {
    display: block;
  }
}
@media (min-width: 75em) {
  .test {
    empty-cells: hide;
  }
}
    `.trim()
    );
  });

  it(`should add max-width media queries  when only '$to' is specified`, () => {
    const result = sass.renderSync({
      data: `
        @use 'index' as m;

        .test {
          @include m.media(null, xs) {
            all: unset;
          }

          @include m.media($to: sm) {
            background: black;
          }

          @include m.media(false, md) {
            color: white;
          }

          @include m.media($to: lg) {
            display: inline;
          }

          @include m.media($to: xl) {
            empty-cells: show;
          }
        }
      `,
    });

    expect(result.css.toString()).to.equal(
      `
@media (max-width: 19.999em) {
  .test {
    all: unset;
  }
}
@media (max-width: 29.999em) {
  .test {
    background: black;
  }
}
@media (max-width: 47.999em) {
  .test {
    color: white;
  }
}
@media (max-width: 63.999em) {
  .test {
    display: inline;
  }
}
@media (max-width: 74.999em) {
  .test {
    empty-cells: show;
  }
}
`.trim()
    );
  });
});
