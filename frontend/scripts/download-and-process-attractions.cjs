const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'attractions');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const attractions = [
  {
    id: 'thanumalayan-temple-suchindram',
    name: 'Thanumalayan Temple, Suchindram',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Suchindram_Thanumalayan_Temple_2014_%2823%29.jpg',
    attribution: 'Wikimedia Commons / CC BY-SA 4.0 / Suchindram Thanumalayan Temple',
  },
  {
    id: 'iskcon-temple-kanyakumari',
    name: 'ISKCON Temple, Kanyakumari',
    url: 'https://www.iskconkanyakumari.com/logos/kanyakumari/third.jpg',
    attribution: 'ISKCON Kanyakumari (Sri Sri Radha Madhav Temple)',
  },
  {
    id: 'kanyakumari-beach-triveni-sangam',
    name: 'Kanyakumari Beach & Triveni Sangam',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Sunrise_at_Kanyakumari_beach_02.jpg',
    attribution: 'Wikimedia Commons / CC BY-SA 3.0 / Sunrise at Kanyakumari beach',
  },
  {
    id: 'vivekananda-rock-memorial',
    name: 'Vivekananda Rock Memorial',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Vivekananda_Rock_Memorial%2C_Kanyakumari%2C_India_2.jpg',
    attribution: 'Wikimedia Commons / CC BY-SA 4.0 / Vivekananda Rock Memorial',
  },
  {
    id: 'nagercoil-junction-railway-station',
    name: 'Nagercoil Junction Railway Station',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Nagercoil_junction_railway_station.jpg',
    attribution: 'Wikimedia Commons / CC BY-SA 4.0 / Nagercoil Junction',
  },
  {
    id: 'padmanabhapuram-palace',
    name: 'Padmanabhapuram Palace',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Clock_Tower_Padmanabhapuram_Palace_Mar24_A7C_10102.jpg',
    attribution: 'Wikimedia Commons / CC BY-SA 4.0 / Padmanabhapuram Palace Clock Tower',
  },
  {
    id: 'thiruvananthapuram-international-airport',
    name: 'Thiruvananthapuram International Airport (TRV)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Trivandrum_International_airport.jpg',
    attribution: 'Wikimedia Commons / CC BY-SA 3.0 / Trivandrum International Airport Terminal',
  },
];

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HotelLara/1.0 (tourism-showcase)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, url).href;
        return resolve(downloadFile(redirectUrl));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout fetching ${url}`)); });
  });
}

async function processAll() {
  console.log('Downloading and optimizing 7 real destination photos for Hotel Lara International...');
  for (const item of attractions) {
    try {
      console.log(`\nFetching ${item.name} from: ${item.url}`);
      const rawBuffer = await downloadFile(item.url);
      console.log(`Downloaded ${rawBuffer.length} bytes for ${item.id}`);

      const outPath = path.join(targetDir, `${item.id}.webp`);
      
      // Process with Sharp to 800x500 WebP with high quality
      await sharp(rawBuffer)
        .resize(800, 500, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 86, effort: 6 })
        .toFile(outPath);

      const stats = fs.statSync(outPath);
      console.log(`Saved ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error processing ${item.id}:`, err.message);
    }
  }
  console.log('\nAll attraction images processed successfully!');
}

processAll();
