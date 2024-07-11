import style from "./Editor.module.css";
import NewPlayerView from "./NewPlayerView";
import * as State from "./State.ts";

export default function Editor() {
    return <div class={style.root}>
        {State.selected.value == null ? <NewPlayerView /> : ""}
    </div>;
}
