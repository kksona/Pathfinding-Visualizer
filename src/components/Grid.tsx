import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { useState, type RefObject } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {
    const {grid, setGrid} = usePathfinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (row: number, col: number) => {
        if(isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)){
            return;
        }
        setIsMouseDown(true);
        const newGrid = createNewGrid(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = (row: number, col: number) => {
        if(isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)){
            return;
        }
        setIsMouseDown(false);
    }

    const handleMouseEnter = (row: number, col: number) => {
        if(isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)){
            return;
        }
        if(isMouseDown){
            const newGrid = createNewGrid(grid, row, col);
            setGrid(newGrid);
        }
    }

    return (
        <div className={twMerge(
            "flex items-center flex-col justify-center border-black mt-10",
            `lg:min-h[${MAX_ROWS*17}px] md:min-h[${MAX_ROWS*15}px] xs:min-h[${MAX_ROWS*8}px] min-h-[${MAX_ROWS*7}px]`,
            `lg:w-[${MAX_COLS*17}px] md:w-[${MAX_COLS*15}px] xs:w-[${MAX_COLS*8}px] w-[${MAX_COLS*7}px]`
        )}>
            {grid.map((r, rowIndex)=> (
                <div key={rowIndex} className="flex">
                    {r.map((tile, tileIndex)=> {
                        const {row, col, isStart, isEnd, isWall, isPath, isTraversed} = tile;
                        return (
                            <Tile
                            key={tileIndex}
                            row={tile.row}
                            col={tile.col}
                            isEnd={isEnd}
                            isStart={isStart}
                            isPath={isPath}
                            isTraversed={isTraversed}
                            isWall={isWall}
                            handleMouseDown = {() => handleMouseDown(row, col)}
                            handleMouseUp={() => handleMouseUp(row, col)}
                            handleMouseEnter={()=> handleMouseEnter(row, col)}
                            />
                        );
                })}
                </div>
            ))}
        </div>
    )
}