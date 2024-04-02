
import CardsList from "./CardList";
import CardListSlider from './CardListSlider'
import Styles from './CardsListSection.module.css'

export default function CardsListSection(props) {
    return (
        <section className={Styles["list-section"]} id={props.id}>
            <h2 className={Styles["list-section__title"]}  >
                {props.title}
            </h2>
            {props.type === 'slider' ? <CardListSlider data={props.data} /> : <CardsList data={props.data} />}
        </section>
    )
}