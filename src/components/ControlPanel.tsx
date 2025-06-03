import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MapSelector from "./MapSelector";
import { AlgorithmType } from "../types/MapTypes";

export type CheckMode = "connectivity" | "traversal";

interface ControlPanelProps {
  onRunAlgorithm: () => void;
  onReset: () => void;
  onMapChange: (mapId: string) => void;
  canRun: boolean;
  isRunning: boolean;
  currentMapName: string;
  currentMapId: string;
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  checkMode: CheckMode;
  onCheckModeChange: (mode: CheckMode) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onRunAlgorithm,
  onReset,
  onMapChange,
  canRun,
  isRunning,
  currentMapName,
  currentMapId,
  selectedAlgorithm,
  onAlgorithmChange,
  checkMode,
  onCheckModeChange,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">Panel Kontrol</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Map Selector */}
        <MapSelector
          currentMapId={currentMapId}
          onMapChange={onMapChange}
          disabled={isRunning}
        />

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Mode Selection */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Pilih Mode:
          </h3>

          <RadioGroup
            value={checkMode}
            onValueChange={(value) => onCheckModeChange(value as CheckMode)}
            disabled={isRunning}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
              <RadioGroupItem value="connectivity" id="connectivity" />
              <Label htmlFor="connectivity" className="cursor-pointer flex-1">
                <div className="font-medium">Cek Konektivitas 2 Wilayah</div>
                <div className="text-sm text-gray-600">
                  Periksa apakah 2 wilayah terhubung
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-purple-50 transition-colors">
              <RadioGroupItem value="traversal" id="traversal" />
              <Label htmlFor="traversal" className="cursor-pointer flex-1">
                <div className="font-medium">
                  Cek Konektivitas Seluruh Wilayah
                </div>
                <div className="text-sm text-gray-600">
                  Periksa apakah semua wilayah di map terhubung
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Algorithm Selection */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Pilih Algoritma:
          </h3>

          <RadioGroup
            value={selectedAlgorithm}
            onValueChange={(value) => onAlgorithmChange(value as AlgorithmType)}
            disabled={isRunning}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
              <RadioGroupItem value="bfs" id="bfs" />
              <Label htmlFor="bfs" className="cursor-pointer flex-1">
                <div className="font-medium">Breadth-First Search (BFS)</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-purple-50 transition-colors">
              <RadioGroupItem value="dfs" id="dfs" />
              <Label htmlFor="dfs" className="cursor-pointer flex-1">
                <div className="font-medium">Depth-First Search (DFS)</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onRunAlgorithm}
            disabled={!canRun}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {isRunning
              ? "Menjalankan..."
              : checkMode === "connectivity"
              ? "Cek Konektivitas"
              : "Cek Konektivitas Seluruh Wilayah"}
          </Button>

          <Button
            onClick={onReset}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
