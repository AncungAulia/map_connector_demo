
export interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'city' | 'building' | 'agriculture' | 'military' | 'port' | 'nature' | 'industrial' | 'hospital' | 'school' | 'mountain' | 'desert' | 'lake' | 'bridge' | 'airport' | 'mall' | 'temple' | 'castle' | 'mine' | 'farm' | 'park';
  connections: string[];
}

export interface MapData {
  id: string;
  name: string;
  nodes: Node[];
}

export interface AlgorithmStep {
  step: number;
  description: string;
  currentNode: string;
  visited: string[];
  queue?: string[];
  stack?: string[];
  pathFound?: boolean;
  algorithm: 'bfs' | 'dfs';
}

export type AlgorithmType = 'bfs' | 'dfs';
