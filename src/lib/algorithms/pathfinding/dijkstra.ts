import { getNeighbours } from "../../../utils/getNeighbours";
import { isEqual } from "../../../utils/helpers";
import { removeFromQueue } from "../../../utils/removeFromQueue";
import type { GridType, TileType } from "../../../utils/types";


export const dijkstra = (grid: GridType, startTile: TileType, endTile: TileType) => {

    const traversedTiles:TileType[] = [];
    const base = grid[startTile.row][startTile.col];
    base.distance=0;
    base.isTraversed=true;
    const untraversed = [base];

    while(untraversed.length){
        //sorting in ascending order of their distances
        untraversed.sort((a,b)=> (a.distance-b.distance));
        const tile = untraversed.shift() as TileType;
        if(tile.isWall) continue;
        if(tile.distance===Infinity) break;
        tile.isTraversed=true;
        traversedTiles.push(tile);
        if (isEqual(tile, endTile)) break;

        const neighbors = getNeighbours(grid, tile);
        for(let i = 0; i < neighbors.length; i++){
            const node = neighbors[i];
            if(node.distance > tile.distance+1){
                removeFromQueue(node, untraversed);
                node.distance=tile.distance+1;
                node.parent=tile;
                untraversed.push(node);
            }
        }
    }

  const path = []; // Initialize an array to store the path
  let tile = grid[endTile.row][endTile.col]; // Start from the end tile
  while (tile !== null) {
    // Backtrack until the start tile
    tile.isPath = true; // Mark the tile as part of the path
    path.unshift(tile); // Add the tile to the path
    tile = tile.parent!; // Move to the parent tile
  }
  return { traversedTiles, path }; // Return the traversed tiles and the path
};