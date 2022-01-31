import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { InputBase } from '@material-ui/core';
import { useSingleGroupStyles } from './Styles';

import SearchIcon from '@material-ui/icons/Search';

import NewCardModel from './NewCardModel';
import CardsContainer from './CardsContainer';

function SingleGroup() {
    const { groupId } = useParams();
    const classes = useSingleGroupStyles();

    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [groupName, setGroupName] = useState('');

    const fetchCards = async () => {
        const response = await axios.get(`${process.env.REACT_APP_PROXY}/card/getAll/${groupId}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });
        setCards(response.data);
        setFilteredCards(response.data);
    };

    const deleteCard = async (cardId) => {
        await axios.delete(`${process.env.REACT_APP_PROXY}/card/delete/${cardId}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });
        fetchCards();
    }

    const handleSearch = (searchInput) => {
        searchInput = searchInput.toLowerCase();
        let newCards = (searchInput === '') ? [...cards] : cards.filter((card) => card.name.toLowerCase().includes(searchInput));
        setFilteredCards(newCards);
    }

    useEffect(() => {
        const getGroupName = async () => {
            const response = await axios.get(`${process.env.REACT_APP_PROXY}/memoryGroup/getGroupName/${groupId}`, {
                headers: {
                    'auth': localStorage.getItem('userToken')
                }
            });
            setGroupName(response.data);
        };
        getGroupName();
        fetchCards();
    }, []);

    return (
        <>
            <div className={classes.singleGroupContainer}>
                <div className={classes.singleGroupTitleContainer}>
                    <h1 className={classes.singleGroupTitle}>{`${groupName} Group`}</h1>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={(e) => handleSearch(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
                <NewCardModel groupId={groupId} fetchCards={fetchCards} />
                <CardsContainer cards={filteredCards} deleteCard={deleteCard} />
            </div>
        </>
    );
}

export default SingleGroup;
