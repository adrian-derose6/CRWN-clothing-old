import React from 'react';
import Collapsible from 'react-collapsible';

import expandIcon from '../../assets/expand-arrow.png';
import collapseIcon from '../../assets/collapse-arrow.png';

import FilterDropdownItem from '../filter-dropdown-item/filter-dropdown-item.component';

import { selectFilters } from '../../redux/shop/shop.selectors';

import './filter-dropdown.styles.scss';
import '../filter-dropdown-item/filter-dropdown-item.styles.scss';

const TriggerContainer = ({ label, open }) => (
    <div className='dropdown-item' style={open ? {background: 'lightgray'} : null}>
        <span className='trigger-label'>
            {label}
        </span>
        <img className='arrow' src={open ? collapseIcon : expandIcon} />
    </div>
);

class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            openedCollapsible: '', 
            selectedItems: []
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

    handleCollapsibleOpen = (key) => {
        this.setState({ openedCollapsible: key });
    }

    handleCollapsibleClose = () => {
        this.setState({ openedCollapsible: '' });
    }

    renderCollapsible = () => {
        const { list, facet, collectionName, categoryId } = this.props;
        const { openedCollapsible } = this.state;
        let collapsibles = {};

        list.forEach(item => {
            return collapsibles[item.type] ? collapsibles[item.type] = [...collapsibles[item.type], item] : collapsibles[item.type] = [item]
        });

        return (
            <div>
                {
                    Object.keys(collapsibles).map((key, index) => ( 
                        <Collapsible 
                            trigger={<TriggerContainer label={key} open={(key === openedCollapsible)}/>} 
                            key={index} 
                            onOpen={() => this.handleCollapsibleOpen(key)}
                            onClose={this.handleCollapsibleClose}
                        >
                            {
                                collapsibles[key].map((item, index) => (
                                    <FilterDropdownItem 
                                        label={item.name} 
                                        number={item.count}
                                        key={index}
                                        type={facet}
                                        item={item}
                                        selected={this.isItemSelected(item)}
                                        categoryId={categoryId}
                                        collectionName={collectionName}
                                    />
                                ))
                            }
                        </Collapsible>
                    ))
                }
            </div>
        )
    }

    isItemSelected = (item) => {
        const { filters } = this.props;

        if (filters.filter(filter => JSON.stringify(filter) === JSON.stringify(item)).length >= 1) return true;
        
        return false;
    }

    render() {
        const { label, list, facet, categoryId, collectionName } = this.props;
        const { listOpen } = this.state;
        
        if (!list) return null;

        return (
            <div className='filter-dropdown' ref={this.setWrapperRef}>
                <button className='filter-tab' onClick={() => this.toggleList()}>
                    <span className='label'>{label}</span>
                    <img className='arrow' src={listOpen ? collapseIcon : expandIcon} />
                </button>
                <div className={`${listOpen ? 'open' : 'closed'} dropdown-container`} >
                    {
                        (facet === 'sizes') ? 
                            this.renderCollapsible() 
                        :
                            list.map((item, index) => (
                                <FilterDropdownItem 
                                    label={item.name}
                                    key={index}
                                    type={facet}
                                    item={item}
                                    selected={this.isItemSelected(item)}
                                    categoryId={categoryId}
                                    collectionName={collectionName}
                                />
                            ))
                    }
                </div>
            </div>
        );
    }
}

export default FilterDropdown;