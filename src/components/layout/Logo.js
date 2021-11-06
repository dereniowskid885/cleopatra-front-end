import classes from '../../styles/Logo.module.scss'

function Logo() {
    return (
        <div className={classes.logo}>
            <h1 className={classes.logo__title}>Cleopatra</h1>
        </div>
    );
}

export default Logo;