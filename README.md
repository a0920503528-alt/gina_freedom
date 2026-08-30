# 朝向自由｜AI 可用版

Vercel 部署：
1. 把本資料夾內所有檔案放進 GitHub repository 根目錄。
2. Vercel Import Git Repository。
3. Framework Preset 選 Next.js（通常會自動偵測）。
4. Deploy。
5. Vercel Settings → Environment Variables：
   AI_GATEWAY_API_KEY = 你的 Vercel AI Gateway Key
6. Save → Redeploy。

不要把 API Key 寫進 HTML/JS。
