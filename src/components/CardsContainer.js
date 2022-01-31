import React from 'react';

import { Card, Grid, IconButton, Typography } from '@material-ui/core';
import { useCardsContainerStyles } from './Styles';

import cake from '../images/cake.jpg';
import empty from '../images/empty.png';

import DeleteIcon from '@material-ui/icons/Delete';

function CardsContainer({ cards, deleteCard }) {
    const classes = useCardsContainerStyles();

    const getDate = (dob) => {
        const d = new Date(dob);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }

    return (
        <>
            {(cards.length === 0) ? (
                <>
                    <img className={classes.emptyLogo} src={empty} alt='Empty' />
                    <h1 style={{ color: 'red' }}>Empty</h1>
                </>
            ) : (
                <div className={classes.cardsContainer}>
                    <Grid container alignItems='center' spacing={2}>
                        {
                            cards?.map((card, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4}>
                                        <Card elevation={3} className={classes.cardContainer}>
                                            <div className={classes.cardTextPart}>
                                                <Typography component="h5" variant="h5">
                                                    {card.name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {getDate(card.dob)}
                                                </Typography>
                                                <IconButton onClick={() => deleteCard(card._id)}>
                                                    <DeleteIcon className={classes.deleteIcon} />
                                                </IconButton>
                                            </div>
                                            <img src={card.imageUrl === '' ? cake : `${process.env.REACT_APP_PROXY}/public/uploads/${card.imageUrl}`} alt="card holder" className={classes.cardImagePart} />
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            )}
        </>
    );
}

export default CardsContainer;
