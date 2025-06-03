
import { MapData } from '../types/MapTypes';

export const allMapConfigs: MapData[] = [
  {
    id: 'valorant_bind',
    name: 'Valorant - Bind',
    nodes: [
      { id: 'a_site', name: 'A Site', x: 150, y: 120, type: 'military', connections: ['a_short', 'a_tower'] },
      { id: 'a_short', name: 'A Short', x: 280, y: 180, type: 'building', connections: ['a_site', 'spawn_att'] },
      { id: 'a_tower', name: 'A Tower', x: 120, y: 250, type: 'building', connections: ['a_site'] },
      { id: 'spawn_att', name: 'Attacker Spawn', x: 450, y: 200, type: 'city', connections: ['a_short', 'b_long'] },
      { id: 'b_long', name: 'B Long', x: 380, y: 320, type: 'building', connections: ['spawn_att', 'b_site'] },
      { id: 'b_site', name: 'B Site', x: 200, y: 380, type: 'military', connections: ['b_long'] }
    ]
  },
  {
    id: 'csgo_dust2',
    name: 'CS:GO - Dust2',
    nodes: [
      { id: 'ct_spawn', name: 'CT Spawn', x: 480, y: 100, type: 'military', connections: ['long_a', 'catwalk'] },
      { id: 'long_a', name: 'Long A', x: 350, y: 180, type: 'desert', connections: ['ct_spawn', 'a_site'] },
      { id: 'a_site', name: 'A Site', x: 200, y: 250, type: 'desert', connections: ['long_a', 'short_a'] },
      { id: 'short_a', name: 'Short A', x: 160, y: 350, type: 'desert', connections: ['a_site'] },
      { id: 'catwalk', name: 'Catwalk', x: 420, y: 220, type: 'building', connections: ['ct_spawn', 'tunnels'] },
      { id: 'tunnels', name: 'Tunnels', x: 300, y: 400, type: 'building', connections: ['catwalk'] }
    ]
  },
  {
    id: 'cod_warzone',
    name: 'COD Warzone - Verdansk (Disconnected)',
    nodes: [
      { id: 'downtown', name: 'Downtown', x: 180, y: 150, type: 'city', connections: ['stadium'] },
      { id: 'stadium', name: 'Stadium', x: 300, y: 200, type: 'building', connections: ['downtown'] },
      { id: 'hospital', name: 'Hospital', x: 420, y: 120, type: 'hospital', connections: ['airport'] },
      { id: 'airport', name: 'Airport', x: 500, y: 200, type: 'airport', connections: ['hospital'] },
      { id: 'prison', name: 'Prison', x: 250, y: 400, type: 'building', connections: [] }
    ]
  },
  {
    id: 'freefire_bermuda',
    name: 'Free Fire - Bermuda (Circular)',
    nodes: [
      { id: 'peak', name: 'Peak', x: 300, y: 80, type: 'mountain', connections: ['clock_tower'] },
      { id: 'clock_tower', name: 'Clock Tower', x: 180, y: 180, type: 'building', connections: ['peak', 'shipyard'] },
      { id: 'shipyard', name: 'Shipyard', x: 120, y: 350, type: 'port', connections: ['clock_tower', 'mars_electric'] },
      { id: 'mars_electric', name: 'Mars Electric', x: 420, y: 380, type: 'industrial', connections: ['shipyard', 'karnali'] },
      { id: 'karnali', name: 'Karnali', x: 480, y: 180, type: 'nature', connections: ['mars_electric', 'peak'] }
    ]
  },
  {
    id: 'apex_legends',
    name: 'Apex Legends - Kings Canyon (Branched)',
    nodes: [
      { id: 'skull_town', name: 'Skull Town', x: 300, y: 100, type: 'desert', connections: ['thunderdome', 'relay', 'market'] },
      { id: 'thunderdome', name: 'Thunderdome', x: 150, y: 200, type: 'building', connections: ['skull_town', 'bunker'] },
      { id: 'relay', name: 'Relay', x: 450, y: 200, type: 'industrial', connections: ['skull_town', 'swamps'] },
      { id: 'market', name: 'Market', x: 300, y: 250, type: 'building', connections: ['skull_town'] },
      { id: 'bunker', name: 'Bunker', x: 150, y: 350, type: 'military', connections: ['thunderdome'] },
      { id: 'swamps', name: 'Swamps', x: 450, y: 350, type: 'nature', connections: ['relay'] }
    ]
  },
  {
    id: 'overwatch_hanamura',
    name: 'Overwatch - Hanamura (Bridge Layout)',
    nodes: [
      { id: 'spawn_room', name: 'Spawn Room', x: 100, y: 200, type: 'building', connections: ['main_street', 'side_path'] },
      { id: 'main_street', name: 'Main Street', x: 250, y: 150, type: 'city', connections: ['spawn_room', 'point_a'] },
      { id: 'side_path', name: 'Side Path', x: 180, y: 320, type: 'building', connections: ['spawn_room', 'courtyard'] },
      { id: 'point_a', name: 'Point A', x: 400, y: 180, type: 'temple', connections: ['main_street', 'bridge'] },
      { id: 'bridge', name: 'Bridge', x: 480, y: 280, type: 'bridge', connections: ['point_a', 'point_b'] },
      { id: 'point_b', name: 'Point B', x: 350, y: 380, type: 'temple', connections: ['bridge', 'courtyard'] },
      { id: 'courtyard', name: 'Courtyard', x: 220, y: 420, type: 'park', connections: ['side_path', 'point_b'] }
    ]
  },
  {
    id: 'fortnite_apollo',
    name: 'Fortnite - Apollo Island (Star Shape)',
    nodes: [
      { id: 'tilted_towers', name: 'Tilted Towers', x: 300, y: 250, type: 'city', connections: ['pleasant_park', 'dusty_depot', 'retail_row', 'salty_springs'] },
      { id: 'pleasant_park', name: 'Pleasant Park', x: 150, y: 120, type: 'park', connections: ['tilted_towers'] },
      { id: 'dusty_depot', name: 'Dusty Depot', x: 450, y: 120, type: 'industrial', connections: ['tilted_towers'] },
      { id: 'retail_row', name: 'Retail Row', x: 480, y: 350, type: 'mall', connections: ['tilted_towers'] },
      { id: 'salty_springs', name: 'Salty Springs', x: 120, y: 350, type: 'nature', connections: ['tilted_towers'] },
      { id: 'lonely_lodge', name: 'Lonely Lodge', x: 300, y: 400, type: 'nature', connections: [] }
    ]
  },
  {
    id: 'rainbow_six',
    name: 'Rainbow Six - Oregon (Grid)',
    nodes: [
      { id: 'main_entrance', name: 'Main Entrance', x: 200, y: 150, type: 'building', connections: ['kitchen', 'dining_hall'] },
      { id: 'kitchen', name: 'Kitchen', x: 350, y: 150, type: 'building', connections: ['main_entrance', 'meeting_hall'] },
      { id: 'dining_hall', name: 'Dining Hall', x: 200, y: 300, type: 'building', connections: ['main_entrance', 'dormitory'] },
      { id: 'meeting_hall', name: 'Meeting Hall', x: 350, y: 300, type: 'building', connections: ['kitchen', 'dormitory'] },
      { id: 'dormitory', name: 'Dormitory', x: 275, y: 225, type: 'building', connections: ['dining_hall', 'meeting_hall'] },
      { id: 'tower', name: 'Tower', x: 450, y: 400, type: 'building', connections: [] }
    ]
  },
  {
    id: 'genshin_mondstadt',
    name: 'Genshin Impact - Mondstadt (Linear Chain)',
    nodes: [
      { id: 'city_gate', name: 'City Gate', x: 100, y: 250, type: 'city', connections: ['windrise'] },
      { id: 'windrise', name: 'Windrise', x: 200, y: 250, type: 'nature', connections: ['city_gate', 'cathedral'] },
      { id: 'cathedral', name: 'Cathedral', x: 300, y: 250, type: 'temple', connections: ['windrise', 'dawn_winery'] },
      { id: 'dawn_winery', name: 'Dawn Winery', x: 400, y: 250, type: 'agriculture', connections: ['cathedral', 'knights_hq'] },
      { id: 'knights_hq', name: 'Knights HQ', x: 500, y: 250, type: 'castle', connections: ['dawn_winery'] },
      { id: 'dragonspine', name: 'Dragonspine', x: 300, y: 400, type: 'mountain', connections: [] }
    ]
  },
  {
    id: 'minecraft_survival',
    name: 'Minecraft - Survival World (Complex)',
    nodes: [
      { id: 'spawn_village', name: 'Spawn Village', x: 250, y: 200, type: 'city', connections: ['mine_entrance', 'forest_base', 'nether_portal'] },
      { id: 'mine_entrance', name: 'Mine Entrance', x: 150, y: 150, type: 'mine', connections: ['spawn_village', 'diamond_level'] },
      { id: 'forest_base', name: 'Forest Base', x: 350, y: 150, type: 'nature', connections: ['spawn_village', 'end_portal'] },
      { id: 'nether_portal', name: 'Nether Portal', x: 250, y: 300, type: 'castle', connections: ['spawn_village', 'end_portal'] },
      { id: 'diamond_level', name: 'Diamond Level', x: 100, y: 250, type: 'mine', connections: ['mine_entrance', 'ocean_monument'] },
      { id: 'end_portal', name: 'End Portal', x: 400, y: 250, type: 'castle', connections: ['forest_base', 'nether_portal'] },
      { id: 'ocean_monument', name: 'Ocean Monument', x: 150, y: 350, type: 'lake', connections: ['diamond_level'] }
    ]
  }
];
