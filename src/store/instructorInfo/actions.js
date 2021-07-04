import {
  INSTRUCTOR_KND,
  INSTRUCTOR_CALENDAR_EMPLOYMENT,
  INSTRUCTOR_LESSONS_DAY,
  INSTRUCTOR_CARD_STUDENT,
  INSTRUCTOR_KND_EDIT,
  INSTRUCTOR_INFO,
  INSTRUCTOR_PROFILE, INSTRUCTOR_PROFILE_EDIT,
} from '../../api/constants';
import Vue from "vue";


export async  function  fetchInstructorProfile ( context ) {
  return Vue.prototype.$axios
    .get(INSTRUCTOR_PROFILE)
    .then(response => {
      if (response.data) {
        context.commit("setAvatar", response.data.avatar);
        context.commit("setName", response.data.name);
        context.commit("setSurname", response.data.lastName);
        context.commit("setPhone", response.data.phone);
        context.commit("setEmail", response.data.email);
        context.commit("setBirthDate", response.data.birthDate);
        context.commit("setPassportNumber", response.data.passportNumber);
        context.commit("setPassportDate", response.data.passportDate);
        context.commit("setPassportAddress", response.data.passportAddress);
        context.commit("setPassportPlace", response.data.passportPlace);
        context.commit("setPassportCode", response.data.passportCode);
        context.commit("setAuto", response.data.auto);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchInstructorProfile" + error);
    });
}

export async  function  saveInstructorProfile  ( context, data ) {

  return Vue.prototype.$axios
    .post(INSTRUCTOR_PROFILE_EDIT, data)
    .then(response => {
      if (response.data.success) {
        context.commit("setAvatar", data.avatar);
        context.commit("setName", data.name);
        context.commit("setSurname", data.surname);
        context.commit("setPhone", data.phone);
        context.commit("setEmail", data.email);
        context.commit("setBirthDate", data.birthDate);
        context.commit("setPassportNumber", data.passportNumber);
        context.commit("setPassportDate", data.passportDate);
        context.commit("setPassportPlace", data.passportPlace);
        context.commit("setPassportAddress", data.data.passportAddress);
        context.commit("setPassportCode", data.passportCode);
        context.commit("setAuto", data.auto);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action saveInstructorProfile" + error);
    });
}

export async  function  fetchKndDocs ( context ) {
  return Vue.prototype.$axios
    .get(INSTRUCTOR_KND)
    .then(response => {
      if (response.data) {
        response.data.forEach((el)=> {
          if (el.inputType==='checker') {
            el.value = '';
          }
        });
        context.commit("setKndDocs", response.data);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchKndDocs" + error);
    });
}

export async  function  saveKndDocs ( context, docs ) {

  return Vue.prototype.$axios
    .post(INSTRUCTOR_KND_EDIT, docs)
    .then(response => {
      if (response.data.success) {
        context.commit('setKndDocs', docs);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action saveKndDocs" + error);
    });
}

export async  function  fetchAvailableDays ( context ) {
  return Vue.prototype.$axios
    .get(INSTRUCTOR_CALENDAR_EMPLOYMENT)
    .then(response => {
      if (response.data) {
        let res = [];
        if (  response.data.dates) {
          response.data.dates.forEach(el => res.push(el.date));
          context.commit("setAvailableDays", res);
        }

        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchAvailableDays" + error);
    });
}

export async  function  fetchCurrentDayData ( context, day ) {
  return Vue.prototype.$axios
    .post(INSTRUCTOR_LESSONS_DAY, {date: day})
    .then(response => {
      if (response.data) {
        // context.commit("setAvailableDays", res);
        return  response.data;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchCurrentDayData" + error);
    });
}

export async  function  fetchStudentInfo ( context, student_id ) {
  return Vue.prototype.$axios
    .post(INSTRUCTOR_CARD_STUDENT, {student_id: student_id})
    .then(response => {
      if (response.data) {
        return  response.data;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchStudentInfo" + error);
    });
}