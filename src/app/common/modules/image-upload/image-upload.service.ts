import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageSnippet } from './image-upload.component';

@Injectable({
	providedIn: 'root'
})
export class ImageUploadService {

	constructor(private http: HttpClient) {

	}
	uploadImage(selectedImage: ImageSnippet): Observable<any> {
		const { src, imageFileType, imageFileName } = selectedImage;
		const file = b64ToFile(src, imageFileType, imageFileName);
		const formData = new FormData();
		formData.append('image', file);

		return this.http.post('/api/v1/image', formData);

	}

	deleteImage(imageId: string): Observable<any> {
		return this.http.delete(`/api/v1/image/${imageId}`);
	}
}

function b64ToFile(b64Data: string, type = 'image/jpeg', name: string): File {
	let data;
	const aux = b64Data.split(',');
	if (aux.length > 1) {
		data = aux[1];
	} else {
		data = b64Data;
	}

	const byteString = atob(data);
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i += 1) {
		ia[i] = byteString.charCodeAt(i);
	}
	const blob = new Blob([ab], { type });
	if (!blob) {
		return null;
	}
	return new File([blob], name, { type });
}