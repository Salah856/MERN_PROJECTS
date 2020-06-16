/*
 * File: modal.service.js
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 11:29:02 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:42 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import { BehaviorSubject } from "rxjs";

let isUserUpdateModalOpened = false;
let isUserCreateModalOpened = false;
let isProfileModalOpened = false;
let isModalOpened = false;
let isMessageModalOpened = false;
let modalContent = "";

const isUserUpdateModalOpenedSubject = new BehaviorSubject(
  isUserUpdateModalOpened
);

const isUserCreateModalOpenedSubject = new BehaviorSubject(
  isUserCreateModalOpened
);

const isProfileModalOpenedSubject = new BehaviorSubject(
  isProfileModalOpened
);

const isModalOpenedSubject = new BehaviorSubject(
  isModalOpened
);

const isMessageModalOpenedSubject = new BehaviorSubject(
  isMessageModalOpened
);

export const modalService = {
  openUserUpdateModal,
  openUserCreateModal,
  openProfileModal,
  openModal,
  openMessageModal,
  isUserUpdateModalOpened: isUserUpdateModalOpenedSubject.asObservable(),
  isUserCreateModalOpened: isUserCreateModalOpenedSubject.asObservable(),
  isProfileModalOpened: isProfileModalOpenedSubject.asObservable(),
  isModalOpened: isModalOpenedSubject.asObservable(),
  isMessageModalOpened: isMessageModalOpenedSubject.asObservable(),
  get modalContentValue() {
    return modalContent
  },
  get isUserUpdateModalOpenedValue() {
    return isUserUpdateModalOpened
  },
  get isUserCreateModalOpenedValue() {
    return isUserCreateModalOpened
  },
  get isProfileModalOpenedValue() {
    return isProfileModalOpened
  },
  get isModalOpenedValue() {
    return isModalOpened
  },
  get isMessageModalOpenedValue() {
    return isMessageModalOpened
  },
  set isUserUpdateModalOpenedValue(_isUserUpdateModalOpened) {
    isUserUpdateModalOpened = _isUserUpdateModalOpened;
    isUserUpdateModalOpenedSubject.next(isUserUpdateModalOpened);
  },
  set isUserCreateModalOpenedValue(_isUserCreateModalOpened) {
    isUserCreateModalOpened = _isUserCreateModalOpened;
    isUserUpdateModalOpenedSubject.next(isUserCreateModalOpened);
  },
  set isProfileModalOpenedValue(_isProfileModalOpened) {
    isProfileModalOpened = _isProfileModalOpened;
    isProfileModalOpenedSubject.next(isProfileModalOpened);
  },
  set isModalOpenedValue(_isModalOpened) {
    isModalOpened = _isModalOpened;
    isModalOpenedSubject.next(isModalOpened);
  },
  set isMessageModalOpenedValue(_isMessageModalOpened) {
    isMessageModalOpened = _isMessageModalOpened;
    isMessageModalOpenedSubject.next(isMessageModalOpened);
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

function openProfileModal(content) {
  modalContent = content;
  isProfileModalOpened = true;
  isProfileModalOpenedSubject.next(isProfileModalOpened);
}

function openModal(content) {
  modalContent = content;
  isModalOpened = true;
  isModalOpenedSubject.next(isModalOpened);
}

function openMessageModal(content) {
  modalContent = content;
  isMessageModalOpened = true;
  isMessageModalOpenedSubject.next(isMessageModalOpened);
}