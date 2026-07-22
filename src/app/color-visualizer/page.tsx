'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Paintbrush, RotateCcw, Download, Share2 } from 'lucide-react';

const rooms = [
  { id: 'living', name: 'Living Room', walls: [{ id: 'wall1', path: 'M50,50 L350,50 L350,300 L50,300 Z', label: 'Main Wall' }, { id: 'wall2', path: 'M370,70 L550,130 L550,310 L370,300 Z', label: 'Side Wall' }] },
  { id: 'bedroom', name: 'Bedroom', walls: [{ id: 'wall1', path: 'M50,50 L380,50 L380,300 L50,300 Z', label: 'Back Wall' }, { id: 'wall2', path: 'M400,70 L560,130 L560,300 L400,300 Z', label: 'Side Wall' }] },
  { id: 'kitchen', name: 'Kitchen', walls: [{ id: 'wall1', path: 'M50,50 L350,50 L350,300 L50,300 Z', label: 'Wall' }] },
];

const shadeGroups = [
  { name: 'Whites & Creams', shades: [
    { code: 'AP-001', name: 'Arctic White', hex: '#FFFFFF' }, { code: 'AP-002', name: 'Ivory Cream', hex: '#FFFFF0' },
    { code: 'AP-003', name: 'Pearl White', hex: '#F5F5F0' }, { code: 'AP-004', name: 'Soft Linen', hex: '#FAF0E6' },
    { code: 'AP-005', name: 'Warm Bisque', hex: '#FFE4C4' },
  ]},
  { name: 'Blues', shades: [
    { code: 'AP-101', name: 'Sky Blue', hex: '#87CEEB' }, { code: 'AP-102', name: 'Ocean Mist', hex: '#B0C4DE' },
    { code: 'AP-103', name: 'Royal Blue', hex: '#4169E1' }, { code: 'AP-104', name: 'Powder Blue', hex: '#B0E0E6' },
    { code: 'AP-105', name: 'Navy Night', hex: '#2C3E6B' },
  ]},
  { name: 'Greens', shades: [
    { code: 'AP-201', name: 'Sage Garden', hex: '#9DC183' }, { code: 'AP-202', name: 'Mint Fresh', hex: '#98FB98' },
    { code: 'AP-203', name: 'Olive Grove', hex: '#808000' }, { code: 'AP-204', name: 'Forest Green', hex: '#228B22' },
    { code: 'AP-205', name: 'Emerald', hex: '#50C878' },
  ]},
  { name: 'Pinks & Reds', shades: [
    { code: 'AP-301', name: 'Blush Rose', hex: '#FFB6C1' }, { code: 'AP-302', name: 'Dusty Rose', hex: '#DCAE96' },
    { code: 'AP-303', name: 'Coral Reef', hex: '#FF7F50' }, { code: 'AP-304', name: 'Crimson', hex: '#DC143C' },
    { code: 'AP-305', name: 'Berry Wine', hex: '#722F37' },
  ]},
  { name: 'Yellows & Golds', shades: [
    { code: 'AP-401', name: 'Sunshine', hex: '#FFDB58' }, { code: 'AP-402', name: 'Butter Cream', hex: '#FFFDD0' },
    { code: 'AP-403', name: 'Golden Sand', hex: '#F0C05A' }, { code: 'AP-404', name: 'Mustard', hex: '#E1AD01' },
    { code: 'AP-405', name: 'Amber Glow', hex: '#FFBF00' },
  ]},
  { name: 'Greys & Neutrals', shades: [
    { code: 'AP-501', name: 'Silver Grey', hex: '#C0C0C0' }, { code: 'AP-502', name: 'Smoky Grey', hex: '#848884' },
    { code: 'AP-503', name: 'Charcoal', hex: '#36454F' }, { code: 'AP-504', name: 'Taupe', hex: '#B38B6D' },
    { code: 'AP-505', name: 'Mocha', hex: '#967969' },
  ]},
  { name: 'Purples', shades: [
    { code: 'AP-601', name: 'Lavender', hex: '#E6E6FA' }, { code: 'AP-602', name: 'Lilac', hex: '#C8A2C8' },
    { code: 'AP-603', name: 'Plum', hex: '#8E4585' }, { code: 'AP-604', name: 'Mauve', hex: '#E0B0FF' },
    { code: 'AP-605', name: 'Deep Purple', hex: '#673AB7' },
  ]},
];

