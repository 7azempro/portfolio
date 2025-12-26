const pkg = require('sanity-plugin-seo-pane');
console.log('Type of pkg:', typeof pkg);
console.log('Keys:', Object.keys(pkg));
if (typeof pkg === 'function') console.log('pkg is a function (React Component?)');
if (pkg.default) console.log('Has default export');
if (pkg.SeoPane) console.log('Has SeoPane export');
