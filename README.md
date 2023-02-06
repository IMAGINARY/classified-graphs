# Classified graphs

An educational app to explore graphs and their invariants.

## Installation

Install dependencies:

```
npm install
```

Build the project (in the `dist` folder):

```
npm run build
```

or

```
npm run clean
npm run build:graphs
npm run build:frontend
```

Run a local server (for development):

```
npm run serve
```

## Graph gallery creation

The app uses a collection of pre-defined graphs. Those are defined mathematically in some scripts at `src/ts/graph-gallery-scripts/`. Those scripts generate the necessary assets for the app (a json list of all the graphs, `.data` files with the graphs info, and `.png` images with a thumbnail of the graph). Those scripts must be run whenever the gallery changes.

Rebuilding the graphs:

```
npm run clean
npm run build:graphs
```

## Frontend creation

Because of the nature of the automated layouting of the graphs (a physics-like simulation to position the nodes of the graph), the generated images can be slightly different each time that they are generated. To avoid building and commiting the graph collection every time, you can build just the frontend (all the app except of the gallery generation) independently.

Rebuilding the frontend:

```
npm run build:frontend
```

## Translations

The app currently supports English, German, and French.

To add a new translation, several steps must be followed:

- Copy and translate the UI keywords from the file `src/locales/en/en.ts`.
- Copy and translate the texts on the `html` files in `src/locales/en`.
- Create a new folder in `src/locales/` with your files.
- To translate the graph names, edit the scripts `src/ts/graph-gallery-scripts/make-*-graphs.ts`.
- Adapt accordingly the `src/ts/constants.ts` file.

## Target graphs (challenges)

The "Target" button opens a modal box to choose the target graph to be identified. There is always a "Random" option and then some pre-defined "Challenges" numbered sequentially. This is controlled by the list `targetChoices` in `src/ts/targetChoices.ts`.

You can edit that list with the names of the desired graphs (the field `file` in the graph descriptions that you can find in `../graph-gallery/graphs-list.json`).

## Credits

- Original idea: Pieter Belmans ([University of Luxembourg](https://wwwen.uni.lu/)).
- Implementation and design: Daniel Ramos, Christian Stussak ([IMAGINARY](https://about.imaginary.org)).

## License

MIT.
