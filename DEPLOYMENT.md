# Deploying Ecommerce Site to Vercel

## Prerequisites
- Node.js installed on your machine
- Vercel CLI installed (`npm i -g vercel`)
- A Vercel account (free at vercel.com)

## Step 1: Prepare Your Project

Your project is already configured for Vercel deployment with:
- `vercel.json` configuration file
- Updated `package.json` scripts
- React app using FakeStore API (no backend needed for frontend deployment)

## Step 2: Build Your Project Locally (Optional)

Test your build locally first:
```bash
npm install
npm run build
```

This should create a `build` folder with your production-ready files.

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd /Users/imc/Desktop/test-task/ecommerce
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? → `Y`
   - Which scope? → Select your account
   - Link to existing project? → `N`
   - Project name? → `ecommerce` (or your preferred name)
   - In which directory is your code located? → `./` (current directory)
   - Want to override the settings? → `N`

5. **Your site will be deployed** and you'll get a URL like `https://your-project.vercel.app`

### Option B: Using Vercel Dashboard

1. **Push your code to GitHub** (if not already done)
2. **Go to vercel.com** and sign in
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project**:
   - Framework Preset: `Create React App`
   - Root Directory: `./` (leave empty)
   - Build Command: `npm run build`
   - Output Directory: `build`
6. **Click "Deploy"**

## Step 4: Environment Variables (If Needed)

If you need to add environment variables later:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add any required variables

## Step 5: Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click on "Settings" → "Domains"
3. Add your custom domain and follow the DNS configuration instructions

## Important Notes

- **API Calls**: Your app uses FakeStore API (`https://fakestoreapi.com/products/`), so no backend deployment is needed for the frontend
- **Client-Side Routing**: The `vercel.json` file handles React Router routing properly
- **Build Output**: Vercel will automatically run `npm run build` and serve the `build` folder
- **Automatic Deployments**: Future pushes to your main branch will automatically trigger new deployments

## Troubleshooting

### Build Errors
- Make sure all dependencies are in `package.json`
- Check that `react-scripts` is installed
- Verify the build command works locally

### Routing Issues
- The `vercel.json` file should handle all routing
- If you have issues, make sure the routes configuration is correct

### API Issues
- FakeStore API is public and should work from any domain
- If you switch to a different API, make sure it supports CORS

## Next Steps

After deployment:
1. Test all functionality on the live site
2. Check mobile responsiveness
3. Test the shopping cart and checkout flow
4. Consider adding analytics (Google Analytics, etc.)
5. Set up monitoring and error tracking

Your ecommerce site should now be live on Vercel! 🚀 