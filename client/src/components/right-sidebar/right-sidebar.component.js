import React from 'react';
import { slide as Menu } from 'react-burger-menu'

import './right-sidebar.styles.scss';

class RightSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        }
    }

    showSettings = (event) => {
        event.preventDefault();
    }

    render() {
        const { children } = this.props;
        const { sidebarOpen } = this.state;
        return (
            <Menu right width={280} isOpen={sidebarOpen} className='.bm-menu-wrap .bm-menu .bm-outer'>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
            </Menu>
        );
    }
}

export default RightSidebar;