const { chromium } = require('playwright');

const viewports = [
  { name: '320px', width: 320, height: 568 },
  { name: '360px', width: 360, height: 640 },
  { name: '375px', width: 375, height: 667 },
  { name: '390px', width: 390, height: 844 },
  { name: '414px', width: 414, height: 896 },
  { name: '480px', width: 480, height: 800 },
  { name: '640px', width: 640, height: 1136 },
  { name: '641px', width: 641, height: 1136 },
  { name: '768px', width: 768, height: 1024 },
  { name: '820px', width: 820, height: 1180 },
  { name: '1024px', width: 1024, height: 768 },
  { name: '1280px', width: 1280, height: 720 },
  { name: '1366px', width: 1366, height: 768 },
  { name: '1440px', width: 1440, height: 900 },
  { name: '1600px', width: 1600, height: 900 },
  { name: '1920px', width: 1920, height: 1080 },
];

const pages = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services.html' },
  { name: 'Portfolio', path: '/portfolio.html' },
  { name: 'Contact', path: '/contact.html' },
  { name: 'À propos', path: '/a-propos.html' },
];

async function runTests() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  const results = {
    overflow: [],
    consoleErrors: [],
    viewportTests: [],
  };

  for (const page of pages) {
    for (const vp of viewports) {
      const pageInstance = await context.newPage();
      await pageInstance.setViewportSize({ width: vp.width, height: vp.height });
      
      const errors = [];
      pageInstance.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      pageInstance.on('pageerror', err => {
        errors.push(err.message);
      });
      
      try {
        await pageInstance.goto(`http://127.0.0.1:8765${page.path}`, { waitUntil: 'networkidle', timeout: 10000 });
        await pageInstance.waitForTimeout(500);
        
        // Check for horizontal overflow
        const bodyScrollWidth = await pageInstance.evaluate(() => document.body.scrollWidth);
        const viewportWidth = vp.width;
        const hasHorizontalOverflow = bodyScrollWidth > viewportWidth;
        
        // Check for horizontal scrollbar
        const hasScrollbar = await pageInstance.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        const testResult = {
          page: page.name,
          viewport: vp.name,
          width: vp.width,
          bodyScrollWidth: bodyScrollWidth,
          hasHorizontalOverflow: hasHorizontalOverflow,
          hasScrollbar: hasScrollbar,
          consoleErrors: errors.length > 0 ? errors : null,
        };
        
        results.viewportTests.push(testResult);
        
        if (hasHorizontalOverflow || hasScrollbar) {
          results.overflow.push({
            page: page.name,
            viewport: vp.name,
            bodyScrollWidth: bodyScrollWidth,
            viewportWidth: viewportWidth,
          });
        }
        
        if (errors.length > 0) {
          results.consoleErrors.push({
            page: page.name,
            viewport: vp.name,
            errors: errors,
          });
        }
        
      } catch (e) {
        results.viewportTests.push({
          page: page.name,
          viewport: vp.name,
          error: e.message,
        });
      }
      
      await pageInstance.close();
    }
  }
  
  await browser.close();
  
  console.log(JSON.stringify(results, null, 2));
  return results;
}

runTests().catch(console.error);