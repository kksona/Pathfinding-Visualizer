import { isEqual } from "./helpers";
import type { TileType } from "./types";

export function removeFromQueue(tile: TileType, queue: TileType[]) {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])){
        queue.splice(i,1);
    }
  }
  return false;
}