import { useEffect, useRef, useState } from "preact/hooks";
import style from "./EditPlayerView.module.css";
import * as State from "./State.ts";

export type EditPlayerViewProps = {
    index: number;
    name: string;
    score: number;
}

// Helper for parsing a score out of text input. Returns null if the text
// does not represent a valid score.
function parseScore(scoreText: string): number | null {
    const trimmed = scoreText.trim();
    if (/^\-{0,1}[0-9]{1,}$/.test(trimmed)) {
        return parseInt(trimmed);
    }
    return null;
}

export function EditPlayerView({index, name, score}: EditPlayerViewProps) {
    // Local state for the text content of the input fields.
    const [nameText, setNameText] = useState(name);
    const [scoreText, setScoreText] = useState(score.toString());
    const [scoreTextValid, setScoreTextValid] = useState(true);

    // Ref hooks to check if a particular input field is focused. Used to avoid
    // updating input fields while they are being edited.
    const nameRef = useRef<HTMLInputElement>(null);
    const scoreRef = useRef<HTMLInputElement>(null);

    // If the selected player changes during the lifetime of this component,
    // flush the input fields with the data of the newly selected player.
    useEffect(() => {
        const selectedPlayer = State.selectedPlayer.value;
        if (selectedPlayer == null) return;
        setNameText(selectedPlayer.name);
        setScoreText(selectedPlayer.score.toString());
        setScoreTextValid(true);
    }, [index]);

    // If the name of the selected player changes, update the name field only
    // if it is not currently focused.
    useEffect(() => {
        const nameField = nameRef.current;
        if (nameField != null && document.activeElement !== nameField) {
            const selectedPlayer = State.selectedPlayer.value;
            if (selectedPlayer != null) {
                setNameText(selectedPlayer.name);
            }
        }
    }, [name]);

    // If the score of the selected player changes, update the score field only
    // if it is not currently focused.
    useEffect(() => {
        const scoreField = scoreRef.current;
        if (scoreField != null && document.activeElement !== scoreField) {
            const selectedPlayer = State.selectedPlayer.value;
            if (selectedPlayer != null) {
                setScoreText(selectedPlayer.score.toString());
                setScoreTextValid(true);
            }
        }
    }, [score]);

    function deleteClicked(event: Event) {
        State.deleteSelected();
        event.stopPropagation();
    }

    function nameEdited(event: Event) {
        // Update the local state for the input field text.
        const textfield = event.target as HTMLInputElement;
        const newNameText = textfield.value;
        setNameText(newNameText);

        // Edit the player.
        const newName = newNameText.trim();
        State.editPlayer(index, newName, undefined);
    }
    function nameBlur() {
        setNameText(State.players.value[index].name);   
    }

    function scoreEdited(event: Event) {
        // Update the local state for the input field text.
        const textfield = event.target as HTMLInputElement;
        const newScoreText = textfield.value;
        setScoreText(newScoreText);

        // Update the local state for the input field validity.
        const newScore = parseScore(newScoreText);
        setScoreTextValid(newScore != null);

        // Only edit the player if the new score is valid.
        if (newScore != null) {
            State.editPlayer(index, undefined, newScore);
        }
    }
    function scoreBlur() {
        setScoreText(State.players.value[index].score.toString());
        setScoreTextValid(true);
    }

    return <div class={style.root}>
        <div class={style.firstRow}>
            <p>Edit Player</p>
            <button onClick={deleteClicked}>🗑️</button>
        </div>
        <div class={style.subsequentRow}>
            <label for="editPlayerNameTextfield">Name</label>
            <input
                id="editPlayerNameTextfield"
                ref = {nameRef}
                type="text"
                value={nameText}
                onInput={nameEdited}
                onBlur={nameBlur}
            />
        </div>
        <div class={style.subsequentRow}>
            <label for="editPlayerScoreTextfield">Score</label>
            <input
                id="editPlayerScoreTextfield"
                ref={scoreRef}
                type="text"
                class={scoreTextValid ? "" : "invalid"}
                value={scoreText}
                onInput={scoreEdited}
                onBlur={scoreBlur}
            />
        </div>
    </div>;
}