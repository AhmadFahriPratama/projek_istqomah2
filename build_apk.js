const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== ISTIQOMAH STOCK APK BUILD PROCESS ===');

const stockDir = 'c:\\Users\\Administrator\\Desktop\\istiqomah stocks';
const androidDir = 'C:\\Users\\Administrator\\Desktop\\istqmh_price\\Istiqomah-Price\\android';
const assetsPublicDir = path.join(androidDir, 'app', 'src', 'main', 'assets', 'public');
const targetApk = path.join(stockDir, 'Istiqomahstock.apk');

// 1. Ensure target public directory exists
console.log('1. Syncing Web Assets to Android Assets...');
if (!fs.existsSync(assetsPublicDir)) {
  fs.mkdirSync(assetsPublicDir, { recursive: true });
}

// Copy web assets
const filesToCopy = [
  'index.html',
  'app.css',
  'app.js',
  'logo.svg',
  'icon-192.png',
  'icon-512.png',
  'manifest.json'
];

filesToCopy.forEach(file => {
  const src = path.join(stockDir, file);
  const dst = path.join(assetsPublicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`   - Copied: ${file}`);
  }
});

// Update strings.xml app name
const stringsPath = path.join(androidDir, 'app', 'src', 'main', 'res', 'values', 'strings.xml');
if (fs.existsSync(stringsPath)) {
  let stringsXml = fs.readFileSync(stringsPath, 'utf8');
  stringsXml = stringsXml.replace(/<string name="app_name">.*?<\/string>/, '<string name="app_name">Istiqomah Stock</string>');
  stringsXml = stringsXml.replace(/<string name="title_activity_main">.*?<\/string>/, '<string name="title_activity_main">Istiqomah Stock</string>');
  fs.writeFileSync(stringsPath, stringsXml, 'utf8');
  console.log('2. Updated app_name in strings.xml to "Istiqomah Stock"');
}

// 2. Build APK with Gradle using JDK 21
console.log('3. Running Gradle assembleRelease with JDK 21...');
const env = {
  ...process.env,
  JAVA_HOME: 'C:\\jdk21\\jdk-21.0.2',
  ANDROID_HOME: 'C:\\Android',
  PATH: `C:\\jdk21\\jdk-21.0.2\\bin;${process.env.PATH}`
};

try {
  execSync('cmd /c gradlew.bat assembleRelease --no-daemon', {
    cwd: androidDir,
    env: env,
    stdio: 'inherit'
  });
  console.log('4. Gradle assembleRelease build successful!');
} catch (err) {
  console.warn('Gradle assembleRelease error, running assembleDebug fallback...', err.message);
  execSync('cmd /c gradlew.bat assembleDebug --no-daemon', {
    cwd: androidDir,
    env: env,
    stdio: 'inherit'
  });
  console.log('4. Gradle assembleDebug build successful!');
}

// 3. Locate and copy output APK
const releaseApk = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
const releaseUnsignedApk = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release-unsigned.apk');
const debugApk = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');

let builtApk = null;
if (fs.existsSync(releaseApk)) {
  builtApk = releaseApk;
} else if (fs.existsSync(releaseUnsignedApk)) {
  builtApk = releaseUnsignedApk;
} else if (fs.existsSync(debugApk)) {
  builtApk = debugApk;
}

if (builtApk && fs.existsSync(builtApk)) {
  fs.copyFileSync(builtApk, targetApk);
  const stat = fs.statSync(targetApk);
  console.log(`\n=== APK BUILD COMPLETE ===`);
  console.log(`Output APK: ${targetApk}`);
  console.log(`File Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB (${stat.size} bytes)`);
} else {
  console.error('ERROR: No APK found in outputs directory.');
  process.exit(1);
}
