import { ArenaRealm } from '../types/game';

export const ARENAS_LIST: ArenaRealm[] = [
  {
    id: 'astral_sanctuary',
    name: 'Astral Sanctuary',
    subtitle: 'The Floating Cosmic Dais',
    description: 'An ancient stone dais suspended in the starlit void. Sacred blue arcane runes amplify celestial magic.',
    ambientColor: '#0a101f',
    ringColor: 'rgba(56, 189, 248, 0.65)',
    sigilColor: '#38bdf8',
    primaryWeather: 'snow',
    hazardDescription: 'Void rift edges pull unstable dimensional anomalies.',
    unlocked: true,
  },
  {
    id: 'infernal_abyss',
    name: 'Infernal Abyss',
    subtitle: 'The Molten Brimstone Caldera',
    description: 'A shattered volcanic crag suspended above seas of churning magma. The air boils with brimstone and embers.',
    ambientColor: '#1a0808',
    ringColor: 'rgba(239, 68, 68, 0.75)',
    sigilColor: '#f97316',
    primaryWeather: 'embers',
    hazardDescription: 'Scorching magma fissures erupt with periodic shockwaves.',
    unlocked: true,
  },
  {
    id: 'glacial_citadel',
    name: 'Glacial Citadel',
    subtitle: 'Ruins of Niflheim',
    description: 'Crystalline ancient frost columns buried beneath a permafrost glacier. Howling winds chill living souls.',
    ambientColor: '#06131f',
    ringColor: 'rgba(186, 230, 253, 0.7)',
    sigilColor: '#7dd3fc',
    primaryWeather: 'snow',
    hazardDescription: 'Slick ice reduces deceleration but increases frost spell potency by 35%.',
    unlocked: true,
  },
  {
    id: 'void_crypt',
    name: 'Void Crypt',
    subtitle: 'The Nether Catacombs',
    description: 'Corrupted eldritch mausoleum where physical reality dissolves into the gaping cosmic maw of the abyss.',
    ambientColor: '#12071f',
    ringColor: 'rgba(168, 85, 247, 0.75)',
    sigilColor: '#c084fc',
    primaryWeather: 'blood_rain',
    hazardDescription: 'Abyssal blood rain accelerates demonic movement velocity by 15%.',
    unlocked: true,
  },
];

export class ArenaRenderer {
  public static renderArenaBase(
    ctx: CanvasRenderingContext2D,
    arena: ArenaRealm,
    radius: number
  ) {
    ctx.save();

    // 1. Cosmic Void / Abyss Backdrop
    const grad = ctx.createRadialGradient(0, 0, 100, 0, 0, radius * 1.5);
    grad.addColorStop(0, arena.ambientColor);
    grad.addColorStop(0.7, '#020306');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(-radius * 2, -radius * 2, radius * 4, radius * 4);

    // 2. Circular Stone Platform
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = arena.id === 'infernal_abyss' ? '#180c0c' : arena.id === 'glacial_citadel' ? '#081726' : '#0f172a';
    ctx.fill();

    // Stone paving rings
    ctx.strokeStyle = arena.id === 'infernal_abyss' ? '#331212' : arena.id === 'glacial_citadel' ? '#13283d' : '#1e293b';
    ctx.lineWidth = 3;
    for (let r = 180; r < radius; r += 130) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial spokes
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(ang) * 180, Math.sin(ang) * 180);
      ctx.lineTo(Math.cos(ang) * radius, Math.sin(ang) * radius);
      ctx.stroke();
    }

    // Volcanic fissures for Infernal Abyss
    if (arena.id === 'infernal_abyss') {
      ctx.strokeStyle = '#f97316';
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-250, -120);
      ctx.lineTo(-120, -50);
      ctx.lineTo(80, -90);
      ctx.lineTo(260, -30);
      ctx.moveTo(-180, 150);
      ctx.lineTo(0, 120);
      ctx.lineTo(200, 180);
      ctx.stroke();
    }

    // Glowing Runic Perimeter Rim
    ctx.strokeStyle = arena.ringColor;
    ctx.shadowColor = arena.sigilColor;
    ctx.shadowBlur = 20;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, radius - 4, 0, Math.PI * 2);
    ctx.stroke();

    // Floating Pillars around boundary
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      const px = Math.cos(ang) * (radius + 110);
      const py = Math.sin(ang) * (radius + 110);

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(ang);
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = arena.ringColor;
      ctx.lineWidth = 2;
      ctx.fillRect(-18, -35, 36, 70);
      ctx.strokeRect(-18, -35, 36, 70);

      // Glowing rune crystal inside pillar
      ctx.fillStyle = arena.sigilColor;
      ctx.shadowColor = arena.sigilColor;
      ctx.shadowBlur = 12;
      ctx.fillRect(-4, -15, 8, 30);
      ctx.restore();
    }

    ctx.restore();
  }
}
