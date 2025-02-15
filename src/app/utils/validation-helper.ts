import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

interface ValidationMessage {
  [key: string]: {
    type: 'required' | 'email' | 'pattern' | 'minlength' | 'maxlength';
    message: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ValidationHelper {
  public static phoneValidationRules = [
    Validators.pattern(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/
    )
  ];

  public validationMessages: ValidationMessage = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long.'
      }
    ],
    name: [
      {
        type: 'required',
        message: 'Name is required'
      }
    ],
    phone: [
      {
        type: 'required',
        message: 'Phone number is required'
      },
      {
        type: 'pattern',
        message: 'Enter valid phone number, e.g. +61(02)89876544, 0414 570776 or 0414 570776'
      }
    ],
    clientReference: [
      {
        type: 'required',
        message: 'Client Reference is required'
      }
    ]
  };
  constructor() {}
}
