import { useEffect, useState } from 'react';
import './App.scss';
import Tabl from './components/elements/Tabl/Tabl';
import Loader from './Loader/Loader';
import { items } from './components/const/items';
import Poginator from './components/elements/Paginator/Poginator';


function App() {
  const [fieldTarget, setFieldTarget] = useState('');
  const [fieldQuery, setFieldQuery] = useState('');
  const [searchValue, setsearchValue] = useState('');
  const [contactData, setContactData] = useState(items);
  const [isLoading, setIsLoading] = useState(true);
  const [directionSort, setDirectionSort] = useState(true);
  const [totalCountRow, setTotalCountRow] = useState(0) //количество строк
  const [totalCountPage, setTotalCountPage] = useState(0) //количество страниц
  const limitCountPage = 5; //лимит строк на странице
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState('1');
  const [buttonNextDisabled, setButtonNextDisabled] = useState('');//для добавления класса disable кнопке next
  const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState('');//для добавления класса disable кнопке disabled
  const [currentPageActive, setCurrentPageActive] = useState('');//для добавления класса active кнопке
  const [searchText, setSearchText] = useState('');//для поиска
  // const [search, setSearch] = useState({ searchValue: '', fieldQuery: '', fieldTarget: '' });

  //загрузка данных
  useEffect(() => {
    // axios.get(baseUrl).then((res) => {
    // setContactData(res.data)
    setIsLoading(false)
    setIsLoaded(true)
    // })
  }, [])

  const currentPage = (pg) => {
    setCurrentPageNumber(pg);
    setButtonNextDisabled('')
    setButtonPreviousDisabled('')
    setCurrentPageActive('active')
  }

  const onSearchSend = (text) => {
    setSearchText(text);
    // console.log('text', text)
  }
  // функция для фильтрации
  const getFiltredData = () => {
    if (!searchText) {
      return contactData
    }
    return contactData.filter(
      el => {
        return el['name'].toLowerCase().includes(searchText.toLowerCase())
      }
    )
  }
  // const onSearchSend = (searchValue, fieldQuery, fieldTarget) => {
  //   setSearch({ searchValue, fieldQuery, fieldTarget });
  // console.log('text', text)
  // }
  // const filterItems = (items, search) => {
  //   console.log('filterItems: ');
  //   console.log(search);
  //   if (search.fieldQuery === '' & search.searchValue === '' & search.fieldTarget === '') {
  //     return items
  //   };
  //   const filteredItems = items.filter((item) => {
  //     return (
  //       search.fieldQuery !== 'соодержит' ? (
  //         search.fieldQuery === 'меньше' ? item.fieldTarget < Number(search.searchValue) :
  //           (search.fieldQuery === 'больше' ? item.fieldTarget > Number(search.searchValue) :
  //             item.fieldTarget = Number(search.searchValue))
  //       ) : (
  //         item.name.toLowerCase().includes(search.searchValue.toLowerCase().trim())
  //       )
  //     );
  //   });
  //   return filteredItems;
  // }

  const filtredData = getFiltredData()
  console.log('filtredData', filtredData)

  const lastBlockRow = currentPageNumber * limitCountPage;
  const firstBlockRow = lastBlockRow - limitCountPage;
  const currentBlockRows = filtredData.slice(firstBlockRow, lastBlockRow);

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    setTotalCountRow(contactData.length)
    const getTotalCountPage = totalCountRow / limitCountPage
    setTotalCountPage(getTotalCountPage)

    currentPage()
  }, [isLoaded, setTotalCountRow, contactData.length, setTotalCountPage, totalCountRow])


  let pages = []
  for (let i = 0; i <= totalCountPage; i++) {
    pages.push(i + 1)
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
  //функция добавления класса disable кнопке next
  const onNextClick = () => {
    if (currentPageNumber > totalCountPage) {
      setButtonNextDisabled('disabled')
      return
    }
    setButtonPreviousDisabled('')
    setCurrentPageNumber(currentPageNumber + 1)
  }

  //функция добавления класса disable кнопке Previous
  const onPreviousClick = () => {
    if (currentPageNumber <= 1) {
      setButtonPreviousDisabled('disabled')
      return
    }
    setButtonNextDisabled('')
    setCurrentPageNumber(currentPageNumber - 1)
  }



  return (
    <div className="app">
      {isLoading ?
        <Loader /> :
        <div className='page'>
          <Tabl
            fieldTarget={fieldTarget}
            setFieldTarget={setFieldTarget}
            sortData={sortData}
            contactData={currentBlockRows}
            directionSort={directionSort}
            onSearchSend={onSearchSend}
            fieldQuery={fieldQuery}
            setFieldQuery={setFieldQuery}
            searchValue={searchValue}
            setsearchValue={setsearchValue}
          />
          <Poginator
            pages={pages}
            currentPage={currentPage}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            buttonNextDisabled={buttonNextDisabled}
            buttonPreviousDisabled={buttonPreviousDisabled}
            currentPageActive={currentPageActive}
            currentPageNumber={currentPageNumber}
          />
        </div>
      }
    </div>
  );
}

export default App;
