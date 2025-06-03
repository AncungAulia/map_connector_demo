import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlgorithmStep } from "../types/MapTypes";

interface StepDisplayProps {
  steps: AlgorithmStep[];
  currentStep: number;
  pathFound: boolean | null;
  selectedNodes: string[];
  mapNodes: any[];
}

const StepDisplay: React.FC<StepDisplayProps> = ({
  steps,
  currentStep,
  pathFound,
  selectedNodes,
  mapNodes,
}) => {
  const getCurrentStepData = () => {
    if (currentStep >= 0 && currentStep < steps.length) {
      return steps[currentStep];
    }
    return null;
  };

  const getNodeName = (nodeId: string) => {
    const node = mapNodes.find((n) => n.id === nodeId);
    return node ? node.name : nodeId;
  };

  const stepData = getCurrentStepData();

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">Langkah Algoritma</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Algorithm Info */}
        {stepData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Algoritma: {stepData.algorithm.toUpperCase()}
              </span>
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} / {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Current Step Description */}
        {stepData ? (
          <div className="space-y-4">
            <div className="p-4 bg-white border-l-4 border-blue-400 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Step {stepData.step}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {stepData.description}
              </p>
            </div>

            {/* Current Node Info */}
            {stepData.currentNode && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600 font-medium">
                    🔍 Node saat ini:
                  </span>
                  <span className="font-semibold text-gray-800">
                    {getNodeName(stepData.currentNode)}
                  </span>
                </div>
              </div>
            )}

            {/* Visited Nodes */}
            {stepData.visited.length > 0 && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 font-medium mb-2">
                  ✅ Node yang sudah dikunjungi:
                </div>
                <div className="flex flex-wrap gap-1">
                  {stepData.visited.map((nodeId) => (
                    <span
                      key={nodeId}
                      className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                    >
                      {getNodeName(nodeId)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Queue/Stack Info */}
            {stepData.queue && stepData.queue.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-medium mb-2">
                  📋 Queue (BFS):
                </div>
                <div className="flex flex-wrap gap-1">
                  {stepData.queue.map((nodeId, index) => (
                    <span
                      key={`${nodeId}-${index}`}
                      className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      {getNodeName(nodeId)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {stepData.stack && stepData.stack.length > 0 && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-purple-600 font-medium mb-2">
                  📚 Stack (DFS):
                </div>
                <div className="flex flex-wrap gap-1">
                  {stepData.stack.map((nodeId, index) => (
                    <span
                      key={`${nodeId}-${index}`}
                      className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                    >
                      {getNodeName(nodeId)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            {selectedNodes.length < 2 ? (
              <div className="text-gray-500">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-lg font-medium">Mulaikan simulasi</p>
                <p className="text-sm mt-2">untuk mengecek konektivitas</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <div className="text-4xl mb-4">🚀</div>
                <p className="text-lg font-medium">Siap untuk memulai!</p>
                <p className="text-sm mt-2">
                  Klik salah satu algoritma di panel kontrol
                </p>
              </div>
            )}
          </div>
        )}

        {/* Final Result */}
        {pathFound !== null && (
          <div
            className={`mt-4 p-4 rounded-lg border-2 ${
              pathFound
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{pathFound ? "✅" : "❌"}</span>
              <div>
                <div
                  className={`font-bold text-lg ${
                    pathFound ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {pathFound ? "Koneksi Ditemukan!" : "Tidak Ada Koneksi"}
                </div>
                <div
                  className={`text-sm ${
                    pathFound ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedNodes.length === 2 && (
                    <>
                      {getNodeName(selectedNodes[0])} {pathFound ? "↔️" : "↮"}{" "}
                      {getNodeName(selectedNodes[1])}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StepDisplay;
