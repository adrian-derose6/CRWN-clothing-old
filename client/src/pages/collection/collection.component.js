import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component.js';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectCollection } from '../../redux/shop/shop.selectors.js';

import './collection.styles.scss';

const CollectionPage = ({ fetchCollectionsStart }) => {
    const { categoryId, collectionId, subcollectionId } = useParams();
    const match = useRouteMatch();
    console.log(match);
    useEffect(() => {
    }, []);

    return (
        <div className='collection-page'>
            
            <h2 className='title'>{categoryId} {collectionId} {subcollectionId}</h2>
            <div className='items'>
                {}
                {/*
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                */}
            </div>
        </div>
    )
}

/*const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});*/

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: collectionsMap => dispatch(fetchCollectionsStart(collectionsMap))
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionPage);