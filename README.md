# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## How I created this project

1. open the cmd in a folder for the project
2. Write npm create vite@latest
3. write project name 
4. select framework it will be react
5. select language it will be js and the project foler will be created
6. Download node_modules by typing npm i in terminal
7. Run project npm run dev

## Adding BootStrap

1. npm i bootstrap@5.3.8
2. import 'bootstrap/dist/css/bootstrap.min.css'
3. import 'bootstrap/dist/js/bootstrap.bundle.min.js' `both in main.jsx`

## Adding Font awesome
1. npm i @fortawesome/fontawesome-free
2. import '@fortawesome/fontawesome-free/css/all.min.css' `in main.jsx`

## Adding Routing
1. npm i react-router-dom

## Adding Axios
1. npm i axios

## React CLI
1. npm i generate-react-cli -D `-D for development only`
2. npx generate-react-cli component Box
3.  no
    no
    yes
    css
    none
    ./src/Components
    yes
    no
    no
    no
4. rename the Box.js to Box.jsx it will be in ./src/Components/Box
5. delete those line bec they are deprecated in js
    Box.propTypes = {};
    Box.defaultProps = {};
6. to make a custom template just write this code in `generate-react-cli.json` file in  `components.defaults`

    "customTemplates": {
    "component": "src/Components/Template/TemplateName.jsx",
        "style": "src/Components/Template/TemplateName.module.css"
    },
<!--? you have to create these files  TemplateName.jsx and TemplateName.module.css in the right path src/Components/Template/       -->

7. npx generate-react-cli component <component_name>

<!--? It will creates a folder with the <component_name> just like the template  -->

<!--* To add the component in another path go to  generate-react-cli.json file and add this property in `component` -->
"page": {
      "path": "./src/Pages",
      "withStyle": true,
      "withTest": false,
      "withStory": false,
      "withLazy": false,
      "customTemplates": {
        "component": "src/Components/Template/TemplateName.jsx",
        "style": "src/Components/Template/TemplateName.module.css"
      }
    }
<!--? npx generate-react-cli component About --type=page  -->