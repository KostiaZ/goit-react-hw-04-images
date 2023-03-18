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
  const [isLoading] = useState(false);
  const [openModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getData();
  }, [searchQuery, page]);
  useEffect(() => {
    handleScroll();
  });

  const toggleModal = () => {
    setIsOpenModal(!openModal);
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
