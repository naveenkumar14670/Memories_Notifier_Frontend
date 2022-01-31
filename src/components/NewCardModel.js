import React, { useState } from 'react';
import axios from 'axios';

import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';
import { useNewCardModelStyles } from './Styles';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import cake from '../images/cake.jpg';

function NewCardModel({ groupId, fetchCards }) {
    const classes = useNewCardModelStyles();

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date('2000-11-23'));
    const [uploadedImage, setUploadedImage] = useState('');
    const [previewImage, setPreviewImage] = useState("");

    const handleInputValue = (event) => {
        setInputValue(event.target.value);
    }
    const handleDateChange = (date) => {
        setSelectedDate(new Date(date));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setInputValue('');
        setSelectedDate(new Date('2000-11-23'));
        setUploadedImage('');
        setPreviewImage('');
        setOpen(false);
    };

    const handleUploadImage = async (file) => {
        setUploadedImage(file);
        const base64 = await convertBase64(file);
        setPreviewImage(base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const createCard = async () => {
        const newCard = new FormData();
        newCard.append('name', inputValue);
        newCard.append('dob', selectedDate);
        newCard.append('groupId', groupId);
        newCard.append('email', localStorage.getItem('userEmail'));
        newCard.append('imageUrl', uploadedImage);

        await axios.post(`${process.env.REACT_APP_PROXY}/card/create`, newCard, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });

        handleClose();
        fetchCards();
    }

    return (
        <>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Create New Card
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>New Birthday Card</DialogTitle>
                <DialogContent className={classes.modalContainer}>
                    <div className={classes.formPart}>
                        <DialogContentText>
                            To create new card, please enter Name, Birthdate and provide an Image if necessary.
                        </DialogContentText>
                        <TextField
                            value={inputValue}
                            onChange={handleInputValue}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2000-11-23"
                            onChange={(e) => handleDateChange(e.target.value)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={(e) => handleUploadImage(e.target.files[0])}
                            />
                            <label htmlFor="contained-button-file">
                                <p>Choose picture to upload</p>
                                <Button variant="contained" color="default" component="span" startIcon={<CloudUploadIcon />}>
                                    Upload
                                </Button>
                            </label>
                        </>
                    </div>
                    <div className={classes.previewPart}>
                        <h3>Preview</h3>
                        <Card elevation={3} className={classes.cardContainer}>
                            <div className={classes.cardTextPart}>
                                <Typography component="h5" variant="h5">
                                    {inputValue}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()}
                                </Typography>
                            </div>
                            <img src={previewImage === '' ? cake : previewImage} alt="card holder" className={classes.cardImagePart} />
                        </Card>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createCard} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NewCardModel;
