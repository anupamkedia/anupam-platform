'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Palette, RotateCcw, Download, ArrowRight } from 'lucide-react';

const rooms = [
  { id: 'living', name: 'Living Room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
  { id: 'bedroom', name: 'Bedroom', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80' },
  { id: 'kitchen', name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { id: 'exterior', name: 'Exterior', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
];

const colorFamilies = [
  { name: 'Whites & Neutrals', colors: ['#FFFFFF', '#F5F5DC', '#FFF8DC', '#FFFAF0', '#F0EAD6', '#E8DCC8', '#D2B48C', '#C4A882'] },
  { name: 'Blues', colors: ['#E6F3FF', '#B3D9FF', '#6BB3FF', '#3399FF', '#0066CC', '#004C99', '#003366', '#1A365D'] },
  { name: 'Greens', colors: ['#E6FFE6', '#B3FFB3', '#66CC66', '#339933', '#006600', '#2D5F2D', '#4A7C59', '#8FBC8F'] },
  { name: 'Yellows & Golds', colors: ['#FFFDE6', '#FFF9B3', '#FFE066', '#FFD700', '#FFC300', '#DAA520', '#B8860B', '#CD853F'] },
  { name: 'Reds & Terracotta', colors: ['#FFE6E6', '#FFB3B3', '#FF6666', '#CC3333', '#990000', '#8B4513', '#A0522D', '#CD5C5C'] },
  { name: 'Purples & Lavenders', colors: ['#F3E6FF', '#D9B3FF', '#B366FF', '#8833FF', '#6600CC', '#9370DB', '#DDA0DD', '#E6E6FA'] },
  { name: 'Pinks', colors: ['#FFE6F0', '#FFB3D1', '#FF66A3', '#FF3385', '#CC0066', '#DB7093', '#FFB6C1', '#FFC0CB'] },
  { name: 'Greys', colors: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#303030'] },
];

export default function ColorVisualizerPage() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [selectedColor, setSelectedColor] = useState('#E6F3FF');
  const [activeFamily, setActiveFamily] = useState(0);

  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white py-16 md:py-20">
        <div className="container-wide px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Colour Visualizer</h1>
          <p className="text-lg text-white/80 max-w-2xl">See how different colours transform your walls. Select a room, pick a colour, and visualize instantly.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Room Preview */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={selectedRoom.img} alt={selectedRoom.name} className="w-full h-[400px] md:h-[500px] object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: selectedColor, mixBlendMode: 'multiply', opacity: 0.4 }} />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
                  {selectedRoom.name} · {selectedColor}
                </div>
              </div>
              {/* Room selector */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {rooms.map(room => (
                  <button key={room.id} onClick={() => setSelectedRoom(room)}
                    className={`shrink-0 rounded-xl overflow-hidden border-3 transition ${selectedRoom.id === room.id ? 'border-purple-500 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <img src={room.img} alt={room.name} className="w-24 h-16 object-cover" />
                    <div className="text-xs font-medium text-center py-1 bg-gray-50">{room.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Palette size={20} className="text-purple-500" /> Pick a Colour</h3>

                {/* Selected color preview */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-xl">
                  <div className="w-14 h-14 rounded-xl shadow-inner border border-gray-200" style={{ backgroundColor: selectedColor }} />
                  <div>
                    <div className="font-mono text-sm font-medium text-gray-800">{selectedColor}</div>
                    <div className="text-xs text-gray-500">Selected Shade</div>
                  </div>
                </div>

                {/* Color families */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {colorFamilies.map((fam, i) => (
                    <button key={fam.name} onClick={() => setActiveFamily(i)}
                      className={`text-xs px-2.5 py-1 rounded-full transition ${activeFamily === i ? 'bg-purple-500 text-white' : 'bg-white text-gray-600 hover:bg-purple-50'}`}>
                      {fam.name}
                    </button>
                  ))}
                </div>

                {/* Color swatches */}
                <div className="grid grid-cols-8 gap-1.5">
                  {colorFamilies[activeFamily].colors.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)}
                      className={`w-full aspect-square rounded-lg border-2 transition hover:scale-110 ${selectedColor === color ? 'border-purple-500 ring-2 ring-purple-300 scale-110' : 'border-gray-200'}`}
                      style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>

                {/* Custom color */}
                <div className="mt-4">
                  <label className="text-xs text-gray-500 mb-1 block">Custom Colour</label>
                  <div className="flex gap-2">
                    <input type="color" value={selectedColor} onChange={e => setSelectedColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                    <input type="text" value={selectedColor} onChange={e => setSelectedColor(e.target.value)} className="input-field flex-1 font-mono text-sm !py-2" />
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 mt-6">
                  <button onClick={() => setSelectedColor('#FFFFFF')} className="btn-outline w-full text-sm"><RotateCcw size={14} className="mr-2" /> Reset Colour</button>
                  <Link href="/home-painting" className="btn-primary w-full text-sm text-center block"><ArrowRight size={14} className="mr-2 inline" /> Get Painting Quote</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
