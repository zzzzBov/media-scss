# Media Module for Sass

The media module is a Sass module to easily create consistent media queries from a shared set of breakpoints.

## API

### Mixins

#### `media($from: null, $to: null, $map: $breakpoints)`

The `media()` mixin is used to create media queries at pre-specified breakpoints.

It can be used for media queries with lower bounds...

```scss
.example {
  @include media(xs) {
    example: 1;
  }
}
// turns into
@media (min-width: 20em) {
  .example {
    example: 1;
  }
}
```

...upper bounds...

```scss
.example
  @include media($to: xl) {
    example: 2;
  }
}
// turns into
@media (max-width: 74.999em) {
  .example {
    example: 2;
  }
}
```

...or both:

```scss
.example {
  @include media(sm, lg) {
    example: 3;
  }
}
// turns into
@media (min-width: 30em) and (max-width: 63.999em) {
  .example {
    example: 3;
  }
}
```

Media queries can be specified using positional or named arguments.

```scss
// These produce the same min-width media query:
.example {
  @include media(sm) {
    example: 4;
  }
  @include media($from: sm) {
    example: 4;
  }
}
// turns into
@media (min-width: 30em) {
  .example {
    example: 4;
  }
}
```

```scss
// These produce the same max-width media query:
.example {
  @include media(null, lg) {
    example: 5;
  }
  @include media($to: lg) {
    example: 5;
  }
}
// turns into
@media (max-width: 63.999em) {
  .example {
    example: 5;
  }
}
```

The default media query breakpoints can be configured by updating the `$breakpoints` variable.

Alternatively, a different media query map may be provided using the `$map` parameter.

```scss
$custom-breakpoints: (
  example: 1000px,
);

.example {
  @include media(example, $map: $custom-breakpoints) {
    example: 6;
  }
}
// turns into
@media (min-width: 1000px) {
  .example {
    example: 6;
  }
}
```

Upper bounds are reduced by `1` if they use `px` units. Otherwise they are reduced by `0.001`. This prevents min- and max-width media queries from ever overlapping:

```scss
.example {
  @include media($to: md) {
    example: 7.1;
  }
  @include media(md) {
    example: 7.2;
  }
}
// turns into
@media (max-width: 47.999em) {
  .example {
    example: 7.1;
  }
}
@media (max-width: 48em) {
  .example {
    example: 7.2;
  }
}
```

### Functions

#### `between($from: null, $to: null, $breakpoints)`

#### `from($from, $map: $breakpoints)`

#### `to($to, $map: $breakpoints)`

### Configuration

#### `$breakpoints`

#### `$missing`
