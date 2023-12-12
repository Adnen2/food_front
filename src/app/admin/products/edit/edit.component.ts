// edit.component.ts
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodsService } from '../foods.service';
import { FilePondComponent } from 'ngx-filepond';
import { Foods } from '../foods';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() foodId!: object;

  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond!: FilePondComponent;
  display = 'none';
  foodsForm: FormGroup;

  constructor(private foodserv: FoodsService, private fb: FormBuilder) {
    this.foodsForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      tags: [''],
      favorite: [false],
      stars: [0],
      imageUrl: [''],
      origins: [''],
      cookTime: ['']
      // Add more form controls for other properties
    });
  }

  ngOnInit(): void {
    this.foodserv.find(this.foodId).subscribe(data => {
      this.foodsForm.patchValue(data); // Patch the form with retrieved data
    });
  }

  openModal() {
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }

  chargefood() {
    const formData = this.foodsForm.value;
    const foods: Foods = new Foods();
    foods.setName(formData.name);
    foods.setPrice(formData.price);
    foods.setTags([formData.tags]);
    foods.setFavorite(formData.favorite);
    foods.setStars(formData.stars);
    foods.setImageUrl(formData.imageUrl);
    foods.setOrigins([formData.origins]);
    foods.setCookTime(formData.cookTime);
    console.log(foods);
  }

  updateArticle() {
    this.chargefood();
    const foodsData = this.foodsForm.value;
    this.foodserv.update(this.foodId, foodsData).subscribe(data => {
      this.closeModal()
      window.location.reload();
      console.log(data);
    });
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
      .then(response => response.json())
      .then(res => {
        this.foodsForm.get('imageUrl')!.setValue(res.url);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }
}
