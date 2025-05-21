export type AlgorithmType = "DIJKSTRA"|"A_STAR"| "BFS" | "DFS";

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export type MazeSelectType = {
    name: string,
    value: MazeType,
}

export type AlgorithmSelectType = {
    name: string,
    value: AlgorithmType,
}

export type TileType = {
    row: number;
    col: number;
    isEnd: boolean;
    isStart: boolean;
    isWall: boolean;
    isPath: boolean;
    distance: number;
    parent: TileType | null;
    isTraversed: boolean;
};

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;

export interface SpeedSelectType {
  name: string;
  value: SpeedType;
}