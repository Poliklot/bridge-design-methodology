# AI Design Transfer Methodology

Open methodology for designing Figma layouts that AI agents and deterministic tools can transfer into website builders with high fidelity.

The first target builder is Tilda Zero Block, but the core rules are intentionally builder-agnostic: deterministic hierarchy, explicit responsive variants, stable layer identity, and zero ambiguous layout intent.

## Core idea

A design that should be transferred by AI must be authored as a system, not as a visual sketch.

Every layer must be one of two things:

1. **Flex flow item** — part of an explicit Auto Layout chain.
2. **Absolute item** — intentionally positioned outside the flow, usually background, decor, or overlay.

No third state. No accidental free-floating layers.

## Start here

- [Design rules](docs/01-design-rules.md)
- [Layer naming and identity](docs/02-layer-naming-and-identity.md)
- [Responsive breakpoints](docs/03-responsive-breakpoints.md)
- [Builder transfer contract](docs/04-builder-transfer-contract.md)

## Minimal example

```text
Section [bp=1200]
  background [key=section-bg]                 // absolute
  [asset] [decor] glow [key=decor-glow]       // absolute

  content flex [key=content]                  // flex
    hero flex [key=hero]                      // flex
      hero-copy flex [key=hero-copy]          // flex
        title [key=title]
        subtitle [key=subtitle]

      button-row flex [key=button-row]        // flex
        [button] primary [key=primary-cta]
        [button] secondary [key=secondary-cta]

    cards-row flex [key=cards-row]            // flex
      card [key=card-1]
      card [key=card-2]
```

## License

MIT.
