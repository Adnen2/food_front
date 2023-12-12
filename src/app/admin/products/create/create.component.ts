import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FoodsService } from '../foods.service';
import { Foods } from '../foods';
import { FilePondComponent } from 'ngx-filepond';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  @ViewChild('myModel') myModal!: ElementRef;
  @ViewChild('myPond') myPond!: FilePondComponent;

  display = "none";

  foods: Foods = new Foods()
  constructor(private foodserv: FoodsService) { }
  ngOnInit(): void {
  }

  openModal() {
    this.display = "block";
  }

  closeModal() {
    this.display = "none";
  }
  chargefood() {
    const nameElement: HTMLInputElement = document.getElementById('name') as HTMLInputElement;
    const name: string = nameElement.value;
    const priceElement: HTMLInputElement = document.getElementById('price') as HTMLInputElement;
    const price = parseFloat(priceElement.value);
    const tagsElement: HTMLInputElement = document.getElementById('tags') as HTMLInputElement;
    const tags: string = tagsElement.value;
    const favoriteElement: HTMLInputElement = document.getElementById('favorite') as HTMLInputElement;
    const favorite = Boolean(favoriteElement.value);
    const starsElement: HTMLInputElement = document.getElementById('stars') as HTMLInputElement;
    const stars = parseFloat(starsElement.value);
    const imageUrlElement: HTMLInputElement = document.getElementById('imageUrl') as HTMLInputElement;
    const imageUrl: string = imageUrlElement.value;
    const originsElement: HTMLInputElement = document.getElementById('origins') as HTMLInputElement;
    const origins: string = originsElement.value;
    const cookTimeElement: HTMLInputElement = document.getElementById('cookTime') as HTMLInputElement;
    const cookTime: string = cookTimeElement.value;
    this.foods.setName(name)
    this.foods.setPrice(price)
    this.foods.setTags([tags])
    this.foods.setFavorite(favorite)
    this.foods.setStars(stars)
    this.foods.setImageUrl(imageUrl)
    this.foods.setOrigins([origins])
    this.foods.setCookTime(cookTime)
    console.log(this.foods)
  }
  ajoutArticle() {
    this.chargefood()
    console.log(this.foods)
    this.foodserv.create(this.foods).subscribe((data => {
      console.log(data)
      this.closeModal()
      window.location.reload();
    }))
  }
  onFileChanged(event: any) {
    const imageData = event.target.files[0];
    const data = new FormData();
    data.append('file', imageData);
    data.append('upload_preset', 'livrison_cloudinary');
    data.append('cloud_name', 'iset1234');
    data.append('public_id', imageData.name);

    fetch('https://api.cloudinary.com/v1_1/iset1234/image/upload/', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())  // Assuming Cloudinary returns JSON
      .then(res => {
        // Access the URL from the response and assign it
        this.foods.imageUrl = res.url;
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }

}