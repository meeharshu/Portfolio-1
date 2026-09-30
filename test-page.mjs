import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
    
    console.log("Navigating...");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 10000 });
    
    console.log("Waiting a bit for React to render...");
    await new Promise(r => setTimeout(r, 2000));
    
    const content = await page.content();
    console.log("HTML length:", content.length);
    
    await browser.close();
  } catch(e) {
    console.error("Script error:", e);
  }
})();
