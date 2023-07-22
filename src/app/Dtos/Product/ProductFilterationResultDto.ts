export interface ProductFilterationResultDto {
    id: number;
    name: string;
    price: number;
    image: string;
    discount: number;
    priceAfter: number;
    avgRating: number;
    avgRatingRounded: number;
    reviewCount: number;
    isInWishList:boolean

}