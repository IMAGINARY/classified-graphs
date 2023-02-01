# Classified graphs

An educational app to explore graphs and their invariants.

## Installation

Install dependencies

```
npm install
```

Build the project (in the `dist` folder)

```
npm run build
```

Run a local server (for development)

```
npm run serve
```

## Graph gallery creation

There is a collection of pre-defined graphs, stored as json files. Some of those files are generated algorithmically with a generator script. This script must be run once to generate the graph files.

Rebuilding the graphs

```
npm run build:graphs
```

## Translations

The app currently supports English, German, and French.

To add a new translation, several steps must be followed:

- Copy and translate the UI keywords from the file `src/locales/en/en.ts`.
- Copy and translate the texts on the `html` files in `src/locales/en`.
- Create a new folder in `src/locales/` with your files.
- To translate the graph names, edit the scripts `src/ts/graph-gallery-scripts/make-*-graphs.ts`.
- Adapt accordingly the `src/ts/constants.ts` file.

## Credits

- Original idea: Pieter Belmans ([University of Luxembourg](https://wwwen.uni.lu/)).
- Implementation and design: Daniel Ramos, Christian Stussak ([IMAGINARY](https://about.imaginary.org)).
