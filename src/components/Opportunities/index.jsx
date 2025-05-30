import React from "react";
import { Link } from "react-router-dom";
import styles from "./styled.module.css";

import { ReactComponent as Arrow1 } from "../../icons/arrow1.svg";
import { ReactComponent as Arrow2 } from "../../icons/arrow2.svg";
import { ReactComponent as Arrow3 } from "../../icons/arrow3.svg";
import { ReactComponent as Arrow4 } from "../../icons/arrow4.svg";


const arrows = [<Arrow1 />, <Arrow2 />, <Arrow3 />, <Arrow4 />, <Arrow1 />];

export const Opportunities = () => {
    const steps = [
        <Link className={styles.stepLink} to="tickets">
            Choose your destination
        </Link>,
        <Link className={styles.stepLink} to="tickets">
            Find your tickets
        </Link>,
        <Link className={styles.stepLink} to="hotels">
            Book your hotel
        </Link>,
        <Link className={styles.stepLink} to="places">
            Pick your must-see places
        </Link>,
        <Link className={styles.stepLink} to="routes">
            Enjoy your perfectly planned trip
        </Link>,
        "Complete trips and earn rewards",
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>Start now</h2>
                <div className={styles.grid}>
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`${styles.step} ${
                                    index % 2 === 0 ? styles.right : styles.left
                                }`}
                            >
                                {step}
                            </div>
                            {index < arrows.length && (
                                <div className={styles.arrow}>{arrows[index]}</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
