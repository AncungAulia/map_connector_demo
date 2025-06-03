import React from 'react';
import { Node as NodeType } from '../types/MapTypes';

interface NodeProps {
  node: NodeType;
  isSelected: boolean;
  isVisited: boolean;
  isCurrent: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Node: React.FC<NodeProps> = ({
  node,
  isSelected,
  isVisited,
  isCurrent,
  onClick,
  disabled
}) => {
  const getNodeIcon = (type: NodeType['type']) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'building': return '🏢';
      case 'agriculture': return '🚜';
      case 'military': return '🪖';
      case 'port': return '⚓';
      case 'nature': return '🌲';
      case 'industrial': return '🏭';
      case 'hospital': return '🏥';
      case 'school': return '🏫';
      case 'mountain': return '⛰️';
      case 'desert': return '🏜️';
      case 'lake': return '🏞️';
      case 'bridge': return '🌉';
      case 'airport': return '✈️';
      case 'mall': return '🏬';
      case 'temple': return '⛩️';
      case 'castle': return '🏰';
      case 'mine': return '⛏️';
      case 'farm': return '🚜';
      case 'park': return '🌳';
      default: return '📍';
    }
  };

  const getNodeColor = () => {
    if (isCurrent) return '#fbbf24';
    if (isVisited) return '#10b981';
    if (isSelected) return '#3b82f6';
    return '#6b7280';
  };

  const getNodeBorderColor = () => {
    if (isCurrent) return '#f59e0b';
    if (isVisited) return '#059669';
    if (isSelected) return '#1d4ed8';
    return '#4b5563';
  };

  return (
    <g 
      className={`cursor-pointer transition-all duration-300 ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      {/* Node circle with glow effect */}
      <circle
        cx={node.x}
        cy={node.y}
        r="25"
        fill={getNodeColor()}
        stroke={getNodeBorderColor()}
        strokeWidth="3"
        className="drop-shadow-md"
        style={{
          filter: isCurrent ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))' : 
                  isVisited ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' : 
                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
        }}
      />
      
      {/* Node icon */}
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        fontSize="16"
        className="pointer-events-none"
      >
        {getNodeIcon(node.type)}
      </text>
      
      {/* Node label */}
      <text
        x={node.x}
        y={node.y - 35}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#374151"
        className="pointer-events-none"
      >
        {node.name}
      </text>
      
      {/* Selection indicator */}
      {isSelected && (
        <circle
          cx={node.x}
          cy={node.y}
          r="30"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      )}
      
      {/* Current node pulse animation */}
      {isCurrent && (
        <circle
          cx={node.x}
          cy={node.y}
          r="35"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="3"
          opacity="0.6"
          className="animate-ping"
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        />
      )}
    </g>
  );
};

export default Node;
