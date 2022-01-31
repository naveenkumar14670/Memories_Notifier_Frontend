import React from 'react';

import { Tab, Tabs } from '@material-ui/core';

import Home from './Home';
import Upcoming from './Upcoming';

import TodayRoundedIcon from '@material-ui/icons/TodayRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

function LandingPage() {
    const [page, setPage] = React.useState(0);
    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    return (
        <>
            <Tabs
                value={page}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab icon={<HomeRoundedIcon />} label="Home" />
                <Tab icon={<TodayRoundedIcon />} label="Upcoming" />
            </Tabs>
            {(page === 0) && <Home />}
            {(page === 1) && <Upcoming />}
        </>
    );
}

export default LandingPage;

