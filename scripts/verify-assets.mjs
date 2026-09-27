import http from 'http';

http.get('http://localhost:3000/', (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', async () => {
    const urls = [];
    const scriptRegex = /src="(\/_next\/[^"]+)"/g;
    const linkRegex = /href="(\/_next\/[^"]+)"/g;
    let m;
    while ((m = scriptRegex.exec(html)) !== null) urls.push(m[1]);
    while ((m = linkRegex.exec(html)) !== null) urls.push(m[1]);
    console.log(`Found ${urls.length} static assets in HTML:`);
    
    let allOk = true;
    for (const u of urls) {
      await new Promise(r => {
        http.get('http://localhost:3000' + u, (assetRes) => {
          if (assetRes.statusCode === 200) {
            console.log(`✅ [200 OK] ${u}`);
          } else {
            console.error(`❌ [${assetRes.statusCode}] ${u}`);
            allOk = false;
          }
          r();
        });
      });
    }

    if (allOk) {
      console.log('\n🎉 ALL ASSETS LOADED WITH HTTP 200 OK! NO 404 ERRORS.');
    } else {
      console.error('\n⚠️ SOME ASSETS RETURNED ERRORS.');
      process.exit(1);
    }
  });
});
