

import Styles from './CardsListSection.module.css'
import Link from 'next/link';
import Card from '../Card/Card';




export default function CardsList(props) {

    return (
        <ul className={Styles["cards-list"]}>
            {props.data.map((item) => {
                return (
                    <li className={Styles["cards-list__item"]} key={item.id}>
                        <Link href={`/` + `games/${item.id}`} className={Styles["card-list__link"]}>
                            <Card {...item} />
                        </Link>
                    </li>
                );
            })}
        </ul>
    )
}

