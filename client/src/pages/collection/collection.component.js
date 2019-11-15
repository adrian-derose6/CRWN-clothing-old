import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

import './collection.styles.scss';

class CollectionList extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStart, category } = this.props;
        const tagCode = category.tagCodes[0];
        const collectionName = category.CategoryValue;

        fetchCollectionsStart({ collectionName, tagCode });
    }

    shouldComponentRender = () => {
        const { collection } = this.props;

        if (!collection) return false;

        return true;
    }

    render() {
        const { category, categoryId } = this.props;

        if (!this.shouldComponentRender) return <Spinner />;

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
    collection: state.shop.collections,
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: queryParams => dispatch(fetchCollectionsStart(queryParams)),
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionList);