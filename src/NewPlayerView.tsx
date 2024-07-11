import style from "./NewPlayerView.module.css";
import * as State from "./State.ts";

// Non-exported constant for a new player.
const newPlayer = {name: "New Player", score: 0} as const;

export default function NewPlayerView() {
    function addPlayerClicked(event: Event) {
        State.addPlayer(newPlayer);
        event.stopPropagation();
    }

    return <div class={style.root}>
        <p class={style.title}>No Player Selected</p>
        <p class={style.explanation}>
            To edit a player, select it from the list on the right.
            Or, click the button below to add a new one.
        </p>
        <button class={style.btn} onClick={addPlayerClicked}>Add New Player</button>
    </div>;
}
