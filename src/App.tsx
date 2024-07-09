import style from "./App.module.css";
import PlayersView from "./PlayersView";
import Editor from "./Editor";

export default function App() {
    return <div class={style.root}>
        <PlayersView />
        <Editor />
    </div>;
}