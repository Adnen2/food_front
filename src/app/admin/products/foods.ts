export class Foods {
    _id!: object;
    name!: string;
    price!: number;
    tags!: string[];
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!: string;
    setName(name: string): void {
        this.name = name;
    }
    setPrice(price: number): void {
        this.price = price;
    }
    setTags(tags: string[]): void{
        this.tags = tags;
    }
    setFavorite(favorite: boolean){
        this.favorite = favorite;
    }
    setStars(stars: number): void{
        this.stars = stars;
    }
    setImageUrl(imageUrl: string): void{
        this.imageUrl = imageUrl;
    }
    setOrigins(origins: string[]): void{
        this.origins = origins;
    }
    setCookTime(cookTime: string): void{
        this.cookTime = cookTime;
    }
}
