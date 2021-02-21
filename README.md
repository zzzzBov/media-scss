# Media Module for Sass

The media module is a Sass module to easily create consistent media queries from a shared set of breakpoints.

<details>
  <summary>Table of Contents</summary>

- [Media Module for Sass](#media-module-for-sass)
  - [API](#api)
    - [Mixin `media($from: null, $to: null, $map: $breakpoints)`](#mixin-mediafrom-null-to-null-map-breakpoints)
      - [Parameter `$from`](#parameter-from)
      - [Parameter `$to`](#parameter-to)
      - [Parameter `$map`](#parameter-map)
      - [Example 1: `media` mixin with lower bounds](#example-1-media-mixin-with-lower-bounds)
      - [Example 2: `media` mixin with upper bounds](#example-2-media-mixin-with-upper-bounds)
      - [Example 3: `media` mixin with both upper and lower bounds](#example-3-media-mixin-with-both-upper-and-lower-bounds)
      - [Example 4: `media` mixin with positional arguments](#example-4-media-mixin-with-positional-arguments)
      - [Example 5: `media` mixin with named arguments](#example-5-media-mixin-with-named-arguments)
    - [Function `between($from: null, $to: null, $map: $breakpoints)`](#function-betweenfrom-null-to-null-map-breakpoints)
    - [Function `from($from, $map: $breakpoints)`](#function-fromfrom-map-breakpoints)
    - [Function to($to, $map: $breakpoints)`](#function-toto-map-breakpoints)
    - [Module Configuration](#module-configuration)
      - [`$breakpoints`](#breakpoints)
      - [`$missing`](#missing)

</details>

## API

### Mixin `media($from: null, $to: null, $map: $breakpoints)`

A mixin to create media queries at pre-specified breakpoints.

#### Parameter `$from`

| Meta    | Details        |
| ------- | -------------- |
| default | null           |
| type    | string or null |

The name of the breakpoint to use for the lower bound of the media query, or `null`.

If `null` is provided, the lower bound will be skipped.

#### Parameter `$to`

| Meta    | Details        |
| ------- | -------------- |
| default | null           |
| type    | string or null |

The name of the breakpoint to use for the upper bound of the media query, or null.

If `null` is provided, the upper bound will be skipped.

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

#### Parameter `$map`

| Meta    | Details      |
| ------- | ------------ |
| default | $breakpoints |
| type    | map          |

The key-value map of breakpoints to values to use for the media query.

The default media query breakpoints can be configured by updating the `$breakpoints` variable.

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

#### Example 1: `media` mixin with lower bounds

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

#### Example 2: `media` mixin with upper bounds

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

#### Example 3: `media` mixin with both upper and lower bounds

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

#### Example 4: `media` mixin with positional arguments

```scss
.example {
  @include media(sm) {
    example: 4.1;
  }
  @include media(null, lg) {
    example: 4.2;
  }
}
// turns into
@media (min-width: 30em) {
  .example {
    example: 4.1;
  }
}
@media (max-width: 63.999em) {
  .example {
    example: 4.2;
  }
}
```

#### Example 5: `media` mixin with named arguments

```scss
.example {
  @include media($from: sm) {
    example: 5.1;
  }
  @include media($to: lg) {
    example: 5.2;
  }
}
// turns into
@media (min-width: 30em) {
  .example {
    example: 4.1;
  }
}
@media (max-width: 63.999em) {
  .example {
    example: 4.2;
  }
}
```

### Function `between($from: null, $to: null, $map: $breakpoints)`

### Function `from($from, $map: $breakpoints)`

### Function to($to, $map: $breakpoints)`

### Module Configuration

#### `$breakpoints`

#### `$missing`
