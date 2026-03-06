# Examples Comparison Guide

This guide helps you choose the right example for your use case.

## 📊 Quick Comparison

| Example | Language | Tool | Complexity | Use Case |
|---------|----------|------|------------|----------|
| **nodejs-puppeteer-example** | Node.js | Puppeteer | ⭐⭐ Medium | Full browser automation |
| **python-selenium-example** | Python | Selenium | ⭐⭐ Medium | Full browser automation |
| **nodejs-proxy-bridge** | Node.js | N/A | ⭐ Easy | Proxy authentication helper |

## 🎯 Which Example Should I Use?

### Use `nodejs-puppeteer-example` if:
- ✅ You prefer JavaScript/Node.js
- ✅ You need full browser automation
- ✅ You want to scrape websites
- ✅ You need to interact with pages (click, type, etc.)
- ✅ You're already using Puppeteer

**Example:**
```javascript
const browser = await puppeteer.launch({
  executablePath: 'C:\\Users\\[username]\\AppData\\Local\\Chromax\\chrome.exe',
  args: ['--fingerprint-platform=Win32', ...]
});
const page = await browser.newPage();
await page.goto('https://example.com');
```

### Use `python-selenium-example` if:
- ✅ You prefer Python
- ✅ You need full browser automation
- ✅ You want to scrape websites
- ✅ You need to interact with pages (click, type, etc.)
- ✅ You're already using Selenium

**Example:**
```python
options = Options()
options.binary_location = r'C:\Users\[username]\AppData\Local\Chromax\chrome.exe'
options.add_argument('--fingerprint-platform=Win32')
driver = webdriver.Chrome(options=options)
driver.get('https://example.com')
```

### Use `nodejs-proxy-bridge` if:
- ✅ Your proxy requires authentication
- ✅ You're using SOCKS5 proxies
- ✅ You need proxy support in Python scripts
- ✅ Chromium's native proxy support isn't working

**Example:**
```bash
# Terminal 1: Start bridge
node proxy-bridge-cli.js --upstream socks5://user:pass@host:1080 --port 9999

# Terminal 2: Use in your script
python main.py  # with --proxy-server=http://127.0.0.1:9999
```

## 🔧 Feature Comparison

| Feature | Puppeteer | Selenium | Proxy Bridge |
|---------|-----------|----------|--------------|
| Launch Browser | ✅ | ✅ | ❌ |
| Fingerprint Config | ✅ | ✅ | ❌ |
| Page Navigation | ✅ | ✅ | ❌ |
| Element Interaction | ✅ | ✅ | ❌ |
| Screenshot | ✅ | ✅ | ❌ |
| JavaScript Execution | ✅ | ✅ | ❌ |
| Multiple Pages | ✅ | ✅ | ❌ |
| Headless Mode | ✅ | ✅ | ❌ |
| Proxy Support | ✅ Built-in | ✅ Via Bridge | ✅ Provides |
| Language | JavaScript | Python | JavaScript |

## 📝 Detailed Comparison

### Puppeteer vs Selenium

#### Puppeteer Advantages
- **Modern API** - Clean async/await syntax
- **Better Performance** - Direct Chrome DevTools Protocol
- **Built-in Proxy Bridge** - Automatic proxy handling
- **Simpler Setup** - Fewer dependencies

#### Selenium Advantages
- **Multi-Language** - Python, Java, C#, Ruby, etc.
- **Cross-Browser** - Firefox, Safari, Edge (though we focus on Chromax)
- **Mature Ecosystem** - More third-party tools and libraries
- **Familiar** - Many developers already know Selenium

## 🚀 Getting Started

### Beginner Path

**If you want GUI (no coding):**
1. Install Chromax and Voidex
2. Use Voidex Launcher
3. **👉 [See Voidex User Guide](../docs/voidex/USER_GUIDE.md)**

**If you want to write scripts:**
1. Install Chromax
2. Choose Puppeteer (Node.js) or Selenium (Python)
3. Follow the example README

### Intermediate Path

1. Start with basic example (Puppeteer or Selenium)
2. Understand fingerprint flags
3. Test on fingerprint detection sites
4. Customize configuration for your needs

### Advanced Path

1. Combine fingerprinting with advanced automation
2. Implement anti-detection techniques
3. Use proxy bridge for authenticated proxies
4. Build production-ready automation

## 💡 Pro Tips

### For Puppeteer
- Always use `puppeteer-core` (not `puppeteer`) to avoid downloading regular Chrome
- Use `ignoreDefaultArgs: ['--enable-automation']` to hide automation
- Implement random delays to mimic human behavior
- Use stealth techniques (viewport randomization, mouse movements)

### For Selenium
- Add `excludeSwitches: ['enable-automation']` to hide automation
- Use explicit waits instead of `time.sleep()`
- Handle exceptions gracefully with try/except
- Use Page Object Model for maintainable code

### For Proxy Usage
- Use proxy bridge for authenticated SOCKS5/HTTP proxies
- Test proxy connection before running full automation
- Implement proxy rotation for large-scale scraping
- Monitor proxy health and switch if needed

## 🔗 Related Resources

- **[Chromax Documentation](../docs/chromax/)** - Browser documentation
- **[Voidex Documentation](../docs/voidex/)** - Launcher documentation
- **[Fingerprint Guide](../docs/chromax/FINGERPRINT_GUIDE.md)** - Complete flag reference
- **[Downloads](../DOWNLOADS.md)** - Download installers

## 🆘 Common Issues

### Issue: "Chromax not found"
**Solution:** 
- Verify Chromax is installed at: `C:\Users\[username]\AppData\Local\Chromax\chrome.exe`
- Or set `CHROMIUM_PATH` environment variable

### Issue: "Module not found"
**Solution:** Install dependencies:
```bash
# Puppeteer
cd chromax-standalone/nodejs-puppeteer-example
npm install

# Selenium
cd chromax-standalone/python-selenium-example
pip install -r requirements.txt

# Proxy Bridge
cd chromax-standalone/nodejs-proxy-bridge
npm install
```

### Issue: "Fingerprint not applied"
**Solution:** Make sure you're using Chromax, not regular Chrome. Check the executable path in your script.

### Issue: "Proxy not working"
**Solution:** 
- For authenticated proxies, use the proxy bridge
- Make sure bridge is running before starting your script
- Check proxy credentials are correct

## 📞 Need Help?

- **Documentation**: See [docs/chromax/](../docs/chromax/)
- **Issues**: Open an issue on GitHub
- **Community**: Join our discussions

---

**Ready to start?** Pick an example above and dive in! 🚀
