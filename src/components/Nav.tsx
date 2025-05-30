import { useState, type RefObject } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, PATH_FINDING_ALGORITHMS, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import type { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {
    const {maze, setMaze, grid, setGrid, algorithm, setAlgorithm, isVisualized, setIsVisualized} = usePathfinding();
    const { startTile, endTile } = useTile();
    const {speed, setSpeed} = useSpeed();
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
        const { traversedTiles, path } = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });
        animatePath(traversedTiles, path, startTile, endTile, speed)
        setIsDisabled(true);
        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsVisualized(true);
            setIsDisabled(false);
            isVisualizationRunningRef.current = false;
            }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value);
        };

    return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            isDisabled={isDisabled}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          />
          <Select
            label="Graph"
            value={algorithm}
            isDisabled={isDisabled}
            options={PATH_FINDING_ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            isDisabled={isDisabled}
            onChange={(e) => {
              setSpeed(parseInt(e.target.value) as SpeedType);
            }}
          />
          <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isVisualized}
            handleRunVisualizer={handleRunVisualizer}
          />
        </div>
      </div>
    </div>
  );
}