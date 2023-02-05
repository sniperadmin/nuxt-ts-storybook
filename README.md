## Clean Nuxt-Storybook
An Almost, Enterprise Level, Clean architecture modular Project template via Nuxt 2 + Storybook
that supports firebase, REST, and much more.

## Disclaimer
This repo is created by "Nasr Galal" (@sniperadmin). It took almost months to reach the curent configurations to force all the components of the project to go in a smooth rythm.

All you have to do is to read this Readme file carefully and follow the step by step guide that is offered for free!

---

<br />
<!-- Coverage -->

![](https://camo.githubusercontent.com/f76910641dad3c179998b554eaea6ce82db870dc4fd00419647b7ff4c3ee53fa/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f6c6162656c3d636f766572616765266d6573736167653d3130302526636f6c6f723d677265656e)

## Storybook Documentation
Check our latest desin system on here =>
[Our component design demo](https://61f7e5bbded9ab003cc4f041-uvtqjdwsht.chromatic.com/?path=/story/components-molecules-emodal--default-modal)

---

# Before you start

## Stack used for the software
<table>
  <tr>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/1682/IMG_4636.PNG"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/3337/Q4L7Jncy.jpg"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/830/jest.png"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/1147/markdown.png"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/6163/PzNbCwXH.jpg"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/3837/paeckCWC.png"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/1612/bynNY5dJ.jpg"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/7304/23360933.png"
      >
    </td>
    <td>
      <img
        width="50"
        src="https://img.stackshare.io/service/116/cZLxNFZS.jpg"
      >
    </td>
  </tr>
</table>


* Webpack version `4.46.0`
* ESLint version `8.8.0`
* Node version `v16.13.2`
* NPM package manager `8.3.0`
* Jest version `27.4.4`
* Markdown
* Vuetify version `^2.6.1`
* Vue `2.6.14`
* TypeScript support
* Nuxt version `2.15.8`
* Firebase

---

Setting up your environment
---------------------------

*   Make sure to install **ESLint** JavaScript into VS Code.

VS Marketplace Link: [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

(Or if you use a different IDE, look for the **ESLint** plugin)

*   Clone the repo
*   Run `npm install`
*   For a faster and smoother development, run `npm run storybook` and in a separate terminal run `npm run test:dev` and enjoy building components through storybook.
*   For a live nuxt server, run `npm run dev`

---
## Clean Architecture

Clean Architecture is a design pattern that aims to separate application logic from user interface or external services.
It does that by defining layers in a circle, in which each layer interacts with other layers towards the center of the circle.

In Vue terms, the layer would be (from outer to inner) components + use cases + Entities

<img src="https://miro.medium.com/max/1400/0*nYCDplSXrSoJ2_5w.png" >

as shown in the figure above :point_up:, here is a summary of all the layers of the circle:

1. **Domain layer** (yellow): Contains Entities (*which define the basic data*)
2. **Application layer** (red): Contains all logic and operations applied to entities
3. **UI/Store layer** contains user interface, controllers and presenters

The structure for this project is devided into two main parts `/app` and `/ui`

## Component design pattern

--> (Found in `/ui/components`)

The components main structure is mapped like the following:

```
components
|
|
atoms
│   │   NuxtLogo.spec.js
│   │   NuxtLogo.vue
│   │   VuetifyLogo.vue
│   │
│   ├───EBtn
│   │       EBtn.md
│   │       EBtn.spec.ts
│   │       EBtn.story.ts
│   │       Index.vue
│   │
│   └───ELogo
│           ELogo.md
│           ELogo.spec.ts
│           ELogo.story.ts
│           Index.vue
│
|
|
----molecules
|
|
└───organisms
    └───ESidebar
        │   ESidebar.md
        │   ESidebar.spec.ts
        │   ESidebar.story.ts
        --- Index.vue
```

As shown above, we have **Atoms, Molecules and organisms** structures accordingly. **Molecules** contain **atoms**, and **organisms** contain **molecules**. This ensures the separation of concerns, wraps each component with its definitions and documentation and follows the component design standards.


Each folder is following the [base component naming conventions](https://v3.vuejs.org/style-guide/#base-component-names-strongly-recommended) via prefix `E+ComponentName` to represent a base single component and contains:

1.  The main Vue component `Index.vue`
2.  Spec unit test file for the component `ComponentName.spec.ts`
3.  MD file for documentation `ComponentName.md`
4.  Story file for storybook Documentation `ComponentName.story.ts`

***

Components options order standard
---------------------------------

As per [Vue documentation](https://v3.vuejs.org/style-guide/#priority-c-rules-recommended-minimizing-arbitrary-choices-and-cognitive-overhead), we should follow the Priority C rules to minimize choices and cognitive overhead.

the following pattern is a good example:

```ts
export default Vue.extend({
  // global awareness
  name: 'EComponentName',
/*****************************************/
  // template dependencies
  components: {
    'e-logo': ELogo
  },
  directives: {},
/*****************************************/
  // composition
  extends: {},
  mixins: {},
  provide: {},
  inject: {},
/*****************************************/
  // interface
  inheritAttrs: false,
  props: {
    miniVariant: {
      type: Boolean,
      default: false
    },
    clipped: {
      type: Boolean,
      default: false
    }
  },
/*****************************************/
  // Vue3 new attrs
  emits: {},
  expose: {},
  // composition API
  setup(context, props) {}
/*****************************************/
  // local state
  data () {
    return {
      drawer: true,
      items: [],
      bottomItems: []
    }
  },
  computed: {},
/*****************************************/
  // event callbacks by reactive events
  watch: {},
/*****************************************/
  // lifecycle events / hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  errorCaptured() {},
  renderTracked() {},
  renderTriggered() {},
})
```

Pull request flow
-----------------

*   Make sure to pass all all PR checks
*   It is a best practice to run `npm run lint` before staging your changes, and if any lint errors you can run `npm run lintfix`
*   A code review should be done by the participants (**Reviewer + author**)
*   Each pull request has checks and tests
*   Component visual tests can be reviewed in chromium CI
***

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.ts`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
