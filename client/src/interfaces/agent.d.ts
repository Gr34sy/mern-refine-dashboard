import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfProperties: number,
    location: string,
    phone: string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string,
}
