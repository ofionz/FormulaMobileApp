// export function setStudentInfoState(state, n) {
//     state = n;
// }

export function resetData(state, n) {
  state.avatar = '';
  state.name = '';
  state.lastName = '';
  state.auto = {
    name: '',
    number: '',
  };
  state.phone = '';
  state.email = '';
  state.birthDate = '';
  state.passportNumber = '';
  state.passportDate = '';
  state.passportPlace = '';
  state.passportCode = '';
  state.passportAddress = '';
  state.kndDocs = [];
  state.availableDays = [];

}


export function setAvatar(state, n) {
  state.avatar = n;
}

export function setName(state, n) {
  state.name = n;
}

export function setPhone(state, n) {
  state.phone = n;
}

export function setLastName(state, n) {
  state.lastName = n;
}

export function setAuto(state, n) {
  state.auto.name = n.name;
  state.auto.number = n.number.replace(/\s+/g, '');

}

export function setEmail(state, n) {
  state.email = n;
}


export function setBirthDate(state, n) {
  state.birthDate = n;
}

export function setPassportNumber(state, n) {
  state.passportNumber = n;
}

export function setPassportDate(state, n) {
  state.passportDate = n;
}

export function setPassportPlace(state, n) {
  state.passportPlace = n;
}

export function setPassportCode(state, n) {
  state.passportCode = n;
}

export function setPassportAddress(state, n) {
  state.passportAddress = n;
}

export function setKndDocs(state, n) {
  state.kndDocs = n;
}

export function setAvailableDays(state, n) {

  state.availableDays = n;
}

