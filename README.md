# BahitLabs React site

React + Vite website voor BahitLabs. Klaar om naar GitHub te uploaden en via GitHub Pages te deployen.

## Lokaal starten

```bash
npm install
npm run dev
```

## Productie build

```bash
npm run build
npm run preview
```

## Upload naar GitHub

1. Maak een nieuwe repository aan op GitHub.
2. Upload alle bestanden uit deze map naar de root van die repository.
3. Push naar de `main` branch.
4. Ga in GitHub naar `Settings` -> `Pages`.
5. Kies bij `Build and deployment` voor `GitHub Actions`.
6. De workflow `.github/workflows/deploy.yml` bouwt de site automatisch.

## Aanpassen

- Teksten en onderdelen: `src/App.jsx`
- Kleuren en layout: `src/styles.css`
- GitHub Pages build: `.github/workflows/deploy.yml`

Contactformulier opent een e-mail naar `nourbahit98@gmail.com`.
