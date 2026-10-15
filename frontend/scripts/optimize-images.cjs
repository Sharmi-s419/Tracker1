const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'images');
const outDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const imageMappings = [
  {
    src: 'Hotel Lara International Facade.png',
    out: 'hotel-lara-facade-exterior.webp',
    width: 1600,
    quality: 90,
    sharpen: true,
  },
  {
    src: 'Hotel Lara International Facade.png',
    out: 'hotel-lara-hero.webp',
    width: 1920,
    quality: 92,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.48.48 PM.jpeg',
    out: 'hotel-lara-signage-entrance.webp',
    width: 1200,
    quality: 85,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.47.33 PM.jpeg',
    out: 'hotel-lara-deluxe-blue-room.webp',
    width: 1280,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.48.46 PM.jpeg',
    out: 'hotel-lara-deluxe-room-tv.webp',
    width: 1280,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.48.42 PM.jpeg',
    out: 'hotel-lara-executive-marble-room.webp',
    width: 1280,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.47.36 PM.jpeg',
    out: 'hotel-lara-standard-comfort-room.webp',
    width: 1200,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.47.41 PM.jpeg',
    out: 'hotel-lara-ensuite-bathroom-1.webp',
    width: 960,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.48.40 PM (1).jpeg',
    out: 'hotel-lara-ensuite-bathroom-2.webp',
    width: 1280,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.47.38 PM.jpeg',
    out: 'hotel-lara-kitchenette-pantry.webp',
    width: 960,
    quality: 85,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.47.28 PM.jpeg',
    out: 'hotel-lara-room-view-window.webp',
    width: 1200,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.48.35 PM.jpeg',
    out: 'hotel-lara-bedroom-suite-wide.webp',
    width: 1280,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'WhatsApp Image 2026-10-13 at 3.48.51 PM.jpeg',
    out: 'hotel-lara-exterior-day.webp',
    width: 1280,
    quality: 88,
    sharpen: true,
  },
  {
    src: 'Hotel Lara International Emblem.png',
    out: 'hotel-lara-emblem-original.webp',
    width: 1000,
    quality: 95,
  },
  {
    src: 'Lara International Luxury Hotel Logo.png',
    out: 'hotel-lara-logo-full.webp',
    width: 1000,
    quality: 95,
  }
];

async function run() {
  console.log('Starting optimization of images...');
  for (const item of imageMappings) {
    const inputPath = path.join(srcDir, item.src);
    const outputPath = path.join(outDir, item.out);
    try {
      let pipeline = sharp(inputPath);
      if (item.width) {
        pipeline = pipeline.resize({ width: item.width, withoutEnlargement: true });
      }
      if (item.sharpen) {
        pipeline = pipeline.sharpen();
      }
      pipeline = pipeline.modulate({
        brightness: 1.02,
        saturation: 1.05
      });
      await pipeline.webp({ quality: item.quality }).toFile(outputPath);
      const outStat = fs.statSync(outputPath);
      console.log(`✓ Optimized ${item.src} -> ${item.out} (${(outStat.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`✗ Error processing ${item.src}:`, e.message);
    }
  }
  console.log('Image optimization complete!');
}

run();
