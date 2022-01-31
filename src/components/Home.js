import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Button, Grid, Paper, IconButton, TextField, InputAdornment } from '@material-ui/core';
import { useHomeStyles } from './Styles';

import folder from '../images/folder.png';
import empty from '../images/empty.png';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';


function Home() {
    const classes = useHomeStyles();

    const defaultEditingGroup = { _id: '', name: '' };

    const [groups, setGroups] = useState([]);
    const [inputGroupName, setInputGroupName] = useState('');
    const [editingGroup, setEditingGroup] = useState(defaultEditingGroup);

    const fetchGroups = async () => {
        const uid = localStorage.getItem('userId');
        const response = await axios.get(`${process.env.REACT_APP_PROXY}/memoryGroup/getAll/${uid}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });
        setGroups(response.data);
    }

    const createGroup = async () => {
        const newGroup = {
            name: inputGroupName,
            uid: localStorage.getItem('userId')
        }

        await axios.post(`${process.env.REACT_APP_PROXY}/memoryGroup/create`, newGroup, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });

        setInputGroupName('');
        fetchGroups();
    }

    const deleteGroup = async (groupId) => {
        await axios.delete(`${process.env.REACT_APP_PROXY}/card/deleteAll/${groupId}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });

        await axios.delete(`${process.env.REACT_APP_PROXY}/memoryGroup/delete/${groupId}`, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });
        fetchGroups();
    }

    const updateGroup = async () => {
        const modifiedGroup = {
            groupId: editingGroup._id,
            name: editingGroup.name
        }

        await axios.put(`${process.env.REACT_APP_PROXY}/memoryGroup/update`, modifiedGroup, {
            headers: {
                'auth': localStorage.getItem('userToken')
            }
        });

        setEditingGroup(defaultEditingGroup);
        fetchGroups();
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <>
            <div className={classes.newGroupTextFieldContainer}>
                <TextField className={classes.newGroupTextField} value={inputGroupName} onChange={(e) => setInputGroupName(e.target.value)} label="New Group" color="primary" variant='outlined' />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createGroup}
                >
                    Create
                </Button>
            </div>
            {
                (groups.length === 0) ? (
                    <div className={classes.emptyLogoContainer}>
                        <img className={classes.emptyLogo} src={empty} alt='Empty' />
                        <h1 style={{ color: 'red' }}>Empty</h1>
                    </div>
                ) : (
                    <Paper elevation={3} className={classes.groupsContainer}>
                        <Grid container alignItems='center' spacing={2}>
                            {
                                groups.map((group) => {
                                    return (
                                        <Grid key={group._id} item xs={12} sm={4} md={3}>
                                            <div className={classes.groupContainer}>
                                                <Link to={`/memory/${group._id}`}>
                                                    <img src={folder} alt="folder" className={classes.groupLogo} />
                                                </Link>
                                                {
                                                    editingGroup._id === group._id ?
                                                        (
                                                            <TextField
                                                                className={classes.editGroupInput}
                                                                onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                                                                focused
                                                                id="groupEditInput"
                                                                label="Edit Name"
                                                                value={editingGroup.name}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton onClick={updateGroup}>
                                                                                <DoneIcon />
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        ) :
                                                        (
                                                            <h2 className={classes.groupName}>{group.name}</h2>
                                                        )
                                                }
                                                <Paper elevation={2} className={classes.groupModifyIconsContainer}>
                                                    <IconButton onClick={() => setEditingGroup(group)}>
                                                        <EditIcon className={classes.groupModifyIcon} />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteGroup(group._id)}>
                                                        <DeleteIcon className={classes.groupModifyIcon} />
                                                    </IconButton>
                                                </Paper>
                                            </div>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Paper>
                )
            }
        </>
    );
}

export default Home;
