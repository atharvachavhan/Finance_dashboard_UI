# Deployment Guide

This Finance Dashboard can be deployed to any static hosting service. Below are instructions for popular platforms.

## Option 1: Vercel (Recommended)

### Prerequisites
- A Vercel account ([https://vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will detect the Vite configuration automatically

3. **Manual Deployment (CLI)**
   ```bash
   npm install -g vercel
   vercel
   ```

## Option 2: Netlify

### Prerequisites
- A Netlify account ([https://netlify.com](https://netlify.com))
- Git repository

### Steps

1. **Push to Git** (same as Vercel above)

2. **Deploy via Netlify Dashboard**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site"
   - Import your Git repository
   - Netlify will detect the Vite build command

3. **Manual Deployment (Drag & Drop)**
   ```bash
   # Build locally first
   npm run build

   # Then drag the 'dist' folder to Netlify dashboard
   ```

4. **CLI Deployment**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

## Option 3: GitHub Pages

### Prerequisites
- GitHub account
- GitHub repository

### Steps

1. **Push to GitHub**

2. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source
   - Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy

   on:
     push:
       branches: [main]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'

     deploy:
       runs-on: ubuntu-latest
       needs: build
       permissions:
         pages: write
         id-token: write
       steps:
         - uses: actions/deploy-pages@v4
   ```

## Option 4: Static Hosting (Custom)

### For Apache Servers
1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of `dist/` folder to your server

3. Configure `.htaccess` for routing:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### For Nginx Servers
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Variables

The app currently uses `localStorage` for data persistence. For production deployment, you might want to:

1. Remove mock data initialization
2. Add API endpoints for real data
3. Add authentication
4. Configure CORS policies

## Preview Before Deploying

Test the production build locally:
```bash
npm run preview
```

This will serve the production build at `http://localhost:4173` for testing.

## Deployment Checklist

- [ ] Test build locally (`npm run build`)
- [ ] Test preview locally (`npm run preview`)
- [ ] Verify responsive design on multiple screen sizes
- [ ] Test all features (add, edit, delete, filter, export)
- [ ] Test dark mode toggle
- [ ] Verify data persistence works
- [ ] Check console for errors
- [ ] Verify performance is acceptable
- [ ] Update README with live URL after deployment

## Common Issues

### Build Errors
- Ensure Node.js version 18+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build` only compiles TS

### White Screen After Deploy
- Check browser console for JavaScript errors
- Verify all assets are loading correctly
- Check for CORS issues if using external APIs

### 404 Errors on Sub-routes
- Ensure hosting is configured for SPA routing
- Check `.htaccess` or server configuration

---

**After deployment, update the README with your live URL!**
