import React from 'react';
import Chart from './components/Chart';
import Input from './components/Input';
import ErrorMsg from './components/ErrorMsg'
import { useSelector } from 'react-redux'


function App() {
  const data = useSelector(state => state.data);
  const isError = useSelector(state => state.isError);
  const msg = useSelector(state => state.msg)
  return (
    <div className="App">
      <Input />
      {data.length > 0 && <Chart data={data} />}
      {isError && <ErrorMsg msg={msg} />}
    </div>
  );
}

export default App;
