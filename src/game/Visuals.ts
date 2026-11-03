/**
 * High-Fidelity Canvas Rendering Utilities for Magic Survival
 * Renders the Archmage with dynamic cape physics, 8-directional celestial spear wings,
 * the massive Void Colossus Titan with molten veins, demons, and lighting effects.
 */

export class VisualRenderer {
  // Renders the 8-directional radiant arcane spear wings from Vincent's mockup
  public static renderCelestialSpearWings(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rotation: number,
    power: number
  ) {
    ctx.save();
    ctx.translate(x, y);

    const time = performance.now() * 0.002;
    const pulse = Math.sin(time * 3) * 0.15 + 1;

    // Glowing ground sigil beneath wings
    ctx.save();
    ctx.rotate(rotation * 0.3);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 20;
    ctx.lineWidth = 2.5;

    // Outer geometric circles
    ctx.beginPath();
    ctx.arc(0, 0, 90 * pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 130 * pulse, 0, Math.PI * 2);
    ctx.stroke();

    // Runic diamond lines
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 130 * pulse, Math.sin(a) * 130 * pulse);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * 80 * pulse, Math.sin(a + Math.PI / 4) * 80 * pulse);
      ctx.stroke();
    }
    ctx.restore();

    // 8 Radiant Ethereal Spear Wings
    // 4 Primary large wings (diagonals) + 4 secondary wings (cardinals)
    const wings = [
      { angle: -Math.PI / 4, length: 180, width: 32, primary: true }, // Upper Right
      { angle: (-3 * Math.PI) / 4, length: 180, width: 32, primary: true }, // Upper Left
      { angle: (3 * Math.PI) / 4, length: 170, width: 30, primary: true }, // Lower Left
      { angle: Math.PI / 4, length: 170, width: 30, primary: true }, // Lower Right
      { angle: 0, length: 120, width: 22, primary: false }, // Right
      { angle: -Math.PI / 2, length: 130, width: 24, primary: false }, // Top
      { angle: Math.PI, length: 120, width: 22, primary: false }, // Left
      { angle: Math.PI / 2, length: 120, width: 22, primary: false }, // Bottom
    ];

    ctx.globalCompositeOperation = 'lighter';

    for (const w of wings) {
      ctx.save();
      ctx.rotate(w.angle + Math.sin(time * 2 + w.angle) * 0.05);

      const len = w.length * pulse * power;
      const wid = w.width * pulse;

      // Outer Cyan Energy Glow
      const grad = ctx.createLinearGradient(0, 0, len, 0);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
      grad.addColorStop(0.6, 'rgba(14, 165, 233, 0.8)');
      grad.addColorStop(0.9, 'rgba(99, 102, 241, 0.6)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 25;

      // Intricate crystalline spear blade shape
      ctx.beginPath();
      ctx.moveTo(25, 0);
      ctx.lineTo(len * 0.4, -wid * 0.6);
      ctx.lineTo(len * 0.75, -wid * 0.25);
      ctx.lineTo(len, 0); // Tip
      ctx.lineTo(len * 0.75, wid * 0.25);
      ctx.lineTo(len * 0.4, wid * 0.6);
      ctx.closePath();
      ctx.fill();

      // Bright white inner core energy beam
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.lineTo(len * 0.5, -wid * 0.2);
      ctx.lineTo(len * 0.9, 0);
      ctx.lineTo(len * 0.5, wid * 0.2);
      ctx.closePath();
      ctx.fill();

      // Energy diamond at spear head
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.arc(len * 0.7, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }

  // Renders the Archmage Hero (matching the silver-haired mage in Vincent's mockup)
  public static renderArchmage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    isDashing: boolean
  ) {
    ctx.save();
    ctx.translate(x, y);

    const time = performance.now() * 0.003;

    // Casting light aura beneath feet
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 20;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 10, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dash trail / after-image
    if (isDashing) {
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 30;
      ctx.globalAlpha = 0.6;
    }

    // Facing direction
    ctx.rotate(angle);

    // Flowing Dark Longcoat with Cyan Runic Trim
    ctx.fillStyle = '#060a12';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-18, -16);
    ctx.lineTo(14, -10);
    ctx.lineTo(18, 0);
    ctx.lineTo(14, 10);
    ctx.lineTo(-18, 16);
    ctx.lineTo(-26 + Math.sin(time * 4) * 4, 0); // Cape flap
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dark Cuirass / Torso
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gold Runic Shoulder Pauldrons
    ctx.fillStyle = '#d4af37';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 8;
    ctx.fillRect(-6, -14, 10, 5);
    ctx.fillRect(-6, 9, 10, 5);

    // Iconic Silver Hair (matching portrait)
    ctx.fillStyle = '#e2e8f0';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(4, 0, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Hair wisps / locks
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(2, -9);
    ctx.lineTo(11, -3);
    ctx.lineTo(3, 0);
    ctx.lineTo(11, 3);
    ctx.lineTo(2, 9);
    ctx.fill();

    // Glowing Arcane Hands holding magic orbs
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(16, -12, 5, 0, Math.PI * 2);
    ctx.arc(16, 12, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Renders the massive Void Colossus Titan Boss (Top right of Vincent's mockup)
  public static renderVoidColossus(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    hp: number,
    maxHp: number,
    isHit: boolean
  ) {
    ctx.save();
    ctx.translate(x, y);

    const time = performance.now() * 0.002;
    const breathe = Math.sin(time * 2.5) * 4;

    // Ground scorched molten aura
    const groundGrad = ctx.createRadialGradient(0, 20, 20, 0, 20, 100);
    groundGrad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
    groundGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.15)');
    groundGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = groundGrad;
    ctx.beginPath();
    ctx.ellipse(0, 20, 100, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Massive Obsidian Shoulders & Torso
    ctx.shadowColor = isHit ? '#ffffff' : '#ef4444';
    ctx.shadowBlur = isHit ? 30 : 25;
    ctx.fillStyle = isHit ? '#ffffff' : '#140707';

    // Body silhouette
    ctx.beginPath();
    // Huge spiked obsidian shoulders
    ctx.moveTo(-65, -30 + breathe);
    ctx.lineTo(-45, -65);
    ctx.lineTo(-20, -45);
    ctx.lineTo(0, -50 + breathe);
    ctx.lineTo(20, -45);
    ctx.lineTo(45, -65);
    ctx.lineTo(65, -30 + breathe);
    ctx.lineTo(55, 30);
    ctx.lineTo(35, 55);
    ctx.lineTo(-35, 55);
    ctx.lineTo(-55, 30);
    ctx.closePath();
    ctx.fill();

    // Molten Magma Cracks & Glowing Veins (throbbing heat)
    if (!isHit) {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 15;

      ctx.beginPath();
      // Ribcage fissures
      ctx.moveTo(-35, -20);
      ctx.lineTo(-10, 5);
      ctx.lineTo(20, -25);
      ctx.moveTo(-25, 10);
      ctx.lineTo(0, 30);
      ctx.lineTo(30, 5);
      // Arm veins
      ctx.moveTo(-50, -10);
      ctx.lineTo(-40, 25);
      ctx.moveTo(50, -10);
      ctx.lineTo(40, 25);
      ctx.stroke();

      // Glowing Molten Heart Core
      ctx.fillStyle = '#fff7ed';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(0, 0 + breathe, 16, 0, Math.PI * 2);
      ctx.fill();

      // Demonic Fiery Horns
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      // Left horn
      ctx.moveTo(-25, -45);
      ctx.lineTo(-55, -85);
      ctx.lineTo(-15, -60);
      // Right horn
      ctx.moveTo(25, -45);
      ctx.lineTo(55, -85);
      ctx.lineTo(15, -60);
      ctx.fill();

      // Burning Demon Eyes
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(-12, -35, 4, 0, Math.PI * 2);
      ctx.arc(12, -35, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Boss Nameplate & Health Bar overhead
    const bw = 140;
    const bh = 10;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(-bw / 2, -105, bw, bh);

    const hpPct = Math.max(0, hp / maxHp);
    const hpGrad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    hpGrad.addColorStop(0, '#b91c1c');
    hpGrad.addColorStop(0.5, '#ef4444');
    hpGrad.addColorStop(1, '#f97316');
    ctx.fillStyle = hpGrad;
    ctx.fillRect(-bw / 2, -105, bw * hpPct, bh);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-bw / 2, -105, bw, bh);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px var(--font-cinzel), serif';
    ctx.textAlign = 'center';
    ctx.fillText('VOID COLOSSUS TITAN', 0, -112);

    ctx.restore();
  }

  // Renders animated demonic minions (Shadow Fiends & Hellcrawlers)
  public static renderDemonMinion(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: string,
    isFrozen: boolean,
    isHit: boolean
  ) {
    ctx.save();
    ctx.translate(x, y);

    const time = performance.now() * 0.004;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 8, 14, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isHit) {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
    } else if (isFrozen) {
      ctx.fillStyle = '#93c5fd';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
    } else if (type === 'hellhound') {
      ctx.fillStyle = '#ea580c';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 12;
    } else {
      ctx.fillStyle = '#1c1917';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 8;
    }

    // Spiky demon carapace
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();

    // Spikes & Horns
    ctx.fillStyle = isFrozen ? '#bae6fd' : '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(-12, -8);
    ctx.lineTo(-20, -22);
    ctx.lineTo(-4, -14);
    ctx.moveTo(12, -8);
    ctx.lineTo(20, -22);
    ctx.lineTo(4, -14);
    ctx.fill();

    // Glowing Eyes
    ctx.fillStyle = isFrozen ? '#ffffff' : '#fbbf24';
    ctx.shadowColor = isFrozen ? '#38bdf8' : '#ef4444';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-6, -4, 2.5, 0, Math.PI * 2);
    ctx.arc(6, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Renders the dramatic vertical blue arcane obelisk light beams
  public static renderObeliskBeams(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalCompositeOperation = 'lighter';

    const time = performance.now() * 0.002;
    const pulse = Math.sin(time * 4) * 0.2 + 0.8;

    // Vertical Blue Light Pillar shooting to sky
    const beamGrad = ctx.createLinearGradient(0, 0, 0, -500);
    beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
    beamGrad.addColorStop(0.3, 'rgba(14, 165, 233, 0.5)');
    beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

    ctx.fillStyle = beamGrad;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.moveTo(-16 * pulse, 0);
    ctx.lineTo(-4, -500);
    ctx.lineTo(4, -500);
    ctx.lineTo(16 * pulse, 0);
    ctx.closePath();
    ctx.fill();

    // Concentric base sigil rings
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 30 * pulse, 14 * pulse, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}
