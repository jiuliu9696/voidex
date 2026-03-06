# Chromax Quick Start Guide

Get started with Chromax browser fingerprint protection in under 5 minutes!

## 📥 Installation

### Step 1: Download Chromax

Download ChromaxSetup.exe from the [Downloads page](../../DOWNLOADS.md).

### Step 2: Install

1. Run ChromaxSetup.exe
2. Follow the installation wizard
3. Chromax will be installed to: `C:\Users\[username]\AppData\Local\Chromax\chrome.exe`

### Step 3: Verify Installation

Open Command Prompt and run:
```cmd
"%LOCALAPPDATA%\Chromax\chrome.exe" --version
```

You should see the Chromax version number.

---

## 🎯 Choose Your Path

### Path 1: Use with Voidex Launcher (Recommended for Beginners)

1. **Install Voidex** - Download VoidexSetup.exe from [Downloads](../../DOWNLOADS.md)
2. **Launch Voidex** from Start Menu
3. **Create a Profile**:
   - Click "New Profile"
   - Configure fingerprint settings
   - Click "Save"
4. **Launch Browser**:
   - Select your profile
   - Click "Launch Browser"
5. **Test** at https://browserleaks.com/canvas

**👉 [See Voidex User Guide](../voidex/USER_GUIDE.md)**

### Path 2: Use with Node.js Script (For Developers)

1. **Create a script** (e.g., `launch.js`):

```javascript
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

const chromaxPath = path.join(
  os.homedir(),
  'AppData', 'Local', 'Chromax', 'chrome.exe'
);

spawn(chromaxPath, [
  '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  '--fingerprint-platform=Win32',
  '--fingerprint-screen-resolution=1920x1080',
  '--fingerprint-webgl-meta-mode=mask',
  '--fingerprint-webgl-vendor=Intel Inc.',
  '--fingerprint-canvas-mode=noise',
  '--fingerprint-canvas-seed=my-seed-123',
  'https://browserleaks.com/canvas'
]);
```

2. **Run**:
```bash
node launch.js
```

**👉 [See Complete Node.js Examples](../../examples/chromax-standalone/nodejs-puppeteer-example/)**

### Path 3: Use with Python Script (For Python Users)

1. **Create a script** (e.g., `launch.py`):

```python
import subprocess
import os

chromax_path = os.path.join(
    os.environ['LOCALAPPDATA'],
    'Chromax', 'chrome.exe'
)

subprocess.Popen([
    chromax_path,
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    '--fingerprint-platform=Win32',
    '--fingerprint-screen-resolution=1920x1080',
    '--fingerprint-webgl-meta-mode=mask',
    '--fingerprint-canvas-mode=noise',
    'https://browserleaks.com/canvas'
])
```

2. **Run**:
```bash
python launch.py
```

**👉 [See Complete Python Examples](../../examples/chromax-standalone/python-selenium-example/)**

---

## 🎭 Quick Fingerprint Examples

### Windows 10 Profile
```bash
chrome.exe \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --fingerprint-platform="Win32" \
  --fingerprint-screen-resolution="1920x1080" \
  --fingerprint-webgl-meta-mode=mask \
  --fingerprint-webgl-vendor="Intel Inc." \
  --fingerprint-canvas-mode=noise \
  --fingerprint-canvas-seed="my-seed-123"
```

### macOS Profile
```bash
chrome \
  --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
  --fingerprint-platform="MacIntel" \
  --fingerprint-screen-resolution="2560x1440" \
  --fingerprint-webgl-meta-mode=mask \
  --fingerprint-webgl-vendor="Apple Inc." \
  --fingerprint-canvas-mode=noise
```

---

## 🧪 Test Your Setup

1. **Launch Chromax** with fingerprint flags
2. **Visit test sites:**
   - https://browserleaks.com/canvas
   - https://browserleaks.com/webgl
   - https://whoer.net

3. **Verify:**
   - ✅ Canvas fingerprint is protected
   - ✅ WebGL vendor/renderer matches your config
   - ✅ Screen resolution matches your config
   - ✅ User-Agent matches your config

---

## 🔧 Common Issues

### Issue: "Chromax not found"
**Solution:** Verify Chromax is installed at `C:\Users\[username]\AppData\Local\Chromax\chrome.exe`

### Issue: "Fingerprint not applied"
**Solution:** Make sure you're using Chromax, not regular Chrome. Check the executable path.

### Issue: "Canvas still detected"
**Solution:** Use `--fingerprint-canvas-mode=noise` or `block`, and set a unique seed.

---

## 📚 Next Steps

- **Read the full guide**: [FINGERPRINT_GUIDE.md](./FINGERPRINT_GUIDE.md)
- **Explore examples**: [examples/chromax-standalone/](../../examples/chromax-standalone/)
- **Learn why native matters**: [WHY_NATIVE.md](./WHY_NATIVE.md)

---

## 💡 Pro Tips

1. **Use unique seeds** for canvas/webgl across different profiles
2. **Match User-Agent** with platform and WebGL vendor for realism
3. **Test thoroughly** before production use
4. **Keep seeds consistent** across sessions for the same profile

---

## 🆘 Need Help?

- **Documentation**: See [FINGERPRINT_GUIDE.md](./FINGERPRINT_GUIDE.md)
- **Examples**: Check [examples/README.md](../../examples/README.md)
- **Issues**: Open an issue on GitHub

---

**Ready to dive deeper?** Check out the [complete fingerprint guide](./FINGERPRINT_GUIDE.md)!
