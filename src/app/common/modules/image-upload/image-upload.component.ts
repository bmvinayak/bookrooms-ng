import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageUploadService } from './image-upload.service';

export class ImageSnippet {
	src: string;
	status = 'INIT';
	imageFileName: string;
	imageFileType: string;


	constructor(imageFileName: string, imageFileType: string) {
		this.imageFileName = imageFileName;
		this.imageFileType = imageFileType;
	}
}

@Component({
	selector: 'bwm-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnDestroy {

	@Output('imageUploadEmitter') imageUploadEmitter = new EventEmitter();
	@Output('imageSelected') imageSelected = new EventEmitter();
	@Output('imageCancelled') imageCancelled = new EventEmitter();

	@Input('imageUploadMode') imageUploadMode: string;

	selectedImage: ImageSnippet;
	imageChangedEvent: any;
	uploadedImageId: string;

	private fileReader = new FileReader();

	constructor(private imageUploadService: ImageUploadService) { }

	ngOnInit() {
		this.addFileLoadingListener();
	}

	ngOnDestroy() {
		this.removeFileLoadingListener();
	}

	onImageChange(event: any) {
		this.imageSelected.emit();
		this.imageChangedEvent = event;
		const file: File = event.target.files[0];
		this.selectedImage = new ImageSnippet(file.name, file.type);
		// following line will fire 'load' event on the fileReader
		this.fileReader.readAsDataURL(file);
	}

	uploadImage(fileReference: any) {

		this.selectedImage.status = 'PENDING';
		this.imageUploadService
			.uploadImage(this.selectedImage)
			.subscribe((uploadedImage: any) => {
				this.uploadedImageId = uploadedImage._id;
				this.imageUploadEmitter.emit(uploadedImage._id);
				this.selectedImage.status = 'UPLOADED';
				this.imageChangedEvent = null;
			}, () => {
				this.selectedImage.status = 'ERROR';
				this.imageChangedEvent = null;
				fileReference.value = null;
			});

	}

	cancelImage(fileReference: any) {
		this.imageCancelled.emit();
		this.selectedImage = null;
		this.imageChangedEvent = null;
		fileReference.value = null;
	}

	removeImage() {
		this.selectedImage.status = 'PENDING';
		this.imageUploadService
			.deleteImage(this.uploadedImageId)
			.subscribe(() => {
				this.selectedImage = null;
				this.imageChangedEvent = null;
			}, () => {
				this.selectedImage.status = 'DELETE_ERROR';
			});

	}

	private handleImageLoad = (event: any) => {
		// event.target.result contains base64 encoded string
		const { result } = event.target;
		this.selectedImage.src = result;
		this.selectedImage.status = 'SELECTED';
	}

	private addFileLoadingListener() {
		this.fileReader.addEventListener('load', this.handleImageLoad);
	}

	private removeFileLoadingListener() {
		this.fileReader.removeEventListener('load', this.handleImageLoad);
	}


	fileChangeEvent(event: any): void {
		this.imageChangedEvent = event;
	}
	imageCropped(event: ImageCroppedEvent) {
		this.selectedImage.src = event.base64;
	}
	imageLoaded(image: HTMLImageElement) {
		// show cropper
	}
	cropperReady() {
		// cropper ready
	}
	loadImageFailed() {
		// show message
	}
}
