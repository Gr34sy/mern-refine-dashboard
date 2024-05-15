export interface ReviewCardProps {
    id?: BaseKey | undefined,
    property: Object | undefined,
    creator: Object | undefined,
    rating: number,
    showRatingNumber: boolean,
    description: string | undefined,
}