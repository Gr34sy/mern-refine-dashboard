export interface ReviewCardProps {
    id?: BaseKey | undefined,
    property: Object | undefined,
    creator: Object,
    rating: number,
    showRatingNumber: boolean,
    description: string | undefined,
}