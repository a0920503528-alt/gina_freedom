朝向自由｜一鍵上架版

1. GitHub 建立新的空 repository。
2. 把這個資料夾「裡面的全部檔案與 app、public 資料夾」上傳到 repository 根目錄。
3. Vercel → Add New → Project → Import Git Repository → 選這個 repository。
4. Framework Preset 保持 Next.js。
5. Build Command / Output Directory 保持預設，不要改成 Other。
6. Deploy。
7. 網站首頁應該直接出現。
8. AI 要使用時，再到 Vercel Environment Variables 加 AI_GATEWAY_API_KEY。

不要把 ZIP 檔本身放進 repository；要解壓縮後上傳裡面的內容。
