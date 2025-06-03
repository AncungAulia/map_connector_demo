import { MapData, Node as NodeType } from "../types/MapTypes";
import Node from "./Node";

interface MapVisualizationProps {
  mapData: MapData;
  selectedNodes: string[];
  visitedNodes: Set<string>;
  currentNode: string;
  onNodeClick: (nodeId: string) => void;
  isRunning: boolean;
}

const MapVisualization: React.FC<MapVisualizationProps> = ({
  mapData,
  selectedNodes,
  visitedNodes,
  currentNode,
  onNodeClick,
  isRunning,
}) => {
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    const processedPairs = new Set<string>();

    mapData.nodes.forEach((node) => {
      node.connections.forEach((connectedId) => {
        const pairKey = [node.id, connectedId].sort().join("-");
        if (processedPairs.has(pairKey)) return;
        processedPairs.add(pairKey);

        const connectedNode = mapData.nodes.find((n) => n.id === connectedId);
        if (!connectedNode) return;

        const isActive =
          visitedNodes.has(node.id) && visitedNodes.has(connectedId);

        connections.push(
          <line
            key={pairKey}
            x1={node.x}
            y1={node.y}
            x2={connectedNode.x}
            y2={connectedNode.y}
            stroke={isActive ? "#059669" : "#8b4513"}
            strokeWidth={isActive ? "4" : "3"}
            strokeDasharray={isActive ? "0" : "8,4"}
            className="transition-all duration-500"
            style={{
              filter: isActive ? "drop-shadow(0 0 4px #10b981)" : "none",
            }}
          />
        );
      });
    });

    return connections;
  };

  return (
    <div className="relative w-full rounded-lg border-4 border-gray-400 overflow-hidden shadow-2xl">
      <svg
        width="100%"
        height="540"
        viewBox="0 0 600 500"
        className="drop-shadow-lg"
      >
        {/* Background Gradients */}
        <defs>
          {/* Ocean Gradient */}
          <radialGradient id="oceanGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </radialGradient>

          {/* Island Gradient - Expanded */}
          <radialGradient id="islandGradient" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="30%" stopColor="#16a34a" />
            <stop offset="55%" stopColor="#15803d" />
            <stop offset="75%" stopColor="#fbbf24" />
            <stop offset="90%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </radialGradient>

          {/* Water Wave Pattern */}
          <pattern
            id="waves"
            x="0"
            y="0"
            width="40"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,10 Q10,5 20,10 T40,10"
              stroke="#38bdf8"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0;40,0;0,0"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,15 Q10,10 20,15 T40,15"
              stroke="#7dd3fc"
              strokeWidth="0.8"
              fill="none"
              opacity="0.2"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="40,0;0,0;40,0"
                dur="5s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>

          {/* Palm tree filter for jungle effect */}
          <filter id="jungle" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.02" numOctaves="3" seed="5" />
            <feColorMatrix type="saturate" values="1.5" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .1 .2 .1 0" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="multiply" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect
          x="-100"
          y="-100"
          width="800"
          height="700"
          fill="url(#oceanGradient)"
        />
        <rect x="-100" y="-100" width="800" height="700" fill="url(#waves)" />

        {/* Main Island - Much Larger */}
        <ellipse
          cx="300"
          cy="250"
          rx="280"
          ry="220"
          fill="url(#islandGradient)"
          className="drop-shadow-lg"
        />

        {/* Beach/Sand Ring - Larger */}
        <ellipse
          cx="300"
          cy="250"
          rx="260"
          ry="200"
          fill="#fde68a"
          opacity="0.8"
        />

        {/* Inner Island (Green Land) - Larger */}
        <ellipse cx="300" cy="250" rx="220" ry="180" fill="#22c55e" />

        {/* Small rocky outcrops */}
        <circle cx="150" cy="180" r="25" fill="#71717a" opacity="0.7" />
        <circle cx="450" cy="320" r="20" fill="#71717a" opacity="0.7" />
        <circle cx="520" cy="150" r="15" fill="#71717a" opacity="0.6" />

        {/* Coral reefs (small colorful spots) */}
        <circle cx="180" cy="350" r="8" fill="#f472b6" opacity="0.6" />
        <circle cx="420" cy="380" r="6" fill="#a78bfa" opacity="0.6" />
        <circle cx="480" cy="120" r="7" fill="#fb7185" opacity="0.6" />
        <circle cx="120" cy="250" r="5" fill="#34d399" opacity="0.6" />

        {/* Render connections (now look like paths/bridges) */}
        <g className="connections">{renderConnections()}</g>

        {/* Render nodes */}
        <g className="nodes">
          {mapData.nodes.map((node) => (
            <Node
              key={node.id}
              node={node}
              isSelected={selectedNodes.includes(node.id)}
              isVisited={visitedNodes.has(node.id)}
              isCurrent={currentNode === node.id}
              onClick={() => onNodeClick(node.id)}
              disabled={isRunning}
            />
          ))}
        </g>

        {/* Decorative elements */}
        {/* Clouds */}
        <g className="clouds" opacity="0.4">
          <ellipse cx="100" cy="80" rx="20" ry="12" fill="white">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;50,0;0,0"
              dur="20s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="110" cy="75" rx="15" ry="10" fill="white">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;50,0;0,0"
              dur="20s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="480" cy="60" rx="18" ry="11" fill="white">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;-30,0;0,0"
              dur="25s"
              repeatCount="indefinite"
            />
          </ellipse>
        </g>
      </svg>

      {/* Enhanced Legend with Island Theme */}
      <div className="absolute top-1 right-1 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-blue-200">
        <h4 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
          🏝️ Peta Pulau
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-gray-700">Titik Awal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <span className="text-gray-700">Titik Tujuan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm animate-pulse"></div>
            <span className="text-gray-700">Sedang Dicek</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            <span className="text-gray-700">Sudah Dikunjungi</span>
          </div>
          <hr className="border-blue-200 my-2" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 bg-brown-600 rounded-sm"></div>
            <span className="text-gray-600">Jalur Darat</span>
          </div>
        </div>
      </div>

      {/* Compass */}
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center border-2 border-blue-300">
        <div className="text-blue-800 font-bold text-xs">N</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-400 rounded-full"></div>
          <div className="absolute w-0.5 h-4 bg-red-500 transform -translate-y-1"></div>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;
