import { state, useSnapshot } from '@state';
import Tree from '@components/Tree';

function App() {
  const snap = useSnapshot(state);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Tree data={snap} myKey={null} />
      </div>
    </div>
  )
}

export default App
