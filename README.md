[![vue.js][vue.js]][vue.js-url]
[![node][node]][node-url]

# Utilant Fast Form Designer

The Fast Form Designer is a lightweight form prototyper designed to scaffold
Dynamic Forms for Loss Control 360 (LC360). The design omits details such as
visibilities, validations, and calculations in get the basics of a form
ready for an interactive session with customers. The JSON exports it
generates can be imported into LC360.

## Getting Started

### Prerequesites

- [Git](https://git-scm.com/) (on macOS `brew install git`)
- [Node.js 14.3.0 and npm 6.14.5](nodejs.org) (on macOS `brew install node`)
- [Chrome >= 80] (`brew install Caskroom/versions/google-chrome`) - used for headless testing

### Project setup

1. Make sure prerequisites are installed for your operating system.

2. Run `git clone https://github.com/nstuyvesant/fast-form.git` then connect to the /shy directory.

3. Run `npm install` to install server dependencies.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


[vue.js]: https://img.shields.io/badge/vue.js-2.6.11-green.svg
[vue.js-url]: https://vuejs.org/
[node]: https://img.shields.io/badge/nodejs-14.3.0-red.svg
[node-url]: https://nodejs.org