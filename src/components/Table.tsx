import React, { useEffect, useRef, useState } from 'react';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import './table.css';

interface DataTemplate {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Table = () => {
  const countPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [inputValue, setInputValue] = useState(""); // state of input field

  const [allData, setAllData] = useState(Array<DataTemplate>); // state of table data

  const [collection, setCollection] = useState(Array<DataTemplate>);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      setCollection(data.slice(0, countPerPage))
      setAllData(data)
    })
  }, []);
  
  useEffect(() => {
    if (!inputValue) {
      updatePage(1);
    } else {
      searchData(inputValue);
    }
  }, [inputValue]);

  const searchData = (query: string) => {
      setCurrentPage(1);
      const data = allData
        .filter(item => item.title.indexOf(query) > -1 || item.body.indexOf(query) > -1)
        .slice(0, countPerPage);
      setCollection(data);
  }

//   const sortData = () => {
//     setCurrentPage(1);
//     const data = allData
//       .filter(item => item.title.indexOf(query) > -1 || item.body.indexOf(query) > -1)
//       .slice(0, countPerPage);
//     setCollection(data);
// }

  const updatePage = (page: number) => {
    setCurrentPage(page);
    const to = countPerPage * page;
    const from = to - countPerPage;
    setCollection(allData.slice(from, to));
  };

  return (
    <div>
      <div className="search">
        <input
          placeholder="Поиск"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {
            collection.map((value, index) => 
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.title}</td>
                <td>{value.body}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
    </div>
  )
};
