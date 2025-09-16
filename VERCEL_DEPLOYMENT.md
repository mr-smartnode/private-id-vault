# Vercel Deployment Guide for Private ID Vault

This guide provides step-by-step instructions for deploying the Private ID Vault application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Fork the Repository

1. Go to [https://github.com/mr-smartnode/private-id-vault](https://github.com/mr-smartnode/private-id-vault)
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account as the destination
4. Wait for the fork to complete

## Step 2: Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard
4. Import the forked repository:
   - Search for "private-id-vault"
   - Click "Import" next to your forked repository

## Step 3: Configure Project Settings

### Basic Configuration
- **Project Name**: `private-id-vault` (or your preferred name)
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Click "Environment Variables" and add the following:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**Important**: Replace the placeholder values with your actual API keys:
- Get Infura API key from [https://infura.io](https://infura.io)
- Get WalletConnect Project ID from [https://cloud.walletconnect.com](https://cloud.walletconnect.com)

## Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Once deployed, you'll get a live URL (e.g., `https://private-id-vault-xxx.vercel.app`)

## Step 5: Configure Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click "Settings" tab
3. Go to "Domains" section
4. Add your custom domain
5. Follow the DNS configuration instructions
6. Wait for DNS propagation (up to 24 hours)

## Step 6: Verify Deployment

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify that the application loads correctly
4. Check browser console for any errors

## Troubleshooting

### Common Issues

**Build Fails**
- Check that all environment variables are set correctly
- Ensure Node.js version is 18+ in Vercel settings
- Review build logs for specific error messages

**Wallet Connection Issues**
- Verify WalletConnect Project ID is correct
- Check that RPC URL is accessible
- Ensure Chain ID matches your target network

**Environment Variables Not Loading**
- Make sure variable names start with `VITE_`
- Check for typos in variable names
- Redeploy after adding new variables

### Performance Optimization

1. **Enable Edge Functions** (if needed):
   - Go to Functions tab in Vercel dashboard
   - Configure edge runtime for better performance

2. **Optimize Images**:
   - Use WebP format for images
   - Implement lazy loading
   - Consider using Vercel's Image Optimization

3. **Caching**:
   - Vercel automatically handles static asset caching
   - Configure custom cache headers if needed

## Monitoring and Analytics

1. **Vercel Analytics**:
   - Enable in the Analytics tab
   - Monitor performance metrics
   - Track user interactions

2. **Error Tracking**:
   - Set up error monitoring (Sentry, LogRocket, etc.)
   - Monitor function logs in Vercel dashboard

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **HTTPS**:
   - Vercel automatically provides HTTPS
   - Configure HSTS headers if needed

3. **CORS**:
   - Configure CORS settings for API calls
   - Restrict origins to your domain

## Updates and Maintenance

### Automatic Deployments
- Vercel automatically deploys on every push to main branch
- Preview deployments are created for pull requests

### Manual Deployments
1. Go to Deployments tab
2. Click "Redeploy" for latest commit
3. Or trigger deployment from GitHub Actions

### Rollback
1. Go to Deployments tab
2. Find the previous working deployment
3. Click "Promote to Production"

## Cost Considerations

### Free Tier Limits
- 100GB bandwidth per month
- 100 serverless function executions
- 1,000 build minutes per month

### Pro Tier Benefits
- Unlimited bandwidth
- Unlimited function executions
- Priority support
- Advanced analytics

## Support

If you encounter issues:

1. Check Vercel documentation: [https://vercel.com/docs](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Check GitHub Issues: [https://github.com/mr-smartnode/private-id-vault/issues](https://github.com/mr-smartnode/private-id-vault/issues)
4. Contact Vercel support for platform-specific issues

## Next Steps

After successful deployment:

1. Set up monitoring and alerting
2. Configure custom domain
3. Implement CI/CD pipeline
4. Set up staging environment
5. Plan for scaling and optimization

---

**Happy Deploying! 🚀**
