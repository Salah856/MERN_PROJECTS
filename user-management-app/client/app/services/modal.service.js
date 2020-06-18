/*
 * File: modal.service.js
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 11:29:02 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:42 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

import { BehaviorSubject } from "rxjs";

let isUserUpdateModalOpened = false;
let isUserCreateModalOpened = false;
let modalContent = {};

const isUserUpdateModalOpenedSubject = new BehaviorSubject(
  isUserUpdateModalOpened
);

const isUserCreateModalOpenedSubject = new BehaviorSubject(
  isUserCreateModalOpened
);

export const modalService = {
  openUserUpdateModal,
  openUserCreateModal,
  isUserUpdateModalOpened: isUserUpdateModalOpenedSubject.asObservable(),
  isUserCreateModalOpened: isUserCreateModalOpenedSubject.asObservable(),
  get modalContentValue() {
    return modalContent
  },
  get isUserUpdateModalOpenedValue() {
    return isUserUpdateModalOpened
  },
  get isUserCreateModalOpenedValue() {
    return isUserCreateModalOpened
  },
  set isUserUpdateModalOpenedValue(_isUserUpdateModalOpened) {
    isUserUpdateModalOpened = _isUserUpdateModalOpened;
    isUserUpdateModalOpenedSubject.next(isUserUpdateModalOpened);
  },
  set isUserCreateModalOpenedValue(_isUserCreateModalOpened) {
    isUserCreateModalOpened = _isUserCreateModalOpened;
    isUserUpdateModalOpenedSubject.next(isUserCreateModalOpened);
  }
};

function openUserUpdateModal(content) {
  modalContent = content;
  isUserUpdateModalOpened = true;
  isUserUpdateModalOpenedSubject.next(isUserUpdateModalOpened);
}

function openUserCreateModal(content) {
  modalContent = content;
  isUserCreateModalOpened = true;
  isUserCreateModalOpenedSubject.next(isUserCreateModalOpened);
}
