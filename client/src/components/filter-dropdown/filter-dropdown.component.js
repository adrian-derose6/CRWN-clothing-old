import React from 'react';

import expandIcon from '../../assets/expand-arrow.png';
import collapseIcon from '../../assets/collapse-arrow.png';

import FilterDropdownItem from '../filter-dropdown-item/filter-dropdown-item.component';

import './filter-dropdown.styles.scss';

class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event)  => {
        const { listOpen } = this.state;

        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && listOpen) {
            this.setState({ listOpen: false });
        }
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    render() {
        const { label, list } = this.props;
        const { listOpen } = this.state;

        return (
            <div className='filter-dropdown' ref={this.setWrapperRef}>
                <button className='filter-tab' onClick={() => this.toggleList()}>
                    <span className='label'>{label}</span>
                    <img className='arrow' src={listOpen ? collapseIcon : expandIcon} />
                </button>
                <div className={`${listOpen ? 'open' : 'closed'} dropdown-container`} >
                    {
                        list.map((item, index) => (
                            <FilterDropdownItem label={item.title} number={4}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default FilterDropdown;