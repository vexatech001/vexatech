
const envKey = '"-----BEGIN PRIVATE KEY-----\\nABC\\n-----END PRIVATE KEY-----"';
const result = envKey.replace(/\\n/g, "\n");
console.log('Result length:', result.length);
console.log('Starts with quote:', result.startsWith('"'));
console.log('Ends with quote:', result.endsWith('"'));
console.log('Cleaned:', result.replace(/^"(.*)"$/, '$1').replace(/\\n/g, '\n'));
