# Git and Vercel Deployment Instructions

## ✅ Git Setup Complete!

Your local repository is now initialized and connected to GitHub.

## Next Steps:

### 1. Push to GitHub

Run this command to push your code to GitHub:

```bash
git push -u origin main
```

**Note:** You may be prompted to authenticate with GitHub. Use your GitHub credentials or personal access token.

If you get a conflict because the remote repository already has content, you have two options:

**Option A - Force push (overwrites remote):**
```bash
git push -u origin main --force
```

**Option B - Pull and merge first:**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and repository: `Nirmit2103/ICE-Beacon`
4. Configure project:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `GROQ_API_KEY` = your_groq_api_key
6. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app` in 2-3 minutes!

#### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Set Up Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add the following:
   - `GROQ_API_KEY` (required for AI diagnosis)

### 4. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build fails on Vercel?
- Check the build logs in Vercel dashboard
- Verify environment variables are set
- Ensure `npm run build` works locally

### Git push fails?
```bash
# If repository already exists with different history
git pull origin main --allow-unrelated-histories --rebase
git push -u origin main
```

### Need to make changes?
```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy on every push to main!

## Project Status

✅ Build successful  
✅ TypeScript compilation passes  
✅ All imports resolved  
✅ Environment variables configured  
✅ Git repository initialized  
✅ Connected to GitHub remote  
🚀 Ready for Vercel deployment!

## Quick Reference

```bash
# View git status
git status

# View remote URL
git remote -v

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-feature

# Push new branch
git push -u origin feature/new-feature
```

## Support Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Help](https://docs.github.com/)
