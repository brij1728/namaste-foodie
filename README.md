# namaste-react

# Parcel

- Dev Build
- Local Build
- HMR (Hot Module Replacement)
- File Watching Algorithm - written in C++
- Caching - Faster Builds
- Image Optimization
- Minification in Production
- Bundling
- Compress
- Consistent Hashing
- Code SPlitting
- Differential Bundling - support older browsers
- Diagnostic
- Error Handling
- Hosting App on https
- Tree Shaking - remove unused code
- Different dev and prod bundles


# Redux Toolkit
 - Install `@reduxjs/toolkit` and `react-redux`
 - Build our own store
 - Connect our store to our app
 - Create Slice (cartSlice)
 - dispatch (action)
 - Read data using selector


 # Setting up Testing in our app
 - Install React Testung Library
 - Installed Jest
 - Installed Babel dependencies
 - Configure Babel
 - Configure Parcel config file to disable default babel transpilation 
 - Jest configuration : `npx jest --init`
 - Install jsdom libaray: `npm install --save-dev jest-environment-jsdom`
 - Install ` @babel/preset-react` to make JSX work in test cases
 - Include ` @babel/preset-react` inside my babel config
 - Install `@testing-library/jest-dom`


## Setting Up Nginx Proxy for Development

To run the app on a development server without CORS issues and allow others to access the site via the dev server's IP or any forwarding mechanism, follow these steps to set up an nginx proxy:

### Prerequisites

- Ensure **nginx** is installed on your Ubuntu/Linux system.

### Steps

1. **Link the nginx Configuration File:**

   Navigate to your project directory and run:

   ```bash
   sudo ln -sf "$(pwd)/nginx-proxy/swiggy-proxy.conf" /etc/nginx/sites-enabled/swiggy-proxy.conf
   ```

   This command creates a symbolic link to the nginx configuration file provided in the project.

2. **Test the Nginx Configuration:**

   ```bash
   sudo nginx -t
   ```

   Ensure there are no errors in the configuration. If there are issues, revisit the configuration file.

3. **Reload Nginx to Apply Changes:**

   ```bash
   sudo service nginx reload
   ```

   This reloads nginx with the new configuration without restarting the server.

### How It Works

- The nginx configuration (`swiggy-proxy.conf`) listens on port `21234` and proxies requests to `https://www.swiggy.com`, handling CORS headers to avoid issues when making API calls from the development server.
- API calls in the application have been updated to use relative paths starting with `/dapi`, which are intercepted by the proxy middleware (`.proxyrc.js`) and forwarded appropriately.

### Additional Notes

- Ensure your development server is accessible to others (e.g., it's not bound to `localhost` but to `0.0.0.0`).
- This setup allows other devices on the network or via port forwarding to access your development instance without running into CORS errors due to API calls.
- Remember to install the required dependencies:

  ```bash
  npm install
  ```

- If you encounter issues, verify that nginx is running and that the proxy configurations are correctly set up.

