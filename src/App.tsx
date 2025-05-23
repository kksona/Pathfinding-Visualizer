import { useRef } from 'react'
import './App.css'
import { Grid } from './components/Grid'
import { PathfindingProvider } from './context/PathfindingContext'
import { SpeedProvider } from './context/SpeedContext'
import { TileProvider } from './context/TileContext'
import { Nav } from './components/Nav'

function App() {
  const isVisualizationRunningRef = useRef(false);

  return (
    <>
    <div className="h-screen w-full flex items-center justify-center text-white overflow-x-hidden overflow-y-hidden">
      <PathfindingProvider>
        <TileProvider>
          <SpeedProvider>
            <div className='h-screen w-screen flex flex-col overflow-hidden'>
              <Nav isVisualizationRunningRef={isVisualizationRunningRef}/>
              <Grid isVisualizationRunningRef={isVisualizationRunningRef}/>
            </div>
          </SpeedProvider>
        </TileProvider>
      </PathfindingProvider>
      </div>
    </>
  )
}

export default App