export default function ColorVisualizerPage() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [wallColors, setWallColors] = useState<Record<string, string>>({});
  const [selectedWall, setSelectedWall] = useState(rooms[0].walls[0].id);
  const [activeGroup, setActiveGroup] = useState(shadeGroups[0].name);

  const applyColor = (hex: string) => {
    setWallColors({ ...wallColors, [selectedWall]: hex });
  };

  const reset = () => setWallColors({});

  return (
    <>
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 md:py-16">
        <div className="container-wide px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Colour Visualizer</h1>
          <p className="text-white/70">See how different colours look on your walls before painting.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Room View */}
            <div className="lg:col-span-2">
              <div className="flex gap-2 mb-4">
                {rooms.map(room => (
                  <button key={room.id} onClick={() => { setSelectedRoom(room); setSelectedWall(room.walls[0].id); setWallColors({}); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedRoom.id === room.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {room.name}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 relative">
                <svg viewBox="0 0 600 350" className="w-full h-auto">
                  {/* Floor */}
                  <polygon points="50,300 370,300 560,320 0,320" fill="#D4A76A" opacity="0.3" />
                  {/* Walls */}
                  {selectedRoom.walls.map(wall => (
                    <g key={wall.id} onClick={() => setSelectedWall(wall.id)} className="cursor-pointer">
                      <path d={wall.path} fill={wallColors[wall.id] || '#E8E4DF'} stroke={selectedWall === wall.id ? '#8B5CF6' : '#CCC'} strokeWidth={selectedWall === wall.id ? 3 : 1} />
                      {/* Window or door placeholder */}
                      {wall.id === 'wall1' && <rect x="150" y="80" width="100" height="80" rx="4" fill="rgba(135,206,235,0.3)" stroke="#AAA" />}
                    </g>
                  ))}
                  {/* Furniture hints */}
                  <rect x="80" y="220" width="200" height="70" rx="8" fill="#8B7355" opacity="0.4" />
                  <rect x="100" y="200" width="50" height="30" rx="4" fill="#A0522D" opacity="0.3" />
                </svg>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    {selectedRoom.walls.map(wall => (
                      <button key={wall.id} onClick={() => setSelectedWall(wall.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg border-2 transition ${selectedWall === wall.id ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500'}`}>
                        <span className="inline-block w-3 h-3 rounded mr-1.5" style={{ backgroundColor: wallColors[wall.id] || '#E8E4DF', border: '1px solid #ccc' }} />
                        {wall.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={reset} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
                </div>
              </div>
            </div>

            {/* Shade Picker */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Paintbrush size={18} className="text-purple-500" /> Pick a Colour</h3>
              <p className="text-xs text-gray-500 mb-3">Select a wall on the left, then click a shade below.</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {shadeGroups.map(g => (
                  <button key={g.name} onClick={() => setActiveGroup(g.name)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg transition ${activeGroup === g.name ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {g.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {shadeGroups.find(g => g.name === activeGroup)?.shades.map(shade => (
                  <button key={shade.code} onClick={() => applyColor(shade.hex)}
                    className="group flex flex-col items-center" title={shade.name}>
                    <div className="w-10 h-10 rounded-lg shadow-sm border border-gray-200 group-hover:ring-2 group-hover:ring-purple-500 group-hover:scale-110 transition"
                      style={{ backgroundColor: shade.hex }} />
                    <span className="text-[9px] text-gray-400 mt-1 truncate w-full text-center">{shade.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                <h4 className="font-bold text-purple-800 text-sm mb-2">Like these colours?</h4>
                <p className="text-xs text-purple-600 mb-3">Get a free quote for your home painting project.</p>
                <Link href="/home-painting#enquiry" className="btn-primary w-full text-center text-sm">Get Free Quote</Link>
              </div>

              <div className="mt-4 flex gap-2">
                <Link href="/shade-card" className="btn-outline text-xs flex-1 text-center">Full Shade Card</Link>
                <Link href="/calculator" className="btn-outline text-xs flex-1 text-center">Paint Calculator</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
