/**
 * Chromax Proxy Bridge Module
 * 
 * This module provides a local HTTP proxy bridge that forwards traffic to
 * upstream SOCKS5 or HTTP proxies with authentication support.
 * 
 * Why needed:
 * - Chromium's --proxy-server flag doesn't support SOCKS5 authentication
 * - This bridge handles auth and protocol conversion for you
 * 
 * Usage:
 *   const { createProxyBridge } = require('./proxy-bridge');
 *   const bridge = await createProxyBridge('socks5://user:pass@host:1080');
 *   console.log(`Proxy bridge running on: http://127.0.0.1:${bridge.port}`);
 *   // ... use bridge.port with Chromium ...
 *   await bridge.close();
 */

const ProxyChain = require('proxy-chain');
const net = require('net');

/**
 * Check if a port is available
 */
async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      resolve(false);
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port, '127.0.0.1');
  });
}

/**
 * Find an available port in the range 8888-65535
 */
async function findAvailablePort(startPort = 8888) {
  for (let port = startPort; port <= 65535; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error('No available ports found in range 8888-65535');
}

/**
 * Wait for a port to be ready and accepting connections
 */
async function waitForPortReady(port, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const tryConnect = () => {
      if (Date.now() - startTime > timeoutMs) {
        reject(new Error(`Port ${port} not ready after ${timeoutMs}ms`));
        return;
      }
      
      const socket = new net.Socket();
      socket.setTimeout(1000);
      
      socket.once('connect', () => {
        socket.destroy();
        resolve();
      });
      
      socket.once('timeout', () => {
        socket.destroy();
        setTimeout(tryConnect, 100);
      });
      
      socket.once('error', () => {
        socket.destroy();
        setTimeout(tryConnect, 100);
      });
      
      socket.connect(port, '127.0.0.1');
    };
    
    tryConnect();
  });
}

/**
 * Create a proxy bridge that forwards to an upstream proxy
 * 
 * @param {string} upstreamProxyUrl - Upstream proxy URL (e.g., 'socks5://user:pass@host:1080')
 * @param {number} [port] - Optional port to use (default: auto-assign)
 * @param {boolean} [verbose] - Enable verbose logging (default: false)
 * @returns {Promise<{server: ProxyChain.Server, port: number, close: Function}>}
 */
async function createProxyBridge(upstreamProxyUrl, port = null, verbose = false) {
  if (!upstreamProxyUrl) {
    throw new Error('upstreamProxyUrl is required');
  }
  
  if (!port) {
    port = await findAvailablePort();
  } else {
    const available = await isPortAvailable(port);
    if (!available) {
      throw new Error(`Port ${port} is already in use`);
    }
  }
  
  const server = new ProxyChain.Server({
    port: port,
    verbose: verbose,
    prepareRequestFunction: ({ request }) => {
      if (verbose) {
        console.log(`[Proxy Bridge] ➡️  ${request.url}`);
      }
      return {
        upstreamProxyUrl: upstreamProxyUrl,
      };
    },
  });
  
  await server.listen();
  
  if (verbose) {
    console.log(`✅ Proxy bridge started on port ${port}`);
    console.log(`🔁 Forwarding to: ${upstreamProxyUrl.replace(/:[^:@]+@/, ':****@')}`);
  }
  
  try {
    await waitForPortReady(port, 5000);
    if (verbose) {
      console.log(`✅ Proxy bridge confirmed ready at http://127.0.0.1:${port}`);
    }
  } catch (error) {
    if (verbose) {
      console.warn(`⚠️ Port readiness check failed: ${error.message}`);
      console.warn(`⚠️ Continuing anyway - bridge may still work`);
    }
  }
  
  return {
    server,
    port,
    url: `http://127.0.0.1:${port}`,
    upstreamProxyUrl,
    close: async () => {
      await server.close(true);
      if (verbose) {
        console.log(`✅ Proxy bridge closed (port ${port} freed)`);
      }
    }
  };
}

/**
 * Build a proxy URL from config object
 * 
 * @param {Object} config - Proxy config { type, host, port, username, password }
 * @returns {string|null} - Proxy URL or null if invalid
 */
function buildProxyUrl(config) {
  if (!config || !config.host || !config.port) {
    return null;
  }
  
  let type = config.type || 'http';
  
  if (type === 'auto') {
    type = 'http';
  }
  
  const protocol = type.toLowerCase() === 'socks5' ? 'socks5://' : 'http://';
  
  let url = protocol;
  
  if (config.username && config.password) {
    url += `${config.username}:${config.password}@`;
  }
  
  url += `${config.host}:${config.port}`;
  
  return url;
}

module.exports = {
  createProxyBridge,
  buildProxyUrl,
  isPortAvailable,
  findAvailablePort
};
