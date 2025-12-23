<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1QAHsqUBZWKL93sH8ns2_3nRrUJMLOwUD

## Run Locally

**Prerequisites:**  Node.js (v20+ recommended)

1. **Installation**:
   ```bash
   npm install
   ```

2. **Configuration**:
   - Copy `.env.example` to `.env` (if applicable) or set `GEMINI_API_KEY` in `.env.local`

3. **Development**:
   ```bash
   npm run dev
   ```

## Deployment

This project is configured to automatically deploy to **GitHub Pages** using GitHub Actions.

### Setup
1. Go to your repository **Settings** > **Pages**.
2. Under "Build and deployment", select **GitHub Actions** as the source.
3. Push your changes to the `main` branch.
4. The workflow will automatically build and deploy your app.

### Manual Build
To build the project locally for production:
```bash
npm run build
```
The output will be in the `dist` folder.

## Version Control
A `.gitignore` file has been configured to exclude:
- `node_modules`
- Build artifacts (`dist`)
- Environment variables (`.env`, `.env.local`)
- System logs and temporary files
