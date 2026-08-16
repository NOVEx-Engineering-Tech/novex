Project Tree (NOVEx Portfolio — Pavillion Architecture, Vite variant):

root/
    - frontend/
        - public/
            - assets/
                - novex-bg.webm
                - astronaut.png
            - favicon.svg
        - configs/                       # project-specific content (NOT a module)
            - contact.json
            - founders/*.json
            - teams/*.json
            - work/*.json
        - src/
            - app/
                - App.jsx                 # route table, top-level layout
                - main.jsx                # React DOM entry point
                - globals.css
                - pages/
                    - Home.jsx, Projects.jsx, Teams.jsx, Team.jsx, ...
                    - *.module.css

            - utils/
                - constants.js            # internal: app-specific data (not a module)
                - <module_name>/          # e.g. StdHooks, StdSearchBus, StdGithub, StdSocialPlatforms
                    - types.js
                    - index.js
                    - README.md

            - lib/
                - contactLoader.js        # internal: project-specific config loaders (not modules)
                - teamLoader.js
                - workLoader.js

            - components/
                - Navbar.jsx              # internal: app-specific (not a module)
                - Footer.jsx              # internal: app-specific (not a module)
                - ContactModal.jsx        # internal: app-specific (not a module)
                - <module_name>/          # e.g. StdSpaceLayer, StdPersonCard, StdProjectSearch, ...
                    - style.module.css
                    - types.js
                    - index.jsx
                    - README.md

            - module/
                - <module_name>/
                    - pavillion.module.json

            - assets/
                - hero-blob.svg

        - eslint.config.js
        - vite.config.js
        - jsconfig.json
        - package.json
        - package-lock.json
        - index.html
        - .gitignore

    - docs/
        - dev/
            - references/
                - project_tree.md
                - modulelization.md

    - .gitignore
    - README.md

Note: this project has no backend — it is a fully static portfolio site (Vite + React,
client-side routed with react-router-dom). Build tooling stays on Vite rather than the
template's Next.js frontend, since this project has no server-rendering requirement; the
Pavillion `app / lib / utils / components / module` folder architecture and module
conventions from modulelization.md are followed as-is on top of Vite.
