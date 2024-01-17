import styles from './imageGallery.module.css';
import PropTypes from "prop-types";
import { fetchData, setLocalStorage } from 'helpers/helpers';
import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';



export const ImageGallery = ({ searchWord }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [totalHits, setTotalHits] = useState(0);
    const [photosLenght, setPhotosLength] = useState(0);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState([]);
    const [btnLoadMore, setBtnLoadMore] = useState(false);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [modalItem, setModalItem] = useState([]);

    useEffect(() => {
        setSearch(searchWord)
    }, [searchWord]);


    useEffect(() => {
        if (search !== searchWord) {
            setQuery([]);
            setPage(1);
            setTotalHits(0);
            setPhotosLength(0);
            setIsLoading(false);
            setSearch(searchWord);
            setIsMounted(false);
        }
    }, [search, searchWord]);

    useEffect(() => {
        if (typeof (search) === 'object') {
            return
        }
     
        const fetchDataAndUpdateState = async () => {

            setIsLoading(true);
            try {
                const data = await fetchData(search, page);
                setQuery(prevQuery => [...prevQuery, ...data.photos]);
                setTotalHits(data.total_results)
                setPhotosLength(data.photos.length);
                setIsMounted(true);
            } catch {
                toast.error("Something wrong...");
            } finally {
                setIsLoading(false);
            }

        }
        if (search) {
            fetchDataAndUpdateState();
        }
    }, [search, page]);

    useEffect(() => {
        setLocalStorage('query', { query })
    }, [query]);



    useEffect(() => {
        if (isMounted) {
            if (totalHits === 0) {
                toast.info("Nothing found!Please enter another word")
            }
            if (totalHits !== 0 && page === 1) {
                toast.info(`We found ${totalHits} pictures!`)
            }
        }
        return setIsMounted(false);
    }, [isMounted, totalHits, search, searchWord, page])

    useEffect(() => {
        if (totalHits > 12) {
            setBtnLoadMore(true)
        }
        if (photosLenght <= 11) {
            setBtnLoadMore(false)
        }
    }, [totalHits, photosLenght])
  
    


    
    const handleClickLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };
    const handleClickGalleryItem = (id) => {
        const currentItemInfo = query.find(item => item.id === id)
        if (currentItemInfo) {
            setModalItem(currentItemInfo);
            setIsModal(true);
        }
    }
    
    const elements = query
        ? query.map(({ id, src, alt }) => (
            <ImageGalleryItem id={id} src={src} key={id} alt={alt} handleClick={handleClickGalleryItem} />
        ))
        : null;
    
        return (
            <div className='listImages'>
            <div className={styles.blockCards}>
                <ul className={styles.gallery}>{elements}</ul>
                {isLoading ? <Loader /> : btnLoadMore &&  <Button handleOnClickBtn={handleClickLoadMore} />}
                {isModal && <Modal arrayItem={modalItem} closeModal={() => setIsModal(false)}/>}
                </div>
                </div>
        );
    }



ImageGallery.propTypes = {
    search: PropTypes.string,
};
