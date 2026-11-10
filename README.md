# Portfolio

A responsive portfolio website built with React, TypeScript, and Vite, designed with a solarized-inspired visual theme and a subtle animated matrix-style background.

## Features

- Responsive single-page portfolio layout
- Dark/light theme toggle
- Scroll-driven section navigation
- Animated background and refined motion effects
- Clean project and professional experience sections
- GitHub Pages deployment ready

## Local development

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite in your browser.

## Production build

```bash
npm run build
```

## Deployment

This project is configured for GitHub Pages deployment through GitHub Actions.

1. Push this repository to GitHub.
2. In GitHub, open the repository settings.
3. Go to Pages and select Source: GitHub Actions.
4. The workflow in `.github/workflows/deploy.yml` will build and publish the site automatically on pushes to the default branch.

The deployed site will be available at:

https://hoomanracer.github.io/portfolio/

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
