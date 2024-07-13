import style from "./Editor.module.css";
import { EditPlayerView } from "./EditPlayerView.tsx";
import NewPlayerView from "./NewPlayerView";
import * as State from "./State.ts";

function getEditorContent() {
    const selectedIndex = State.selected.value;
    if (selectedIndex == null) {
        return <NewPlayerView />;
    } else {
        const selectedPlayer = State.players.value[selectedIndex];
        return <EditPlayerView
            index={selectedIndex}
            name={selectedPlayer.name}
            score={selectedPlayer.score}
        />;
    }
}

export default function Editor() {
    return <div class={style.root}>{getEditorContent()}</div>;
}
