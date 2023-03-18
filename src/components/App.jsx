import React, { useState, useEffect } from 'react';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Spinner from './Loader/Loader';

import fetchImages from './Service';

export default function App() {
  const [modalContent, setModalContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    // код, который будет вызываться только при изменении searchQuery или page
    getData();
  }, [searchQuery, page]);
  useEffect(() => {
    // код, который будет вызываться при каждом рендере компонента
    handleScroll();
  });

  const toggleModal = () => {
    setIsOpenModal(!openModal);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const hadleChangeQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setVisibleImages([]);
  };

  const getData = () => {
    if (searchQuery !== '' || page !== 1) {
      fetchImages(searchQuery, page)
        .then(({ hits }) => setVisibleImages([...visibleImages, ...hits]))
        .then(handleScroll)
        .catch(error => console.log(error.message));
    }
  };

  const handleNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const modalContentSet = itemId => {
    // const { visibleImages } = this.state;
    const element = visibleImages.find(({ id }) => id === itemId);
    console.log(element);
    setModalContent(element.largeImageURL);
  };

  const isNotLastPage = visibleImages.length / page === 12;
  const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;

  return (
    <div className="App">
      <SearchBar onSubmit={hadleChangeQuery} />
      {visibleImages.length === 0 ? (
        <h2>Enter your request</h2>
      ) : (
        <>
          <ImageGallery
            images={visibleImages}
            onClick={toggleModal}
            onItemClick={modalContentSet}
          />

          {openModal && (
            <Modal content={modalContent} onBackdrop={toggleModal} />
          )}
          {isLoading && <Spinner />}

          {btnEnable && <Button name="Load more" onPress={handleNextPage} />}
        </>
      )}
    </div>
  );
}

// class App extends Component {
//   state = {
//     modalContent: "",
//     searchQuery: "",
//     page: 1,
//     visibleImages: [],
//     isLoading: false,
//     openModal: false,
//   };

//   componentDidUpdate(prevProps, { searchQuery, page }) {
//     if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
//       console.log(searchQuery);
//       console.log(this.state.searchQuery);
//       console.log(page);
//       console.log(this.state.page);
//       this.getData();
//     }
//     this.handleScroll();

//     // if (page !== this.state.page) {
//     //   this.getData();
//     // }
//   }

//   toggleModal = () => {
//     this.setState(({ openModal }) => ({ openModal: !openModal }));
//   };

//   toggleLoading = () => {
//     this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
//   };

//   hadleChangeQuery = (query) => {
//     this.setState({
//       searchQuery: query,
//       page: 1,
//       visibleImages: [],
//     });
//   };

//   handleNextPage = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   handleScroll = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   modalContentSet = (itemId) => {
//     const { visibleImages } = this.state;
//     const element = visibleImages.find(({ id }) => id === itemId);
//     this.setState({ modalContent: element.largeImageURL });
//   };

// getData = () => {
//   const { searchQuery, page } = this.state;
//   this.toggleLoading();
//   fetchImages(searchQuery, page)
//     .then(({ hits }) => {
//       this.setState(({ visibleImages }) => {
//         return { visibleImages: [...visibleImages, ...hits] };
//       });
//     })
//     // .then(this.handleScroll)
//     .catch((error) => console.log(error.message))
//     .finally(this.toggleLoading);
// };

//   render() {
//     const { visibleImages, openModal, modalContent, isLoading, page } =
//       this.state;
//     const isNotLastPage = visibleImages.length / page === 12;
//     const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;
//     return (
//       <div className="App">
//         <SearchBar onSubmit={this.hadleChangeQuery} />
//         {visibleImages.length === 0 ? (
//           <h2>Enter your request</h2>
//         ) : (
//           <>
//             <ImageGallery
//               images={visibleImages}
//               onClick={this.toggleModal}
//               onItemClick={this.modalContentSet}
//             />

//             {openModal && (
//               <Modal content={modalContent} onBackdrop={this.toggleModal} />
//             )}
//             {isLoading && <Spinner />}

//             {btnEnable && (
//               <Button name="Load more" onPress={this.handleNextPage} />
//             )}
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
