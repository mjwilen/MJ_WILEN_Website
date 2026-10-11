# M. J. Wilen: author site

A static website (plain HTML, CSS, and a little JavaScript). There is nothing to install or build.

## Publish it on GitHub Pages

1. On GitHub, create a new **public** repository. Naming it `mjwilen.github.io` puts the site at `https://mjwilen.github.io`. Any other name puts it at `https://mjwilen.github.io/<repo-name>/`.
2. Upload everything in this folder to the repository (keep the folder structure: `index.html` at the top, plus the `assets` folder).
3. In the repository, go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then **Save**.
4. Wait a minute or two and refresh the Pages settings. GitHub shows the live address.

## Connect the contact form

The form on the Contact section sends messages through Formspree, a form service with a free plan (it has a small monthly limit on messages). Until you connect it, the form tells visitors it is not connected and points them to your email address.

1. Create a free account at https://formspree.io and choose **New form**. Enter the email address where you want the messages delivered.
2. Formspree gives the form an address that looks like `https://formspree.io/f/abcdwxyz`. Copy it.
3. In `index.html`, find `https://formspree.io/f/YOUR_FORM_ID` (it appears once, in the form's `action`) and replace it with your address. Save and upload the file to GitHub.
4. Send yourself a test message from the live site. The first message asks you to confirm your email address.

In your Formspree dashboard you can also turn on extra spam protection for the form.

## Use your own domain (optional)

Once you have a domain, go to **Settings > Pages > Custom domain**, enter it and tick **Enforce HTTPS** once it is available. At your domain registrar, GitHub's current instructions for the DNS records are at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site.

## Editing the text

Open `index.html` in any text editor. Each picture book is one `<article class="book">` block: change the title, the paragraph, the tags, or the word count in place. Pictures live in `assets/img`. Colors and fonts are at the top of `assets/css/style.css`.

## What is public

Everything in this repository is public, including its history. Do not add manuscripts, query letters, or private notes. Text that has been committed and later deleted can still be found in the history.
