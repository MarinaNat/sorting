import React, { useEffect, useState } from 'react';
import './App.scss';
import Tabl from './components/elements/Tabl/Tabl';
import { items } from './components/const/items';
import { Route, Routes } from 'react-router-dom';
import Poginator from './components/elements/Paginator/Poginator';


function App() {
  const [contactData, setContactData] = useState(items); //данные
  const [isLoading, setIsLoading] = useState(true); //стейт загрузки
  const [directionSort, setDirectionSort] = useState(true);
  const [searchText, setSearchText] = useState({ text: '', target: '', query: '' });//для поиска
  const [currentPage, setCurrentPage] = useState(1) //текущая страница
  const [limitCountPage] = useState(5); //лимит строк на странице

  //загрузка данных
  useEffect(() => {
    // axios.get(baseUrl).then((res) => {
    // setContactData(res.data)

    setContactData(items)
    setIsLoading(false)
    // })
  }, [])



  const onSearchSend = (text, target, query) => {
    setSearchText({
      text: text,
      target: target,
      query: query
    });

  }

  // функция для фильтрации
  const getFiltredData = () => {
    if (JSON.stringify(searchText) === JSON.stringify({ text: '', target: '', query: '' })) {
      return contactData
    };
    if (searchText.query === '') {
      return contactData.filter(
        el => {
          return el['name'].toLowerCase().includes(searchText.text.toLowerCase())
        }
      )
    };
    const filteredItems = contactData.filter((item) => {
      return (
        searchText.query !== 'contains' ? (
          searchText.query === 'less' ? item[searchText.target] < Number(searchText.text) :
            (searchText.query === 'more' ? item[searchText.target] > Number(searchText.text) :
              item[searchText.target] === Number(searchText.text))
        ) : (
          item.name.toLowerCase().includes(searchText.text.toLowerCase().trim())
        )
      );
    });
    return filteredItems;
  }

  const filtredData = getFiltredData()

  // пагинация
  const lastBlockRow = currentPage * limitCountPage; //индекс последней страницы
  const firstBlockRow = lastBlockRow - limitCountPage; //индекс первой страницы
  const currentRow = filtredData.slice(firstBlockRow, lastBlockRow)

  const paginate = pageNamber => setCurrentPage(pageNamber)

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const prevPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  //сортировка страниц
  const sortData = (field) => {
    const copyData = contactData.concat();
    let sortData;

    directionSort ?
      sortData = copyData.sort(
        (a, b) => { return a[field] > b[field] ? 1 : -1 }
      ) :
      sortData = copyData.sort(
        (a, b) => { return a[field] < b[field] ? 1 : -1 }
      );
    console.table(sortData)
    setContactData(sortData)
    setDirectionSort(!directionSort)
  }

  return (
    <div className="app">
      <div className='page'>
        <Routes>
          <Route
            path='*'
            element={<Tabl
              sortData={sortData}
              contactData={currentRow}
              directionSort={directionSort}
              onSearchSend={onSearchSend}
              isLoading={isLoading}
            />}>
          </Route>
        </Routes>
        <Poginator
          limitCountPage={limitCountPage}
          tottalCount={filtredData.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
    </div >
  );
}

export default App;
