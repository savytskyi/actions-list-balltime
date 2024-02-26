import {useEffect, useState} from "react";
import {Player} from "../player/player_model";

export interface Action {
    id: string;
    firt_ball_side_out: boolean;
    global_score: number;
    local_score: number;
    out_of_system: boolean;
    player: Player;
    player_id: number;
    positional: any;
    quality: string;
    setter: any;
    skill_type: string;
    team: string;
    timestamp: number;
}

export function useActions() {
    const [actions, setActions] = useState<Action[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch('https://backend.balltime.com/videos-metadata',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        video_ids: ['ab15741c-1202-43e9-b548-ed64f977c2c8']
                    }),
                });
            const data = await response.json();

            console.log(data);

            const localActions: Action[] = [];
            data[0]['video_analysis'].forEach((action: any) => {
                action['actions'].forEach((a: any) => {
                    localActions.push(a);
                });
            });



            setActions(localActions);
        } catch (e) {
            alert('Error: ' + e.message);
        }
    }

    return {actions, setActions};
}
