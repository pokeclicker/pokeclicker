export enum TrackingMode {
    Total,
    Gain,
    Display,
}

export type TrackingModeConfig = {
    text: string;
    description: string;
};

export const TrackingModeConfigs: Record<TrackingMode, TrackingModeConfig> = {
    [TrackingMode.Total]: {
        text: 'Total',
        description: 'Tracks the current amount of the configured objective, including decreases.',
    },
    [TrackingMode.Gain]: {
        text: 'Gain',
        description: 'Starts the current amount from zero, does not track decreases.',
    },
    [TrackingMode.Display]: {
        text: 'Display',
        description: 'Displays the current amount without tracking progress toward a goal.',
    },
};
