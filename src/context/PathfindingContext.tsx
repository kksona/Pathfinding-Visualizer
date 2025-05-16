import { createContext, useState, type ReactNode } from "react";
import type { AlgorithmType, GridType, MazeType } from "../utils/types";
import { createGrid } from "../utils/helpers";
import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";

interface PathfindingContextInterface {
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    maze: MazeType;
    setMaze: (maze:MazeType) => void;
    grid: GridType;
    setGrid: (grid:GridType)=>void;
    isVisualized: boolean;
    setIsVisualized: (isVisualized: boolean)=>void;
}

export const PathfindingContext = createContext<PathfindingContextInterface | undefined>(undefined);

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze, setMaze] = useState<MazeType>("NONE");
    const [grid, setGrid] = useState<GridType>(createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION));
    const [isVisualized, setIsVisualized] = useState<boolean>(false);

    return (
        <PathfindingContext.Provider value={{
            algorithm,
            setAlgorithm,
            maze,
            setMaze,
            grid,
            setGrid,
            isVisualized,
            setIsVisualized
        }}>
            {children}
        </PathfindingContext.Provider>
    )


}