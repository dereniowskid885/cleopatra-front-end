import classes from '../../styles/Background.module.scss';
import Fade from 'react-reveal/Fade';

function Background() {
    return (
        <Fade>
            <div className={classes.background}></div>
        </Fade>
    );
}

export default Background;
