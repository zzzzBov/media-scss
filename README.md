# Media Mixin for Scss

## API

### `$media-breakpoints: (...)`

```scss
$media-breakpoints: (
  xs: 20rem,  //  320px
  sm: 30rem,  //  480px
  md: 48rem,  //  768px
  lg: 64rem,  // 1024px
  xl: 75rem   // 1200px
) !default;
```

The `$media-breakpoints` variable contains map of breakpoint labels mapped to their values. The map can be overridden to provide site-specific breakpoints for the `media` mixin.

### `media(...)`

```scss
@mixin media($from, $to: null, $map: $media-breakpoints)
```

The `media` mixin is a utility to create consistent media queries from a shared set of breakpoints.

#### `media($from, $to)`

The first two parameters specify the range of the media query.

Media queries will be constructed as `@media (min-width: $from) and (max-width: $to)`\*

```scss
@include media(sm, lg) {
  .example {
    color: red;
  }
}
```

produces

```scss
@media (min-width: 30rem) and (max-width: 63.999rem) {
  .example {
    color: red;
  }
}
```

#### `media($from)`

If the second parameter is omitted, the media query will apply using the given breakpoint as a minimum width:

```scss
@include media(md) {
  .example {
    color: green;
  }
}
```

produces

```scss
@media (min-width: 48rem) {
  .example {
    color: green;
  }
}
```

This allows for the creation of declarative, mobile-first media queries:

```scss
.example {
  padding: 0 1rem;

  @include media(sm, md) {
    margin: 0 auto;
    padding: 0;
    width: 30rem;
  }
  
  @include media(md) {
    margin: 0 auto;
    padding: 0;
    width: 38rem;
  }
}
```

#### `media(null, $to)`

If `null` is passed as the first parameter, the media queries apply using the given breakpoint as the maximum width:

```scss
@include media(null, md) {
  .example {
    color: blue;
  }
}
```

produces

```scss
@media (max-width: 63.999rem) {
  .example {
    color: blue;
  }
}
```

#### `media($from, $to, $map)`

If a map is passed as the third parameter, it is used to look up the media queries rather than the global defaults:

```scss
$breakpoints: (
  small: 20rem,
  medium: 40rem,
  large: 60rem
);

@include media(small, large, $breakpoints) {
  .example {
    color: rebeccapurple;
  }
}
```

produces

```scss
@media (min-width: 20rem) and (max-width: 59.999rem) {
  .example {
    color: rebeccapurple;
  }
}
```

---

<sub>\* `$to` is adjusted such that `@include media(example)` and `@include media(null, example)` do not both apply when the browser is exactly as wide as the `example` breakpoint.</sub>