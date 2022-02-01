import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Paper } from '@material-ui/core';
import { useUpcomingStyles } from './Styles';

import cake from '../images/cake.jpg';
import empty from '../images/empty.png';

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Upcoming() {
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const classes = useUpcomingStyles();

    const getGroupName = async (groupId) => {
        const response = await axios.get(`${process.env.REACT_APP_PROXY}/memoryGroup/getGroupName/${groupId}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });
        return response.data;
    };

    const fetchCards = async () => {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_PROXY}/card/getAll/user/${localStorage.getItem('userEmail')}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });

        let temp = response.data;
        temp.sort((x, y) => {
            const date1 = new Date(x.dob).getDate();
            const date2 = new Date(y.dob).getDate();
            const month1 = new Date(x.dob).getMonth();
            const month2 = new Date(y.dob).getMonth();
            if (month1 < month2)
                return -1;
            if (month1 > month2)
                return 1;
            if (date1 < date2)
                return -1;
            if (date1 > date2)
                return 1;
            return 0;
        });

        let cardsData = [];
        for (let i = 0; i < temp.length; i++) {
            const groupName = await getGroupName(temp[i].groupId);
            temp[i].groupName = groupName;
            cardsData.push(temp[i]);
        }
        setCards(cardsData);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const getDate = (dob) => {
        const d = new Date(dob);
        const currDate = new Date();
        let year = currDate.getFullYear();
        if (d.getMonth() < currDate.getMonth())
            year += 1;
        if ((d.getMonth() === currDate.getMonth()) && (d.getDate() < currDate.getDate()))
            year += 1;
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + year;
    }

    const isNewMonth = (index) => {
        if (index === 0)
            return true;
        const m1 = new Date(cards[index].dob).getMonth();
        const m2 = new Date(cards[index - 1].dob).getMonth();
        return (m1 !== m2);
    }

    const getMonthName = (dob) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(dob).getMonth();
        return months[d];
    }

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <>
            <div className={classes.upcomingContainer}>
                {
                    (loading === true) ? (
                        <span style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ClimbingBoxLoader color='#3f51b5' loading={loading} size={20} />
                        </span>
                    ) : (
                        (cards.length === 0) ? (
                            <>
                                <img className={classes.emptyLogo} src={empty} alt='Empty' />
                                <h1 style={{ color: 'red' }}>Empty</h1>
                            </>
                        ) : (
                            cards.map((card, index) => {
                                return (
                                    <>
                                        {
                                            isNewMonth(index) && (<span key={index} className={classes.upcomingMonth}>{getMonthName(card.dob)}</span>)
                                        }
                                        <Paper key={card._id} className={classes.upcomingCardContainer}>
                                            <img className={classes.upcomingCardImage} src={card.imageUrl === '' ? cake : `${process.env.REACT_APP_PROXY}/public/uploads/${card.imageUrl}`} alt='user' />
                                            <h2 className={classes.upcomingCardName}>{card.name}</h2>
                                            <div className={classes.upcomingCardTags}>
                                                <span className={classes.upcomingCardGroupName} style={{ backgroundColor: 'green' }}>
                                                    {card.groupName}
                                                </span>
                                                <span className={classes.upcomingCardGroupName} style={{ backgroundColor: 'crimson' }} >
                                                    {getDate(card.dob)}
                                                </span>
                                            </div>
                                        </Paper>
                                    </>
                                )
                            })
                        )
                    )
                }
            </div>
        </>
    );
}

export default Upcoming;
