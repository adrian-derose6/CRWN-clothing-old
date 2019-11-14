import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import './collection.styles.scss';

class CollectionList extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStart, category } = this.props;
        const tagCode = category.tagCodes[0];

        fetchCollectionsStart(tagCode);
    }

    render() {
        const { category, categoryId } = this.props;
        return (
            <div className='collection-page'> 
                <h2 className='title'>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} {category.CatName}</h2>
                <div className='items'>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    collection: state.shop.collection,
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: collectionsMap => dispatch(fetchCollectionsStart(collectionsMap)),
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionList);