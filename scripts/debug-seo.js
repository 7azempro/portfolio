const pkg = require('sanity-plugin-seo-pane');
console.log('Type of package:', typeof pkg);
console.log('Keys:', Object.keys(pkg));
if (typeof pkg === 'function') console.log('Package is a function (Default Export)');
if (pkg.seoPane) console.log('seoPane named export exists:', typeof pkg.seoPane);
