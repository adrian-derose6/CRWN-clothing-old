import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollections } from '../../redux/shop/shop.actions';

import './shop.styles.scss';

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollections } = this.props;
        
        fetchCollections();
    }

    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={CollectionsOverviewContainer}      
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer} 
                />
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCollections: collectionsMap => dispatch(fetchCollections(collectionsMap))
});

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);