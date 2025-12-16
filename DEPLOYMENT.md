# Vercel Deployment Guide

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Groq API key (get from https://console.groq.com)
- Firebase project (if not using the existing config)

## Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure your project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. Add Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add `GROQ_API_KEY` with your Groq API key

5. Click "Deploy"

### 3. Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

During deployment, you'll be prompted to add environment variables.

## Environment Variables

### Required
- `GROQ_API_KEY`: Your Groq API key for AI diagnosis features

### Optional (if migrating from hardcoded Firebase config)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Post-Deployment

After deployment:
1. Your app will be available at `https://your-project.vercel.app`
2. Configure custom domain (optional) in Project Settings → Domains
3. Set up preview deployments for branches
4. Monitor deployment logs in the Vercel dashboard

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Runtime Errors
- Check Function Logs in Vercel dashboard
- Verify API keys are correct
- Check Firebase configuration

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your environment variables to .env.local

# Run development server
npm run dev
```

## Support
For issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Project issues on GitHub
