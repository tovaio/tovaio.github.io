import React, { useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';

import GameOfLife from './GameOfLife';

import styles from './Banner.module.scss';
import arrowDown from './Arrow-down.svg';

const HighlightSpan: React.FC = props => {
    return (
        <span>
            {props.children}
        </span>
    )
}

const Banner: React.FC = () => {
    const [ scrollTop, setScrollTop ] = useState(document.body.scrollTop);
    const [ isHovering, setIsHovering ] = useState(false);
    const scrollEventRef = useRef(false);
    const debounceRef = useRef(false);

    if (!(scrollEventRef.current)) {
        document.body.onscroll = () => {
            if (debounceRef.current && document.documentElement.scrollTop !== 0) return;
            debounceRef.current = true;
            setScrollTop(Math.min(document.documentElement.scrollTop/50, 10));
            setTimeout(() => {debounceRef.current = false}, 100);
        }
        scrollEventRef.current = true;
    }

    const golDim = isMobile ? 15 : 30;

    return (
        <div className={styles.banner}>
            <div className={styles.bannerBackground}>
                <GameOfLife
                    nRows={golDim}
                    nCols={golDim}
                    cellSize={'1fr'}
                    tickTime={100}
                    spawnTime={1000}
                />
            </div>
            <div
                className={styles.bannerContainer}
                style={{ backdropFilter: isMobile ? 'none' : `blur(${scrollTop}px)` }}
            >
                <h1>
                    hi, i'm <HighlightSpan>to</HighlightSpan>mmy <HighlightSpan>va</HighlightSpan>dakumchery! <br/>
                    check out my portfol<HighlightSpan>io</HighlightSpan>!
                </h1>
                <button
                    onMouseEnter={() => {setIsHovering(true);}}
                    onMouseOut={() => {setIsHovering(false);}}
                    onClick={() => {
                        const content = document.getElementById('content');
                        content!.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                    }}
                >
                    check it out!
                </button>
                {!isMobile ? <img src={arrowDown} alt='' className={isHovering ? styles.on : ''}/> : null}
            </div>
        </div>
    )
}



export default Banner;