import React from 'react';

import styles from './Content.module.scss';

import linkedInFill from './LinkedInFill.svg';
import linkedInOutline from './LinkedInOutline.svg';
import gitHubFill from './GitHubFill.svg';
import gitHubOutline from './GitHubOutline.svg';
import resumeFill from './ResumeFill.svg';
import resumeOutline from './ResumeOutline.svg';

import riskystratsIcon from './riskystratsIcon.png';

interface LogoButtonProps {
    fillSrc: string,
    outlineSrc: string,
    href: string,
    label: string
}

const LogoButton: React.FC<LogoButtonProps> = props => {
    return (
        <div className={styles.logoButton}>
            <div>
                <a href={props.href} target='_blank' rel='noopener noreferrer'>
                    <img src={props.outlineSrc} alt={props.label} />
                    <img src={props.fillSrc} alt='' />
                </a>
            </div>
            <p>{props.label}</p>
        </div>
    )
}

const FlexRow: React.FC = props => {
    return (
        <div className={styles.flexRow}>
            {props.children}
        </div>
    )
}

const Header: React.FC = props => {
    return (
        <h1>
            {props.children}
        </h1>
    )
}

interface SectionProps {
    title: string
}

const Section: React.FC<SectionProps> = props => {
    return (
        <div className={styles.section}>
            <Header>- {props.title} -</Header>
            {props.children}
        </div>
    )
}

const Line: React.FC = props => {
    return (
        <p style={{textIndent: '3vw'}}>
            {props.children}
        </p>
    );
}

interface ProjectPanelProps {
    imgSrc: string,
    title: string
}

const ProjectPanel: React.FC<ProjectPanelProps> = props => {
    return (
        <div className={styles.projectPanel}>
            <img src={props.imgSrc} alt={props.title}/>
            <h2>- {props.title} -</h2>
            <p>{props.children}</p>
            <div className={styles.projectPanelButton}/>
        </div>
    )
}

const Content: React.FC = () => {
    return (
        <div
            id='content'
            className={styles.content}
        >
            <Section title='about me'>
                <Line>
                    hi! my name is tommy, and i am an undergraduate studying computer science at the Illinois Institute of Technology.
                    during my free time, i like to work on interesting coding projects! this site serves as a hub for these projects.
                </Line>
                <Line>
                    (if you are wondering, the pattern in the background above is a simulation of Conway's Game of Life.
                    it sporadically spawns new gliders, causing absolute chaos!)
                </Line>
            </Section>
            <Section title='quick links'>
                <FlexRow>
                    <LogoButton
                        label='linkedin'
                        fillSrc={linkedInFill}
                        outlineSrc={linkedInOutline}
                        href='https://www.linkedin.com/in/tommy-vadakumchery-6a4646185/'
                    />
                    <LogoButton
                        label='github'
                        fillSrc={gitHubFill}
                        outlineSrc={gitHubOutline}
                        href='https://www.github.com/tovaio/'
                    />
                    <LogoButton
                        label='résumé'
                        fillSrc={resumeFill}
                        outlineSrc={resumeOutline}
                        href='https://drive.google.com/file/d/1ysRZdrQAxO6yet8le-xgbWq2PV4MuDY9/view?usp=sharing'
                    />
                </FlexRow>
            </Section>
            <Section title='projects'>
                <FlexRow>
                    <ProjectPanel
                        imgSrc={riskystratsIcon}
                        title="risky strats"
                    >
                        Real-time RTS game based on <a href='https://www.roblox.com/games/316264464/RISKY-STRATS'>this game</a> of the same name.
                        <br/>
                        Currently under development!
                    </ProjectPanel>
                </FlexRow>
            </Section>
        </div>
    );
}

export default Content;