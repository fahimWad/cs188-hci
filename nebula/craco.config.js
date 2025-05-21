module.exports = {
    webpack: {
      configure: (config) => {
        // ① Add one rule that disables the fully‑specified check
        config.module.rules.push({
          test: /\.m?js$/,
          resolve: { fullySpecified: false },
          // Optional: limit the scope so only this library is affected
          // include: /node_modules\/react-pdf-highlighter-extended/,
        });
  
        return config;
      },
    },
  };
  