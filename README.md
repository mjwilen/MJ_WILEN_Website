# M. J. Wilen: author site

A static website (plain HTML, CSS, and a little JavaScript). There is nothing to install or build.

## Publish it on GitHub Pages

1. On GitHub, create a new **public** repository. Naming it `mjwilen.github.io` puts the site at `https://mjwilen.github.io`. Any other name puts it at `https://mjwilen.github.io/<repo-name>/`.
2. Upload everything in this folder to the repository (keep the folder structure: `index.html` at the top, plus the `assets` folder).
3. In the repository, go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then **Save**.
4. Wait a minute or two and refresh the Pages settings. GitHub shows the live address.

## Use your own domain (optional)

Once you have a domain, go to **Settings > Pages > Custom domain**, enter it and tick **Enforce HTTPS** once it is available. At your domain registrar, GitHub's current instructions for the DNS records are at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site.

## Editing the text

Open `index.html` in any text editor. Each picture book is one `<article class="book">` block: change the title, the paragraph, the tags, or the word count in place. Pictures live in `assets/img`. Colors and fonts are at the top of `assets/css/site.css`.

## What is public

Everything in this repository is public, including its history. Do not add manuscripts, query letters, or private notes. Text that has been committed and later deleted can still be found in the history.
