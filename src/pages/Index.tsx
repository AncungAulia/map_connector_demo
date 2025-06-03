import { useState, useCallback } from "react";
import MapVisualization from "../components/MapVisualization";
import ControlPanel, { CheckMode } from "../components/ControlPanel";
import StepDisplay from "../components/StepDisplay";
import { MapData, Node, AlgorithmStep, AlgorithmType } from "../types/MapTypes";
import { runBFS, runDFS } from "../utils/graphAlgorithms";
import { allMapConfigs } from "../data/mapConfigs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentMap, setCurrentMap] = useState<MapData>(allMapConfigs[0]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<string>("");
  const [pathFound, setPathFound] = useState<boolean | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmType>("bfs");
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [checkMode, setCheckMode] = useState<CheckMode>("connectivity");

  const { toast } = useToast();

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (isRunning) return;

      setSelectedNodes((prev) => {
        let newSelection;
        if (prev.includes(nodeId)) {
          newSelection = prev.filter((id) => id !== nodeId);
        } else if (checkMode === "connectivity" && prev.length < 2) {
          newSelection = [...prev, nodeId];
        } else if (checkMode === "connectivity" && prev.length >= 2) {
          newSelection = [prev[1], nodeId];
        } else if (checkMode === "traversal") {
          newSelection = [nodeId];
        } else {
          newSelection = prev;
        }

        return newSelection;
      });
    },
    [isRunning, checkMode]
  );

  const checkConnectivity = useCallback(
    (start: string, end: string): boolean => {
      const visited = new Set<string>();
      const queue = [start];
      visited.add(start);

      while (queue.length > 0) {
        const current = queue.shift()!;
        if (current === end) return true;

        const currentNodeData = currentMap.nodes.find((n) => n.id === current);
        if (currentNodeData) {
          for (const neighbor of currentNodeData.connections) {
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              queue.push(neighbor);
            }
          }
        }
      }
      return false;
    },
    [currentMap.nodes]
  );

  const checkWholeMapConnectivity = useCallback(
    (startNodeId: string): boolean => {
      const visited = new Set<string>();
      const queue = [startNodeId];
      visited.add(startNodeId);

      while (queue.length > 0) {
        const current = queue.shift()!;
        const currentNodeData = currentMap.nodes.find((n) => n.id === current);
        if (currentNodeData) {
          for (const neighbor of currentNodeData.connections) {
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              queue.push(neighbor);
            }
          }
        }
      }

      return visited.size === currentMap.nodes.length;
    },
    [currentMap.nodes]
  );

  const runAlgorithm = useCallback(() => {
    if (checkMode === "connectivity" && selectedNodes.length !== 2) return;
    if (checkMode === "traversal" && selectedNodes.length !== 1) return;

    let steps: AlgorithmStep[];

    if (checkMode === "connectivity") {
      const [start, end] = selectedNodes;
      const startNode = currentMap.nodes.find((n) => n.id === start);
      const endNode = currentMap.nodes.find((n) => n.id === end);
      const connected = checkConnectivity(start, end);

      if (connected) {
        toast({
          title: "Terkoneksi!",
          description: `${startNode?.name} dan ${endNode?.name} terhubung`,
        });
      } else {
        toast({
          title: "Tidak Terkoneksi",
          description: `${startNode?.name} dan ${endNode?.name} tidak terhubung`,
        });
      }

      steps =
        selectedAlgorithm === "bfs"
          ? runBFS(currentMap.nodes, start, end)
          : runDFS(currentMap.nodes, start, end);
    } else {
      // Whole map connectivity check
      const start = selectedNodes[0];
      const startNode = currentMap.nodes.find((n) => n.id === start);
      const isWholeMapConnected = checkWholeMapConnectivity(start);

      if (isWholeMapConnected) {
        toast({
          title: "Seluruh Wilayah Terhubung!",
          description: `Semua wilayah di ${currentMap.name} saling terhubung`,
        });
      } else {
        toast({
          title: "Ada Wilayah Terpisah",
          description: `Tidak semua wilayah di ${currentMap.name} terhubung`,
        });
      }

      steps =
        selectedAlgorithm === "bfs"
          ? runBFS(currentMap.nodes, start, undefined)
          : runDFS(currentMap.nodes, start, undefined);
    }

    setAlgorithmSteps(steps);
    setCurrentStep(-1);
    setVisitedNodes(new Set());
    setCurrentNode("");
    setPathFound(null);
    setIsRunning(true);

    toast({
      title: `Memulai ${selectedAlgorithm.toUpperCase()}`,
      description: "Simulasi algoritma dimulai...",
    });

    setTimeout(() => executeSteps(steps), 1000);
  }, [
    selectedNodes,
    currentMap.nodes,
    selectedAlgorithm,
    checkConnectivity,
    checkWholeMapConnectivity,
    checkMode,
    currentMap.name,
    toast,
  ]);

  const executeSteps = useCallback(
    (steps: AlgorithmStep[]) => {
      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex >= steps.length) {
          clearInterval(interval);
          setIsRunning(false);
          const finalStep = steps[steps.length - 1];

          if (checkMode === "connectivity") {
            if (finalStep.pathFound !== undefined) {
              toast({
                title: finalStep.pathFound
                  ? "Koneksi Ditemukan!"
                  : "Tidak Ada Koneksi",
                description: finalStep.pathFound
                  ? "Algoritma berhasil menemukan jalur koneksi"
                  : "Algoritma tidak menemukan jalur koneksi",
              });
            }
          } else {
            // For whole map connectivity
            const isWholeMapConnected =
              finalStep.visited.length === currentMap.nodes.length;
            toast({
              title: isWholeMapConnected
                ? "Seluruh Wilayah Terhubung!"
                : "Ada Wilayah Terpisah",
              description: isWholeMapConnected
                ? `Algoritma berhasil mengunjungi semua ${finalStep.visited.length} wilayah`
                : `Algoritma hanya dapat mengunjungi ${finalStep.visited.length} dari ${currentMap.nodes.length} wilayah`,
            });
          }
          return;
        }

        const step = steps[stepIndex];
        setCurrentStep(stepIndex);
        setVisitedNodes(new Set(step.visited));
        setCurrentNode(step.currentNode);

        toast({
          title: `Step ${step.step}`,
          description: step.description,
        });

        if (step.pathFound !== undefined) {
          setPathFound(step.pathFound);
        }

        stepIndex++;
      }, 2500);
    },
    [toast, checkMode, currentMap.nodes.length]
  );

  const reset = useCallback(() => {
    setSelectedNodes([]);
    setAlgorithmSteps([]);
    setCurrentStep(-1);
    setIsRunning(false);
    setVisitedNodes(new Set());
    setCurrentNode("");
    setPathFound(null);
    setIsConnected(null);

    toast({
      title: "Reset",
      description: "Semua pilihan telah direset",
    });
  }, [toast]);

  const handleMapChange = useCallback(
    (mapId: string) => {
      const newMap = allMapConfigs.find((map) => map.id === mapId);
      if (newMap) {
        reset();
        setCurrentMap(newMap);

        toast({
          title: "Map Berganti",
          description: `Sekarang menggunakan: ${newMap.name}`,
        });
      }
    },
    [reset, toast]
  );

  const canRun =
    checkMode === "connectivity"
      ? selectedNodes.length === 2 && !isRunning
      : selectedNodes.length === 1 && !isRunning;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="text-center py-8 bg-white shadow-sm">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          Map Connectivity Checker
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentMap.name}
                </h2>
                <div className="text-sm text-gray-600">
                  {checkMode === "connectivity"
                    ? "Pilih 2 wilayah untuk mengecek konektivitas"
                    : "Pilih 1 wilayah untuk mengecek konektivitas seluruh wilayah"}
                </div>
              </div>

              <MapVisualization
                mapData={currentMap}
                selectedNodes={selectedNodes}
                visitedNodes={visitedNodes}
                currentNode={currentNode}
                onNodeClick={handleNodeClick}
                isRunning={isRunning}
              />

              {/* Selection Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Wilayah dipilih:
                  </span>
                  {selectedNodes.length === 0 && (
                    <span className="text-sm text-gray-500">
                      Belum ada yang dipilih
                    </span>
                  )}
                  {selectedNodes.map((nodeId, index) => {
                    const node = currentMap.nodes.find((n) => n.id === nodeId);
                    return (
                      <span
                        key={nodeId}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {checkMode === "connectivity"
                          ? index === 0
                            ? "🚀 "
                            : "� "
                          : "🏁 "}
                        {node?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div>
            <ControlPanel
              onRunAlgorithm={runAlgorithm}
              onReset={reset}
              onMapChange={handleMapChange}
              canRun={canRun}
              isRunning={isRunning}
              currentMapName={currentMap.name}
              currentMapId={currentMap.id}
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              checkMode={checkMode}
              onCheckModeChange={setCheckMode}
            />
          </div>
        </div>

        {/* Steps Display - Now at the bottom */}
        <div className="w-full">
          <StepDisplay
            steps={algorithmSteps}
            currentStep={currentStep}
            pathFound={pathFound}
            selectedNodes={selectedNodes}
            mapNodes={currentMap.nodes}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
