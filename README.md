# USADBA INK
 
 Astro site.
 
 ## Requirements
 
 - **Node.js**: `>= 18.20.8` (see `.nvmrc`)
 - **npm**: comes with Node
 
 If you see an error like:
 
 ```
 Node.js v18.19.0 is not supported by Astro! Please upgrade Node.js to ">=18.20.8"
 ```
 
 you are on an unsupported Node version.
 
 ## Setup (macOS)
 
 - **Use nvm (recommended)**
   - Install nvm (per the nvm project instructions)
   - From the repo root:
 
 ```sh
 nvm install
 nvm use
 npm ci
 ```
 
 ## Setup (FreeBSD)
 
 You can use either FreeBSD packages or a Node version manager.
 
 - **Option A: packages (simplest)**
 
 ```sh
 sudo pkg install -y node npm
 node -v
 ```
 
 Ensure the installed Node version is **>= 18.20.8**.
 
 - **Option B: nvm (recommended if you need exact versions)**
 
 Install `nvm` and then, from the repo root:
 
 ```sh
 nvm install
 nvm use
 npm ci
 ```
 
 ## Development mode
 
 Runs the Astro dev server with hot reload.
 
 ```sh
 npm run dev
 ```
 
 - Default URL: `http://localhost:4321`
 - To listen on all interfaces (useful on FreeBSD servers / LAN testing):
 
 ```sh
 npm run dev -- --host 0.0.0.0 --port 4321
 ```
 
 ## Production
 
 ### Build
 
 ```sh
 npm ci
 npm run build
 ```
 
 Output is written to `dist/`.
 
 ### Option A (recommended): serve `dist/` as static files
 
 Use any static file server / reverse proxy you want (nginx, Caddy, Apache).
 
 - Point the web root to the `dist/` directory
 - Serve `index.html` for routes as needed (typical SPA/static setup)
 
 ### Option B: run Astro preview server
 
 This runs a Node process that serves the built site:
 
 ```sh
 npm run preview
 ```
 
 To bind publicly:
 
 ```sh
 npm run preview -- --host 0.0.0.0 --port 4321
 ```
 
 On FreeBSD, for a long-running service, run the preview server under a supervisor you use (e.g. `daemon(8)`, `runit`, etc.) and put nginx/Caddy in front for TLS.
