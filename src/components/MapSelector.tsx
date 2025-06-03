
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allMapConfigs } from '../data/mapConfigs';

interface MapSelectorProps {
  currentMapId: string;
  onMapChange: (mapId: string) => void;
  disabled?: boolean;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  currentMapId,
  onMapChange,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Pilih Map:
      </label>
      <Select value={currentMapId} onValueChange={onMapChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih map..." />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {allMapConfigs.map((map, index) => (
            <SelectItem key={map.id} value={map.id}>
              Map {index + 1}: {map.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MapSelector;
