# Essence Noble Website

Static product landing page for the Essence Noble Femme Marocaine pack.

## Free GitHub Pages Domain

GitHub Pages gives you a free public URL in this format:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

## Publish Steps

1. Create a new public repository on GitHub, for example `essence-noble`.
2. Upload all files from this folder to the repository.
3. Go to the repository settings.
4. Open `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select branch `main` or `master`, folder `/root`, then save.
7. Wait a few minutes. Your free URL will be:

```text
https://YOUR-USERNAME.github.io/essence-noble/
```

## Before Launch

Update these values:

- `marketing-config.js`: WhatsApp number, GA4 ID, Meta Pixel ID, TikTok Pixel ID.
- `merchant-feed-template.csv`: replace `https://YOUR-DOMAIN.com/` with the final GitHub Pages URL.
- `index.html`: if needed, replace social sharing image URLs with absolute GitHub Pages URLs.

## Git Commands

If GitHub gives you a repository URL, run:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/essence-noble.git
git add .
git commit -m "Launch Essence Noble website"
git push -u origin main
```

Then enable GitHub Pages from `Settings > Pages`.
