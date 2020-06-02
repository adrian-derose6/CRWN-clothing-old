import React, { useState, Suspense } from 'react';

import { BackgroundImage } from './product-page.component';
import Spinner from '../../components/spinner/spinner.component';

import './product-page.styles.scss';

const ArticleSelector = ({ articlesList, onSelect, selectedArticle }) => {
    const [articleLabel, setArticleLabel] = useState(selectedArticle.colourDescription);

    if (!articlesList) return null;

    return (
        <div className='article-selector-container'>
            <span className='article-label'>{articleLabel}</span>
            <div className='slider'>
                {
                    articlesList.map((article, index) => {
                        const thumbnailUrl = `${article.fabricSwatchThumbnails[0].url}&call=url[file:/product/style]`;
                        const isSelected = article.colourDescription == selectedArticle.colourDescription;
                        
                        return (
                            <div 
                                className='image-container' 
                                key={index} 
                                onClick={() => onSelect(article)} 
                                onMouseEnter={() => setArticleLabel(article.colourDescription)}
                                onMouseLeave={() => setArticleLabel(selectedArticle.colourDescription)}
                                style={ isSelected ? {border: '1px solid #222222'} : null}
                            >
                                <BackgroundImage src={thumbnailUrl} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ArticleSelector;