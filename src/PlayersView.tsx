import { Player } from "./Player";
import style from "./PlayersView.module.css"
import * as State from "./State.ts"

export default function PlayersView() {
    function deselect(event: Event) {
        State.selected.value = null;
        event.stopPropagation();
    }

    return <div class={style.root} onClick={deselect}>
        {State.players.value.map((player, index) => {
            return <Player index={index} name={player.name} score={player.score} />;
        })}
    </div>;
}
