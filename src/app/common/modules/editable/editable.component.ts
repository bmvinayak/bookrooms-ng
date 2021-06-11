import { Component, OnInit, Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export class EditableComponent implements OnInit {
	isActiveInput = false;
	public entityfieldName: string;
	public originalEntityValue: any;

	@Output('entityUpdated') entityUpdated: EventEmitter<any> = new EventEmitter();
	@Input('entity') entity: any;
	@Input('field') set field(entityfieldName: string) {
		this.entityfieldName = entityfieldName;
		this.setOriginalValue();
	}
	@Input('displayClass') displayClass: string;
	@Input('dataType') dataType = 'text';
	@Input('style') style: any;
	@Input('transformView') transformView = (value) => {
		return value;
	};

	constructor() {}

	ngOnInit() {}

	updateEntity() {
		const updatedEntityValue = this.entity[this.entityfieldName];
		if (updatedEntityValue !== this.originalEntityValue) {
			this.entityUpdated.emit({
				data: { [this.entityfieldName]: updatedEntityValue },
				notifier: this.inputNotifier,
			});
		}
	}

	inputNotifier = (error: any) => {
		if (error) {
			this.cancelUpdate();
			// TODO: handle error / show error
			return;
		}
		this.setOriginalValue();
		this.isActiveInput = false;
	};

	cancelUpdate() {
		this.isActiveInput = false;
		this.entity[this.entityfieldName] = this.originalEntityValue;
	}

	setOriginalValue() {
		this.originalEntityValue = this.entity[this.entityfieldName];
	}

	protected set entityValue(value: any) {
		this.entity[this.entityfieldName] = value;
	}

	protected get entityValue() {
		return this.entity[this.entityfieldName];
	}
}
