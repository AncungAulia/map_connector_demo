
import { Node, AlgorithmStep } from '../types/MapTypes';

export const runBFS = (nodes: Node[], start: string, end?: string): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const queue = [start];
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  let stepCount = 1;

  visited.add(start);
  
  // Initial step
  steps.push({
    step: stepCount++,
    description: `Memulai BFS dari ${nodeMap.get(start)?.name}. Menambahkan ke queue.`,
    currentNode: start,
    visited: [start],
    queue: [start],
    algorithm: 'bfs'
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentNodeData = nodeMap.get(current);

    if (!currentNodeData) continue;

    // Check if we found the target (for connectivity mode)
    if (end && current === end) {
      steps.push({
        step: stepCount++,
        description: `Target ${currentNodeData.name} ditemukan! Koneksi berhasil.`,
        currentNode: current,
        visited: Array.from(visited),
        queue: [...queue],
        pathFound: true,
        algorithm: 'bfs'
      });
      return steps;
    }

    // Process neighbors
    const unvisitedNeighbors = currentNodeData.connections.filter(neighbor => !visited.has(neighbor));
    
    if (unvisitedNeighbors.length > 0) {
      for (const neighbor of unvisitedNeighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          
          const neighborNode = nodeMap.get(neighbor);
          steps.push({
            step: stepCount++,
            description: `Dari ${currentNodeData.name}, menemukan ${neighborNode?.name}. Menambahkan ke queue.`,
            currentNode: neighbor,
            visited: Array.from(visited),
            queue: [...queue],
            algorithm: 'bfs'
          });
        }
      }
    } else {
      steps.push({
        step: stepCount++,
        description: `${currentNodeData.name} tidak memiliki tetangga yang belum dikunjungi.`,
        currentNode: current,
        visited: Array.from(visited),
        queue: [...queue],
        algorithm: 'bfs'
      });
    }
  }

  // Final step
  if (end) {
    steps.push({
      step: stepCount++,
      description: `Queue kosong. Target ${nodeMap.get(end)?.name} tidak ditemukan.`,
      currentNode: '',
      visited: Array.from(visited),
      queue: [],
      pathFound: false,
      algorithm: 'bfs'
    });
  } else {
    steps.push({
      step: stepCount++,
      description: `Traversal selesai. Berhasil mengunjungi ${visited.size} wilayah.`,
      currentNode: '',
      visited: Array.from(visited),
      queue: [],
      algorithm: 'bfs'
    });
  }

  return steps;
};

export const runDFS = (nodes: Node[], start: string, end?: string): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const stack = [start];
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  let stepCount = 1;

  // Initial step
  steps.push({
    step: stepCount++,
    description: `Memulai DFS dari ${nodeMap.get(start)?.name}. Menambahkan ke stack.`,
    currentNode: start,
    visited: [],
    stack: [start],
    algorithm: 'dfs'
  });

  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    const currentNodeData = nodeMap.get(current);

    if (!currentNodeData) continue;

    steps.push({
      step: stepCount++,
      description: `Mengunjungi ${currentNodeData.name}. Menandai sebagai dikunjungi.`,
      currentNode: current,
      visited: Array.from(visited),
      stack: [...stack],
      algorithm: 'dfs'
    });

    // Check if we found the target (for connectivity mode)
    if (end && current === end) {
      steps.push({
        step: stepCount++,
        description: `Target ${currentNodeData.name} ditemukan! Koneksi berhasil.`,
        currentNode: current,
        visited: Array.from(visited),
        stack: [...stack],
        pathFound: true,
        algorithm: 'dfs'
      });
      return steps;
    }

    // Add unvisited neighbors to stack
    const unvisitedNeighbors = currentNodeData.connections.filter(neighbor => !visited.has(neighbor));
    
    if (unvisitedNeighbors.length > 0) {
      // Add in reverse order for DFS
      for (let i = unvisitedNeighbors.length - 1; i >= 0; i--) {
        const neighbor = unvisitedNeighbors[i];
        if (!visited.has(neighbor) && !stack.includes(neighbor)) {
          stack.push(neighbor);
        }
      }
      
      const neighborNode = nodeMap.get(unvisitedNeighbors[0]);
      steps.push({
        step: stepCount++,
        description: `Dari ${currentNodeData.name}, menambahkan tetangga ke stack: ${unvisitedNeighbors.map(n => nodeMap.get(n)?.name).join(', ')}.`,
        currentNode: current,
        visited: Array.from(visited),
        stack: [...stack],
        algorithm: 'dfs'
      });
    }
  }

  // Final step
  if (end) {
    steps.push({
      step: stepCount++,
      description: `Stack kosong. Target ${nodeMap.get(end)?.name} tidak ditemukan.`,
      currentNode: '',
      visited: Array.from(visited),
      stack: [],
      pathFound: false,
      algorithm: 'dfs'
    });
  } else {
    steps.push({
      step: stepCount++,
      description: `Traversal selesai. Berhasil mengunjungi ${visited.size} wilayah.`,
      currentNode: '',
      visited: Array.from(visited),
      stack: [],
      algorithm: 'dfs'
    });
  }

  return steps;
};
