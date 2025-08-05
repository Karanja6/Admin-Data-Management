# Deployment Guide

## Issues Fixed

1. **Favicon 404 Error**: Added favicon.ico and proper HTML meta tags
2. **React DevTools Warning**: This is just a development suggestion, not an error
3. **Deployment Configuration**: Added proper build settings and deployment configs

## Local Development

```bash
npm run dev
```

## Deployment to Vercel

1. **Connect your repository to Vercel**
2. **Environment Variables** (if using Supabase):
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**: Vercel will automatically detect the configuration from `vercel.json`

## Deployment to Render

1. **Create a new Static Site** in Render
2. **Connect your repository**
3. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment: Static

4. **Environment Variables** (if using Supabase):
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

5. **Deploy**: Render will use the configuration from `render.yaml`

## Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_APP_NAME=HEVA CreativeHub
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
```

## Build Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run start`: Start production server (for testing)

## Troubleshooting

### Common Issues:

1. **Build Fails**: Ensure all dependencies are installed
2. **404 Errors**: Check that the SPA routing is configured correctly
3. **Environment Variables**: Make sure they're set in your deployment platform
4. **CORS Issues**: Configure your Supabase project settings

### For Vercel:
- Check the deployment logs in the Vercel dashboard
- Ensure the `vercel.json` configuration is correct

### For Render:
- Check the build logs in the Render dashboard
- Ensure the `render.yaml` configuration is correct

## Development vs Production

- **Development**: Uses demo data and shows development mode indicators
- **Production**: Uses real Supabase connection (requires environment variables)

The app will automatically detect the environment and adjust accordingly. 