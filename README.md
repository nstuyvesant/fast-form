[![vue.js][vue.js]][vue.js-url]

# Fast Form Designer

The Fast Form Designer is a lightweight form prototyper designed to scaffold
Dynamic Forms for Loss Control 360 (LC360). The design omits details such as
visibilities, validations, and calculations in get the basics of a form
ready for an interactive session with customers. The JSON ([sample-form.json](/public/sample-form.json)) it current downloads will be able to POSTed to LC360 in the future.

This client-side Single Page Application (SPA) is written in [TypeScript](https://www.typescriptlang.org) using the [Vue.js](https://vuejs.org/) framework and [Bootstrap](https://getbootstrap.com) for mobile responsiveness. While [Node.js](https://nodejs.org/en/) is
needed for development, `npm run build` generates a slug of HTML, JavaScript and CSS that can
be run with or without a web server (provided your browser allows local JavaScript to execute).

Architecturally, the SPA has this relationship between components:
- [App](/src/App.vue)
  - [Navbar](/src/components/Navbar.vue)
  - [Designer](/src/components/Designer.vue)
    - [SectionEditor](/src/components/SectionEditor.vue) (recursive because of need for subsections)
      - [QuestionEditor](/src/components/QuestionEditor.vue)

Initial loading of Vue, [Font Awesome](https://fontawesome.com) and recursive components is in [main.ts](/src/main.ts). Application state is managed via Observable in [store.ts](/src/store.ts). [TypeScript](https://www.typescriptlang.org) types are declared in [types.ts](/src/types.ts).

## Getting Started

### Development Prerequisites

- [Git](https://git-scm.com/)
- [Homebrew](https://brew.sh) - macOS users
- [Chocolatey](https://chocolatey.org) - Windows users
- [Node.js 14.5.0+](nodejs.org)
- [yarn 1.22.4+](https://classic.yarnpkg.com/en/)
- [Google Chrome 83+](https://www.google.com/chrome) - used for headless testing

### Project setup

1. Install [Homebrew](https://brew.sh) or [Chocolatey](https://chocolatey.org) depending on whether you are a macOS or Windows user. The latter requires a PowerShell run as Administrator (and to close and reopen after install).

2. Make sure prerequisites are installed for your operating system.
  - macOS install: `brew install git node yarn`
  - Windows install: `choco install git nodejs yarn`

2. Run `git clone https://github.com/nstuyvesant/fast-form.git` then connect to the /fast-form directory.

3. Run `yarn install` to install dependencies.

### Compiles and hot-reloads development webserver
```
yarn serve
```

### Run end-to-end tests using Cypress
```
yarn test:e2e
```

### Run unit tests using Jest (unit tests are broken right now)
```
yarn test:unit
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

[vue.js]: https://img.shields.io/badge/vue.js-2.6.11-green.svg
[vue.js-url]: https://vuejs.org/
