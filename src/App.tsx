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
    <div className='h-screen w-fit overflow-x-hidden'>
      <PathfindingProvider>
        <TileProvider>
          <SpeedProvider>
            <div className='h-fit w-fit flex flex-col overflow-y-hidden'>
              <Nav isVisualizationRunningRef={isVisualizationRunningRef}/>
              <Grid isVisualizationRunningRef={isVisualizationRunningRef}/>
            </div>
          </SpeedProvider>
        </TileProvider>
      </PathfindingProvider>
    </div>
  )
}

export default App
