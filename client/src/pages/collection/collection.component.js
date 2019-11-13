import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import './collection.styles.scss';

const CollectionPage = ({ fetchCollectionsStart }) => {
    const { categoryId, collectionId, subcollectionId } = useParams();
    const match = useRouteMatch();

    return (
        <div className='collection-page'> 
            <h2 className='title'>{categoryId} {collectionId} {subcollectionId}</h2>
            <div className='items'>
            </div>
        </div>
    )
}

/*const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});*/

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: collectionsMap => dispatch(fetchCollectionsStart(collectionsMap)),
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionPage);