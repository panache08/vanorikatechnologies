const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

function drawLogo(bg, textColor, glowColor, filename) {
  const W = 600, H = 140;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const cx = 65, cy = H / 2, iconSize = 52;

  // Hexagon path
  function hexPath(x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      const px = x + r * Math.cos(angle);
      const py = y + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  // Hex gradient
  const hexGrad = ctx.createLinearGradient(cx - iconSize/2, cy - iconSize/2, cx + iconSize/2, cy + iconSize/2);
  hexGrad.addColorStop(0, '#2563EB');
  hexGrad.addColorStop(1, '#06B6D4');
  hexPath(cx, cy, iconSize / 2);
  ctx.fillStyle = hexGrad;
  ctx.fill();

  // Hex stroke
  hexPath(cx, cy, iconSize / 2);
  ctx.strokeStyle = 'rgba(6,182,212,0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Lightning bolt
  const bw = 18, bh = 32;
  const bx = cx - bw * 0.3, by = cy - bh / 2;
  ctx.beginPath();
  ctx.moveTo(bx + bw * 0.65, by);
  ctx.lineTo(bx, by + bh * 0.45);
  ctx.lineTo(bx + bw * 0.45, by + bh * 0.45);
  ctx.lineTo(bx - bw * 0.05, by + bh);
  ctx.lineTo(bx + bw * 0.95, by + bh * 0.52);
  ctx.lineTo(bx + bw * 0.52, by + bh * 0.52);
  ctx.closePath();
  const boltGrad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
  boltGrad.addColorStop(0, '#FFFFFF');
  boltGrad.addColorStop(1, '#93C5FD');
  ctx.fillStyle = boltGrad;
  ctx.fill();

  // Text
  const textX = cx + iconSize / 2 + 20;

  // Company name
  ctx.fillStyle = textColor;
  ctx.font = 'bold 26px Arial';
  ctx.fillText('PANASHE TECH', textX, cy - 4);

  // Solutions gradient
  const tagGrad = ctx.createLinearGradient(textX, 0, textX + 180, 0);
  tagGrad.addColorStop(0, '#2563EB');
  tagGrad.addColorStop(1, '#06B6D4');
  ctx.fillStyle = tagGrad;
  ctx.font = '400 13px Arial';
  ctx.fillText('S O L U T I O N S', textX + 2, cy + 16);

  // Divider
  ctx.strokeStyle = 'rgba(37,99,235,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(textX, cy + 25);
  ctx.lineTo(textX + 230, cy + 25);
  ctx.stroke();

  // Tagline
  ctx.fillStyle = 'rgba(148,163,184,0.5)';
  ctx.font = '300 10px Arial';
  ctx.fillText('HARARE  ·  ZIMBABWE', textX + 2, cy + 38);

  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log('✅ Saved:', filePath);
}

// Try using canvas package
try {
  drawLogo('#0A2540', '#FFFFFF', '#06B6D4', 'logo-dark.png');
  drawLogo('#000000', '#FFFFFF', '#2563EB', 'logo-black.png');
  drawLogo('#FFFFFF', '#0A2540', '#2563EB', 'logo-light.png');
  console.log('\n✅ All logos generated in public/images/');
} catch (e) {
  console.error('canvas package not available:', e.message);
  console.log('Logos will be embedded as SVG in the website instead.');
}
