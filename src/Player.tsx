import * as State from "./State.ts";
import style from "./Player.module.css"

export type PlayerProps = {
    index: number,
    name: string,
    score: number
};

export function Player(props: PlayerProps) {
    function decrementScore(event: Event) {
        State.editPlayer(props.index, undefined, props.score - 1);
        event.stopPropagation();
    }
    function incrementScore(event: Event) {
        State.editPlayer(props.index, undefined, props.score + 1);
        event.stopPropagation();
    }
    function toggleSelect(event: Event) {
        // Toggle selected/unselected when the player item is clicked.
        if (State.selected.value == props.index) {
            State.selected.value = null;
        } else {
            State.selected.value = props.index;
        }
        event.stopPropagation();
    }

    return <div class={style.root} selected={State.selected.value == props.index} onClick={toggleSelect}>
        <button class={style.btn} onClick={decrementScore}>➖</button>
        <div class={style.center}>
            <p class={style.name}>{props.name}</p>
            <p class={style.score}>{props.score}</p>
        </div>
        <button class={style.btn} onClick={incrementScore}>➕</button>
    </div>;
}
