import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollSync } from "react-virtualized";
import './App.css';
import logo from './logo.svg'

function App() {
  const [data, SetData] = useState([])
  const rowHeight = 200;
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });
  useEffect(() => {
    const getData = async () => {
      axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(resp => SetData(resp.data))
    };
    getData();
  }, []);

  const Row = ({ index, key, style, parent }) => (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}>
      <div style={style} className="row">
        <div className="image">
          <img src={data[index].thumbnailUrl} alt="" />
        </div>
        <div className="content">
          <div>{data[index].title}</div>
          <div>{data[index].text}</div>
        </div>
      </div>
    </CellMeasurer>
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ScrollSync>
        {({ onScroll, scrollTop, scrollLeft }) => (
          <div className="list">
            <AutoSizer>
              {
                ({ width, height }) => {
                  return (
                    <div className="list">
                      <List
                        width={width}
                        height={height}
                        rowHeight={rowHeight}
                        deferredMeasurementCache={cache}
                        scrollTop={scrollTop}
                        onScroll={onScroll}
                        rowRenderer={Row}
                        overscanRowCount={3}
                        rowCount={data.length} />
                    </div>
                  )
                }
              }
            </AutoSizer>
          </div>
        )
        }
      </ScrollSync >
    </div >

  );
}
export default App;