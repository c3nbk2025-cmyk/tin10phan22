import React, { useState, useRef } from 'react';
import Button from './Button';
import { playSound } from '../soundService';
import { Gift, Sparkles } from 'lucide-react';

interface WheelProps {
  onSpinEnd: (prize: string) => void;
}

const PRIZES = [
  { label: "+10 Điểm", color: "#FF6B6B" },
  { label: "Huy hiệu Vàng", color: "#4ECDC4" },
  { label: "+50 Điểm", color: "#FFE66D" },
  { label: "Chúc may mắn", color: "#FF9F43" },
  { label: "+20 Điểm", color: "#54A0FF" },
  { label: "X2 Điểm", color: "#5F27CD" },
];

const Wheel: React.FC<WheelProps> = ({ onSpinEnd }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const newRotation = rotation + 1800 + Math.random() * 360; // At least 5 full spins
    setRotation(newRotation);

    // Simulate clicking sound while spinning
    let clickCount = 0;
    const clickInterval = setInterval(() => {
        clickCount++;
        playSound('spin');
        if(clickCount > 20) clearInterval(clickInterval);
    }, 100);

    setTimeout(() => {
      setIsSpinning(false);
      playSound('win');
      
      const degrees = newRotation % 360;
      const sectorSize = 360 / PRIZES.length;
      // Adjust logic because wheel pointer is usually at top (270deg) or right (0deg).
      // Assuming pointer is at Top. CSS transform rotates clockwise.
      // Top is 0 visual if we don't offset. Let's assume index 0 is at top initially.
      // The logic requires inverse mapping. 
      // Simple approximation for demo:
      const prizeIndex = Math.floor(((360 - degrees) % 360) / sectorSize);
      onSpinEnd(PRIZES[prizeIndex].label);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-72 h-72 md:w-96 md:h-96 mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 text-4xl">
          🔻
        </div>
        
        {/* Wheel */}
        <div 
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden transition-transform cubic-bezier(0.25, 0.1, 0.25, 1)"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: '3s'
          }}
        >
          {PRIZES.map((prize, index) => {
            const rotate = (360 / PRIZES.length) * index;
            return (
              <div 
                key={index}
                className="absolute w-full h-full top-0 left-0 flex items-start justify-center pt-4 text-white font-bold"
                style={{
                  backgroundColor: prize.color,
                  transform: `rotate(${rotate}deg)`,
                  clipPath: 'polygon(50% 50%, 0 0, 100% 0)' // Simple wedge approximation, better with SVG but this works for CSS visualization
                }}
              >
                <span className="mt-8 -rotate-90 md:-rotate-0" style={{ transform: `rotate(${-rotate}deg)` }}>
                   {/* Text rendering inside wedge is tricky with pure CSS clip-path, using a simplified dot for now if text fails, but let's try just span */}
                </span>
              </div>
            );
          })}
          {/* SVG Overlay for better segments */}
           <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {PRIZES.map((prize, index) => {
                 const angle = 360 / PRIZES.length;
                 const startAngle = index * angle;
                 const endAngle = (index + 1) * angle;
                 // Convert polar to cartesian
                 const x1 = 50 + 50 * Math.cos(Math.PI * (startAngle - 90) / 180);
                 const y1 = 50 + 50 * Math.sin(Math.PI * (startAngle - 90) / 180);
                 const x2 = 50 + 50 * Math.cos(Math.PI * (endAngle - 90) / 180);
                 const y2 = 50 + 50 * Math.sin(Math.PI * (endAngle - 90) / 180);
                 
                 return (
                    <path 
                        key={index}
                        d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                        fill={prize.color}
                        stroke="white"
                        strokeWidth="1"
                    />
                 )
            })}
             {/* Text labels */}
             {PRIZES.map((prize, index) => {
                 const angle = (index * (360 / PRIZES.length) + (360 / PRIZES.length)/2) - 90;
                 const rad = angle * (Math.PI / 180);
                 const tx = 50 + 35 * Math.cos(rad);
                 const ty = 50 + 35 * Math.sin(rad);
                 return (
                     <text 
                        key={`text-${index}`}
                        x={tx} 
                        y={ty} 
                        fill="white" 
                        fontSize="6" 
                        fontWeight="bold"
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        transform={`rotate(${angle + 90}, ${tx}, ${ty})`}
                     >
                         {prize.label}
                     </text>
                 )
             })}
          </svg>
        </div>
        
        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-xl">
          ⭐️
        </div>
      </div>

      <Button onClick={spin} disabled={isSpinning} className="text-xl px-12 py-4">
        {isSpinning ? 'Đang quay...' : 'QUAY NGAY! 🎲'}
      </Button>
    </div>
  );
};

export default Wheel;
