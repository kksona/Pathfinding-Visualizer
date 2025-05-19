import { MAX_COLS, MAX_ROWS } from "./constants";
import type { GridType, TileType } from "./types";

export const getNeighbours = (grid: GridType, tile: TileType) => {
    const {row, col} = tile;
    const neighbours = [];

    let dx=[1,1,-1,-1];
    let dy= [1,-1,1,-1];
    for(let i = 0; i < 4; i++){
        let new_r = row+dx[i];
        let new_c = col+dy[i];
        if(new_r<0||new_c<0||new_r>=MAX_ROWS||new_c>=MAX_COLS||grid[new_r][new_c].isTraversed) continue;
        neighbours.push(grid[new_r][new_c]);
    }
    return neighbours;
}