import { computed, ReadonlySignal, Signal, signal } from "@preact/signals";

export type Player = {
    name: string;
    score: number;
};

export const players: Signal<Player[]> = signal([]);
export const selected: Signal<number | null> = signal(null);

export const selectedPlayer: ReadonlySignal<Player | null> = computed(() => {
    const index = selected.value;
    if (index == null) {
        return null;
    } else {
        return players.value[index];
    }
});

export function addPlayer(player: Player) {
    // Add a copy of the supplied player and set it to be selected.
    players.value = [...players.value, { ...player }];
    selected.value = players.value.length - 1;
}

export function deleteSelected() {
    const index = selected.value;
    if (index == null) return;

    // Remove selected player and set selected to null.
    players.value = players.value.slice(0, index).concat(players.value.slice(index + 1));
    selected.value = null;
}

export function editPlayer(playerIndex: number, name?: string, score?: number) {
    // Update the specified player with the supplied information.
    // Do not change which player (if any) is selected.
    players.value = players.value.map((player, index) => {
        if (index == playerIndex) {
            return {
                name: name == undefined ? player.name : name,
                score: score == undefined ? player.score : score
            };
        } else {
            return player;
        }
    });
}
