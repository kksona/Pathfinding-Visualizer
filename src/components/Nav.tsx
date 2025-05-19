import { useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { MAZES, PATH_FINDING_ALGORITHMS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import type { AlgorithmType, MazeType } from "../utils/types";
import { Select } from "./Select";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";

export function Nav() {
    const {maze, setMaze, grid, algorithm, setAlgorithm, isVisualized, setIsVisualized} = usePathfinding();
    const { startTile, endTile } = useTile();
    const [isDisabled, setIsDisabled] = useState(false);

    const handleGenerateMaze = (maze: MazeType) => {
        if(maze==="NONE"){
            setMaze(maze);
            resetGrid({grid, startTile, endTile});
            return;
        }
        setMaze(maze);
        setIsDisabled(true);
    }

    const handleRunVisualizer = () => {
        if(isVisualized){
            setIsVisualized(false);
            resetGrid({grid: grid.slice(), startTile, endTile})
            return;
        }
        const { traversedTile, path } = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });
        console.log("Traversed tiles", traversedTile)
        console.log("Path", path)
    }

    return (
        <div className="items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                    Pathfinding Visualizer
                </h1>
                <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                    <Select 
                    label="Maze"
                    value={maze}
                    options={MAZES}
                    onChange={(e)=> {
                        //handle Maze Generation
                        handleGenerateMaze(e.target.value as MazeType);
                    }}/>

                    <Select 
                    label="Graph"
                    value={algorithm}
                    options={PATH_FINDING_ALGORITHMS}
                    onChange={(e) => {
                        setAlgorithm(e.target.value as AlgorithmType);
                    }}/>

                    <PlayButton
                    isDisabled={isDisabled}
                    isGraphVisualized={isVisualized}
                    handleRunVisualizer={handleRunVisualizer}
                    />
                </div>
            </div>
        </div>
    )
}