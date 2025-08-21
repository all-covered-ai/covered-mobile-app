import React from 'react';
import Svg, { Defs, Filter, FeGaussianBlur, FeOffset, FeFlood, FeComposite, FeMerge, FeMergeNode, G, Path, Line, Rect } from 'react-native-svg';

interface CoveredLogoProps {
  size?: number;
}

export const CoveredLogo: React.FC<CoveredLogoProps> = ({ 
  size = 64
}) => {
  // Calculate dimensions maintaining aspect ratio (200:220 = 10:11)
  const height = size * 1.1;
  
  return (
    <Svg 
      width={size} 
      height={height} 
      viewBox="0 0 200 220" 
      fill="none"
    >
      <Defs>
        <Filter 
          id="shadow" 
          x="-20%" 
          y="-20%" 
          width="140%" 
          height="140%"
        >
          <FeGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <FeOffset dx="3" dy="4" result="offsetblur"/>
          <FeFlood floodColor="#000000" floodOpacity="0.15"/>
          <FeComposite in2="offsetblur" operator="in"/>
          <FeMerge>
            <FeMergeNode/>
            <FeMergeNode in="SourceGraphic"/>
          </FeMerge>
        </Filter>
      </Defs>
      
      <G transform="translate(100, 110)" filter="url(#shadow)">
        {/* Left side with house cutout */}
        <Path
          d="M 0,-70
             L -50,-35
             C -60,-28 -65,-18 -65,-5
             L -65,40
             C -65,65 -50,80 -25,85
             L 0,90
             Z
             M -22,35 L 22,35 L 22,8 L 0,-15 L -22,8 Z"
          fill="#E968A8"
          fillRule="evenodd"
        />
        
        {/* Right side with house cutout */}
        <Path
          d="M 0,-70
             L 50,-35
             C 60,-28 65,-18 65,-5
             L 65,40
             C 65,65 50,80 25,85
             L 0,90
             Z
             M -22,35 L 22,35 L 22,8 L 0,-15 L -22,8 Z"
          fill="#D5569A"
          fillRule="evenodd"
        />
        
        {/* Center fold line */}
        <Line 
          x1="0" 
          y1="-70" 
          x2="0" 
          y2="90" 
          stroke="#C94890" 
          strokeWidth="0.5" 
          opacity="0.3"
        />
        
        {/* Small pink rectangle inside transparent house area */}
        <Rect 
          x="-4" 
          y="18" 
          width="8" 
          height="17" 
          fill="#E968A8"
        />
      </G>
    </Svg>
  );
};