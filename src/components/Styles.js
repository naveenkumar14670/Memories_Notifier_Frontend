import { makeStyles, alpha } from '@material-ui/core/styles';

/* Register.js Page Styles */

const useRegisterStyles = makeStyles((theme) => ({
    signUpContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30%',
    },
    signUpIcon: {
        margin: '5px',
        backgroundColor: theme.palette.primary.light
    },
    signUpFormContainer: {
        marginTop: '3px'
    },
    signUpButton: {
        margin: '20px 0'
    },
    copyright: {
        marginTop: '10%'
    }
}));

/* Login.js Page Styles */

const useLoginStyles = makeStyles((theme) => ({
    signInContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30%',
    },
    signInIcon: {
        margin: '5px',
        backgroundColor: theme.palette.primary.light
    },
    signInFormContainer: {
        marginTop: '3px'
    },
    signInButton: {
        margin: '20px 0'
    },
    copyright: {
        marginTop: '10%'
    }
}));

/* Home.js Page Styles */

const useHomeStyles = makeStyles((theme) => ({
    newGroupTextFieldContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    newGroupTextField: {
        width: '30%',
        marginRight: '10px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            flexDirection: 'column',
            marginBottom: '10px'
        },
    },
    groupsContainer: {
        padding: '30px',
        margin: '10px 40px',
    },
    groupContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    groupLogo: {
        width: '70%',
        cursor: 'pointer',
        transition: 'transform 300ms ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'translateY(4px)',
        },
    },
    groupName: {
        color: '#1A1A40',
        textTransform: 'Capitalize',
        fontWeight: 'bolder',
        fontSize: '25px'
    },
    groupModifyIconsContainer: {
        fontSize: 'large',
    },
    groupModifyIcon: {
        '&:hover': {
            color: 'red'
        }
    },
    editGroupInput: {
        margin: '10px 10px 20px 10px'
    },
    emptyLogoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyLogo: {
        width: '30%',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '70%'
        }
    }
}));

/* Navbar.js Page Styles */

const useNavbarStyles = makeStyles((theme) => ({
    titleContainer: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
    },
    titleLogo: {
        fontSize: '50px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '30px'
        }
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        fontFamily: 'helvetica',
        marginLeft: 10,
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px'
        }
    },
}));

/* SingleGroup.js Page Styles */

const useSingleGroupStyles = makeStyles((theme) => ({
    singleGroupContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    singleGroupTitleContainer: {
        backgroundColor: '#393E46',
        color: '#EEEEEE',
        width: '50%',
        borderRadius: '10px',
        boxShadow: '2px 2px 2px black',
        padding: '10px',
        margin: '10px',
        textTransform: 'capitalize',
        [theme.breakpoints.down('sm')]: {
            width: '85%'
        }
    },
    singleGroupTitle: {
        textAlign: 'center',
        color: '#F9ED69',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

/* CardsContainer.js Page Styles*/

const useCardsContainerStyles = makeStyles((theme) => ({
    cardsContainer: {
        width: '90vw',
        margin: '10px',
        padding: '20px'
    },
    cardContainer: {
        height: '160px',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
    },
    cardTextPart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '60%',
        fontSize: '10px'
    },
    cardImagePart: {
        width: '40%',
    },
    deleteIcon: {
        '&:hover': {
            color: 'red'
        }
    },
    emptyLogo: {
        width: '30%',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '70%'
        }
    }
}));

/* NewCardModel.js Page Styles */

const useNewCardModelStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    formPart: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%',
            width: '90%',
            textAlign: 'center'
        }
    },
    previewPart: {
        width: '50%',
        margin: '10px 20px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
    },
    cardTextPart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '60%',
    },
    cardImagePart: {
        width: '40%',
    },
}));

/* Upcoming.js Page Styles */

const useUpcomingStyles = makeStyles((theme) => ({
    upcomingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    upcomingCardContainer: {
        width: '90vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px 20px',
        marginBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            width: '60vw'
        }
    },
    upcomingMonth: {
        backgroundColor: '#1C6DD0',
        color: 'white',
        fontSize: '20px',
        padding: '5px 20px',
        margin: '30px 0',
        borderRadius: '25px',
        boxShadow: '2px 3px 3px black'
    },
    upcomingCardName: {

    },
    upcomingCardImage: {
        width: '20%',
        borderRadius: '10px',
        boxShadow: '1px 1px 1px black',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    upcomingCardTags: {
        padding: '10px',
    },
    upcomingCardGroupName: {
        color: 'white',
        fontSize: '15px',
        padding: '5px 10px',
        marginRight: '10px',
        borderRadius: '5px',
    },
    emptyLogo: {
        width: '30%',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '70%'
        }
    }
}));

export { useRegisterStyles, useLoginStyles, useHomeStyles, useNavbarStyles, useSingleGroupStyles, useCardsContainerStyles, useNewCardModelStyles, useUpcomingStyles };