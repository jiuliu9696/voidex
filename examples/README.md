# Chromax Examples

This directory contains examples for using **Chromax browser** with automation tools. These examples demonstrate how to use Chromax's native fingerprint protection in your scripts.

## 🎯 What Are These Examples?

These examples show how to use **Chromax browser** (the custom Chromium with fingerprint protection) with popular automation tools like Puppeteer and Selenium.

**👉 For GUI usage without coding, use [Voidex Launcher](../docs/voidex/USER_GUIDE.md) instead.**

## 📋 Prerequisites

1. **Install Chromax** - Download ChromaxSetup.exe from [Downloads](../DOWNLOADS.md)
2. **Choose your tool** - Node.js (Puppeteer) or Python (Selenium)

## 📦 Available Examples

### 1. Node.js + Puppeteer
**Full browser automation with Puppeteer**

- **Location**: [`chromax-standalone/nodejs-puppeteer-example/`](./chromax-standalone/nodejs-puppeteer-example/)
- **Language**: JavaScript (Node.js)
- **Tool**: Puppeteer
- **Features**: Page navigation, element interaction, screenshots, scraping

**Quick Start:**
```bash
cd chromax-standalone/nodejs-puppeteer-example
npm install
node index.js
```

**Use when:**
- You prefer JavaScript/Node.js
- You need full browser automation
- You want to scrape websites
- You're already using Puppeteer

### 2. Python + Selenium
**Full browser automation with Selenium**

- **Location**: [`chromax-standalone/python-selenium-example/`](./chromax-standalone/python-selenium-example/)
- **Language**: Python
- **Tool**: Selenium WebDriver
- **Features**: Page navigation, element interaction, screenshots, scraping

**Quick Start:**
```bash
cd chromax-standalone/python-selenium-example
pip install -r requirements.txt
python main.py
```

**Use when:**
- You prefer Python
- You need full browser automation
- You want to scrape websites
- You're already using Selenium

### 3. Node.js Proxy Bridge
**Proxy authentication helper for scripts**

- **Location**: [`chromax-standalone/nodejs-proxy-bridge/`](./chromax-standalone/nodejs-proxy-bridge/)
- **Language**: JavaScript (Node.js)
- **Purpose**: Handle authenticated SOCKS5/HTTP proxies
- **Features**: SOCKS5/HTTP support, authentication, auto port assignment

**Quick Start:**
```bash
cd chromax-standalone/nodejs-proxy-bridge
npm install
node proxy-bridge-cli.js --upstream socks5://user:pass@host:1080 --port 9999
```

**Use when:**
- Your proxy requires authentication
- You're using SOCKS5 proxies
- You need proxy support in Python scripts

## 🔗 Proxy Support

### Node.js Examples (Built-in)
The Node.js Puppeteer example can automatically handle proxies with authentication. Just configure the proxy settings in the script.

### Python Examples (Manual Bridge)
For Python scripts, you need to run the proxy bridge separately:

**Step 1** - Start proxy bridge (separate terminal):
```bash
cd chromax-standalone/nodejs-proxy-bridge
node proxy-bridge-cli.js --upstream socks5://user:pass@host:1080 --port 9999
```

**Step 2** - Configure Python script to use bridge:
```python
'proxy': {
    'enabled': True,
    'server': 'http://127.0.0.1:9999'
}
```

### Proxies Without Authentication
If your proxy doesn't require authentication, you can use it directly without the bridge:

```javascript
// Node.js
args.push('--proxy-server=socks5://proxy.example.com:1080');
```

```python
# Python
options.add_argument('--proxy-server=socks5://proxy.example.com:1080')
```

## 🎭 Fingerprint Configuration

All examples support these fingerprint parameters:

- **User-Agent** - Custom User-Agent string
- **Platform** - navigator.platform (Win32, MacIntel, etc.)
- **Screen Resolution** - Screen dimensions (e.g., 1920x1080)
- **Timezone** - IANA timezone (e.g., America/New_York)
- **Canvas Protection** - Noise injection or blocking
- **WebGL Protection** - Vendor/renderer masking
- **Geolocation** - GPS coordinate override
- **Hardware** - CPU cores, device memory

