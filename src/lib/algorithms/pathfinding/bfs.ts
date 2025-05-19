import { getNeighbours } from "../../../utils/getNeighbours";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import type { GridType, TileType } from "../../../utils/types";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const traversedTile: TileType[] = [];

    const base = grid[startTile.row][startTile.col];
    base.distance=0;
    base.isTraversed=true;
    const queue = [base]

    while(queue.length){
        const tile = queue.shift() as TileType;
        if(tile.isWall) continue;
        if(tile.distance===Infinity)break;
        tile.isTraversed=true;
        traversedTile.push(tile);
        if(isEqual(tile, endTile)) break;

        const neighbours = getNeighbours(grid, tile);

        for(let i = 0; i < neighbours.length; i++){
            if(!isInQueue(neighbours[i], queue)) {
                const neigh = neighbours[i];
                neigh.distance = tile.distance+1;
                neigh.parent=tile;
                queue.push(neigh);
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
    return { traversedTile, path };
}