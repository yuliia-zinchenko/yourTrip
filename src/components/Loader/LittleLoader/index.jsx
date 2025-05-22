import css from "./styled.module.css";

export const LittleLoader = () => {
    return (
        <div className={css.loaderContainer}>
            <div className={css.spinner}></div>
        </div>
    );
};