**👉 [See Complete Flag Reference](../docs/chromax/FINGERPRINT_GUIDE.md)**

## 📊 Comparison: Puppeteer vs Selenium

| Feature | Puppeteer | Selenium |
|---------|-----------|----------|
| Language | JavaScript | Python, Java, C#, etc. |
| Performance | ⚡ Faster | ✅ Good |
| API | Modern async/await | Traditional WebDriver |
| Learning Curve | ⭐ Easy | ⭐⭐ Medium |
| Community | Large | Very Large |
| Best For | Node.js projects | Python/Java projects |

**👉 [See Detailed Comparison](./EXAMPLES_COMPARISON.md)**

## 🚀 Quick Start Examples

### Puppeteer Example

```javascript
const puppeteer = require('puppeteer-core');

const browser = await puppeteer.launch({
  executablePath: 'C:\\Users\\[username]\\AppData\\Local\\Chromax\\chrome.exe',
  args: [
    '--fingerprint-platform=Win32',
    '--fingerprint-screen-resolution=1920x1080',
    '--fingerprint-canvas-mode=noise'
  ]
});

const page = await browser.newPage();
await page.goto('https://browserleaks.com/canvas');
```

### Selenium Example

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.binary_location = r'C:\Users\[username]\AppData\Local\Chromax\chrome.exe'
options.add_argument('--fingerprint-platform=Win32')
options.add_argument('--fingerprint-screen-resolution=1920x1080')
options.add_argument('--fingerprint-canvas-mode=noise')

driver = webdriver.Chrome(options=options)
driver.get('https://browserleaks.com/canvas')
```

## 🧪 Testing Your Fingerprint

After launching Chromax with your script, test at:

- **Canvas**: https://browserleaks.com/canvas
- **WebGL**: https://browserleaks.com/webgl
- **General**: https://whoer.net
- **Comprehensive**: https://pixelscan.net

## 💡 Pro Tips

### For All Examples
1. **Use unique seeds** for canvas/webgl for different profiles
2. **Match User-Agent** with platform and WebGL vendor for realism
3. **Test thoroughly** before production use
4. **Keep Chromax updated** for security patches

### For Puppeteer
- Use `puppeteer-core` (not `puppeteer`) to avoid downloading regular Chrome
- Add `ignoreDefaultArgs: ['--enable-automation']` to hide automation
- Implement random delays to mimic human behavior

### For Selenium
- Add `excludeSwitches: ['enable-automation']` to hide automation
- Use explicit waits instead of sleep()
- Handle exceptions gracefully

## 📚 Documentation

- **[Chromax Overview](../docs/chromax/README.md)** - What is Chromax?
- **[Fingerprint Guide](../docs/chromax/FINGERPRINT_GUIDE.md)** - Complete flag reference
- **[Quick Start](../docs/chromax/QUICK_START.md)** - Get started in 5 minutes
- **[Why Native?](../docs/chromax/WHY_NATIVE.md)** - Technical comparison

## 🆘 Common Issues

### Issue: "Chromax not found"
**Solution:** 
1. Verify Chromax is installed: `C:\Users\[username]\AppData\Local\Chromax\chrome.exe`
2. Or set `CHROMIUM_PATH` environment variable

### Issue: "Module not found" (Puppeteer/Selenium)
**Solution:** Install dependencies:
```bash
npm install puppeteer-core  # For Puppeteer
pip install selenium        # For Selenium
```

### Issue: "Fingerprint not applied"
**Solution:** Make sure you're using Chromax, not regular Chrome. Check the executable path.

### Issue: "navigator.webdriver is true"
**Solution:** 
- Puppeteer: Add `ignoreDefaultArgs: ['--enable-automation']`
- Selenium: Add `excludeSwitches: ['enable-automation']`

## 📞 Need Help?

- **Issues**: Open an issue on GitHub
- **Documentation**: See [docs/chromax/](../docs/chromax/)
- **Community**: Join our discussions

---

**Ready to start?** Pick an example above and dive in! 🚀
