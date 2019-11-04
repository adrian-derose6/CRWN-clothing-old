import ShopActionTypes from './shop.types.js';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils.js';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,  
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,  
    payload: collectionsMap
});

export const fetchCollectionsFailure= (error) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE, 
    payload: error
});

export const fetchCollections = () => {
    return async dispatch => {
        const collectionRef = await firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then( async snapshot => {
            const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
            
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error)))
    }
}