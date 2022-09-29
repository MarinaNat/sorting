import React, { useEffect, useState } from 'react';
import './App.scss';
import Tabl from './components/elements/Tabl/Tabl';
import Loader from './Loader/Loader';
import { items } from './components/const/items';
// import Poginator from './components/elements/Paginator/Poginator';
import { Route, Routes } from 'react-router-dom';
import Poginator2 from './components/elements/Paginator/Poginator2';


function App() {
  const [fieldTarget, setFieldTarget] = useState('');
  const [fieldQuery, setFieldQuery] = useState('');
  const [searchValue, setsearchValue] = useState('');
  const [contactData, setContactData] = useState(items); //данные
  const [isLoading, setIsLoading] = useState(true); //стейт загрузки
  const [directionSort, setDirectionSort] = useState(true);
  // const [totalCountRow, setTotalCountRow] = useState(0) //количество строк
  // const [totalCountPage, setTotalCountPage] = useState(0) //количество страниц
  // const limitCountPage = 5; //лимит строк на странице
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [currentPageNumber, setCurrentPageNumber] = useState('');
  // const [buttonNextDisabled, setButtonNextDisabled] = useState('');//для добавления класса disable кнопке next
  // const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState('');//для добавления класса disable кнопке disabled
  // const [currentPageActive, setCurrentPageActive] = useState('');//для добавления класса active кнопке
  const [searchText, setSearchText] = useState({ text: '', target: '', query: '' });//для поиска
  const [currentPage, setCurrentPage] = useState(1) //текущая страница
  const [limitCountPage] = useState(5); //лимит строк на странице

  //загрузка данных
  useEffect(() => {
    // axios.get(baseUrl).then((res) => {
    // setContactData(res.data)

    // setIsLoaded(true)
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
    console.log('text, target, query', text, target, query);

  }
  console.log('searchText', searchText)

  // функция для фильтрации
  const getFiltredData = () => {
    console.log('filterItems: ');
    console.log(searchText);
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
  console.log('filtredData', filtredData)


  // // пагинация
  // const currentPage = (pg) => {
  //   console.log('pg', pg)
  //   setCurrentPageNumber(pg);
  //   setButtonNextDisabled('')
  //   setButtonPreviousDisabled('')
  //   // setCurrentPageActive('active')
  // }
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
  // const lastBlockRow = currentPageNumber * limitCountPage; //индекс последней страницы
  // const firstBlockRow = lastBlockRow - limitCountPage; //индекс первой страницы
  // const currentBlockRows = filtredData.slice(firstBlockRow, lastBlockRow);

  // useEffect(() => {
  //   if (!isLoaded) {
  //     return
  //   }
  //   setTotalCountRow(contactData.length)
  //   const getTotalCountPage = Math.ceil(totalCountRow / limitCountPage)
  //   setTotalCountPage(getTotalCountPage)
  //   currentPage(1)
  // }, [isLoaded, setTotalCountRow, contactData.length, setTotalCountPage, totalCountRow])


  // let pages = []
  // for (let i = 1; i <= totalCountPage; i++) {
  //   pages.push(i)
  // }

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
  // //функция добавления класса disable кнопке next
  // const onNextClick = () => {
  //   if (currentPageNumber > totalCountPage) {
  //     setButtonNextDisabled('disabled')
  //     return
  //   }
  //   setButtonPreviousDisabled('')
  //   setCurrentPageNumber(currentPageNumber + 1)
  // }

  // //функция добавления класса disable кнопке Previous
  // const onPreviousClick = () => {
  //   if (currentPageNumber <= 1) {
  //     setButtonPreviousDisabled('disabled')
  //     return
  //   }
  //   setButtonNextDisabled('')
  //   setCurrentPageNumber(currentPageNumber - 1)
  // }



  return (
    <div className="app">
      {isLoading ?
        <Loader /> :
        <div className='page'>
          <Routes>
            <Route
              path='*'
              element={<Tabl
                sortData={sortData}
                // contactData={currentBlockRows}
                contactData={currentRow}
                directionSort={directionSort}
                onSearchSend={onSearchSend}
                isLoading={isLoading}
              />}>
            </Route>
          </Routes>

          {/* <Poginator
            pages={pages}
            currentPage={currentPage}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            buttonNextDisabled={buttonNextDisabled}
            buttonPreviousDisabled={buttonPreviousDisabled}
            // currentPageActive={currentPageActive}
            currentPageNumber={currentPageNumber}
            totalCountPage={filtredData.length}
            limitCountPage={limitCountPage}
          /> */}
          <Poginator2
            limitCountPage={limitCountPage}
            tottalCount={filtredData.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        </div>
      }
    </div >
  );
}

export default App;
