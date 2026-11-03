# danimc.is-a.dev

Personal site and CV of Daniel Mora, senior full stack engineer in Guadalajara, Mexico.

Static site built with [Astro](https://astro.build) and Tailwind CSS. No cookies, no analytics, no client framework: the only JavaScript is a reveal animation, the section highlight and the contact form helper, and everything still works without it.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Uses Node 24 (see `.nvmrc`).

## Structure

- `src/data/cv.ts` holds all the content: experience, skills, practices, FAQ.
- `src/layouts/Base.astro` is the page shell with the fixed side rail.
- `src/components/` has one component per section.

## Fonts

Apfel Grotezk and Ronzino by [Collletttivo](https://www.collletttivo.it), both under the SIL Open Font License. The license texts ship next to the font files in `public/fonts/`.

## License

The content (text, CV and images) is © Luis Daniel Mora Carbajal.
