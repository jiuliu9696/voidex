#!/usr/bin/env node
/**
 * Chromax Proxy Bridge CLI
 * 
 * Standalone CLI tool to run a proxy bridge for use with Python or other scripts
 * that need to connect to authenticated SOCKS5/HTTP proxies.
 * 
 * Usage:
 *   node proxy-bridge-cli.js --upstream socks5://user:pass@host:1080 --port 9999
 *   node proxy-bridge-cli.js --upstream http://user:pass@proxy.example.com:8080
 * 
 * Options:
 *   --upstream <url>   Upstream proxy URL (required)
 *   --port <number>    Local port to listen on (default: auto-assign)
 *   --verbose          Enable verbose logging
 *   --help             Show this help message
 */

const { createProxyBridge } = require('./proxy-bridge');

function showHelp() {
  console.log(`
Chromax Proxy Bridge CLI

Usage:
  node proxy-bridge-cli.js --upstream <url> [options]

Options:
  --upstream <url>   Upstream proxy URL (required)
                     Examples:
                       socks5://user:pass@host:1080
                       http://user:pass@proxy.example.com:8080
                       socks5://127.0.0.1:1080 (no auth)
  
  --port <number>    Local port to listen on (default: auto-assign)
  
  --verbose          Enable verbose logging
  
  --help             Show this help message

Examples:
  # SOCKS5 proxy with auth
  node proxy-bridge-cli.js --upstream socks5://user:pass@host:1080 --port 9999
  
  # HTTP proxy with auth
  node proxy-bridge-cli.js --upstream http://user:pass@proxy.example.com:8080
  
  # Auto-assign port
  node proxy-bridge-cli.js --upstream socks5://user:pass@host:1080

Then use the bridge in your scripts:
  # Node.js
  spawn('chrome.exe', ['--proxy-server=http://127.0.0.1:9999', ...]);
  
  # Python
  options.add_argument('--proxy-server=http://127.0.0.1:9999')
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  let upstream = null;
  let port = null;
  let verbose = false;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
    
    if (arg === '--upstream') {
      upstream = args[++i];
    } else if (arg === '--port') {
      port = parseInt(args[++i], 10);
    } else if (arg === '--verbose' || arg === '-v') {
      verbose = true;
    }
  }
  
  if (!upstream) {
    console.error('❌ Error: --upstream is required\n');
    showHelp();
    process.exit(1);
  }
  
  if (port && (port < 1 || port > 65535)) {
    console.error('❌ Error: Port must be between 1 and 65535\n');
    process.exit(1);
  }
  
  let bridge = null;
  
  try {
    console.log('🚀 Starting Chromax Proxy Bridge...\n');
    
    bridge = await createProxyBridge(upstream, port, verbose);
    
    console.log('✅ Proxy bridge is running!');
    console.log(`\n📋 Configuration:`);
    console.log(`   Local proxy:    http://127.0.0.1:${bridge.port}`);
    console.log(`   Upstream proxy: ${upstream.replace(/:[^:@]+@/, ':****@')}`);
    console.log(`\n💡 Use this in your Chromax launch command:`);
    console.log(`   --proxy-server=http://127.0.0.1:${bridge.port}`);
    console.log(`\n⚠️  Press Ctrl+C to stop the proxy bridge\n`);
    
    await new Promise(() => {});
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
  
  process.on('SIGINT', async () => {
    console.log('\n\n⚠️  Received SIGINT (Ctrl+C), shutting down...');
    
    if (bridge) {
      try {
        await bridge.close();
        console.log('✅ Proxy bridge closed');
      } catch (e) {
        console.warn(`⚠️  Failed to close proxy bridge: ${e.message}`);
      }
    }
    
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('\n\n⚠️  Received SIGTERM, shutting down...');
    
    if (bridge) {
      try {
        await bridge.close();
      } catch (e) {
        console.warn(`⚠️  Failed to close proxy bridge: ${e.message}`);
      }
    }
    
    process.exit(0);
  });
}

if (require.main === module) {
  main();
}
