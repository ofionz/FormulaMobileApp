import {
  STUDENT_PROFILE_EDIT,
  STUDENT_PROFILE,
  STUDENT_HISTORY_LESSONS,
  STUDENT_BUY,
  GUEST_BUY_ENDPOINT,
  STUDENT_AVAILABLE_DAYS,
  STUDENT_LESSONS_DAY,
  STUDENT_SIGNED_LESSON,
  STUDENT_UNSIGNED_LESSON,
  STUDENT_FEEDBACK,
  STUDENT_FEEDBACK_ANSWER,
} from '../../api/constants';
import Vue from "vue";
export async  function  fetchStudentProfile ( context ) {
  return Vue.prototype.$axios
    .get(STUDENT_PROFILE)
    .then(response => {
      if (response.data) {
        context.commit("setAvatar", response.data.avatar);
        context.commit("setName", response.data.name);
        context.commit("setLastName", response.data.lastName);
        context.commit("setPhone", response.data.phone);
        context.commit("setEmail", response.data.email);
        context.commit("setBirthDate", response.data.birthDate);
        context.commit("setPassportNumber", response.data.passportNumber);
        context.commit("setPassportDate", response.data.passportDate);
        context.commit("setPassportAddress", response.data.passportAddress);
        context.commit("setPassportPlace", response.data.passportPlace);
        context.commit("setPassportCode", response.data.passportCode);
        context.commit("setDebt", response.data.debt);
        context.commit("setUserDepartment", response.data.branch);
        context.commit("setDealNumber", response.data.deal_number);
        context.commit("setLessonsLeft", response.data.lessons_left);
        context.commit("setInstructor", response.data.teacher);
        context.commit("setAssigned", response.data.assigned);
        context.commit("setTariff", response.data.tariff);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchStudentProfile" + error);
    });
}
export async  function  saveStudentProfile  ( context, data ) {

  return Vue.prototype.$axios
    .post(STUDENT_PROFILE_EDIT, data)
    .then(response => {
      if (response.data.success) {
        context.commit("setAvatar", data.avatar);
        context.commit("setName", data.name);
        context.commit("setLastName", data.lastName);
        context.commit("setPhone", data.phone);
        context.commit("setEmail", data.email);
        context.commit("setBirthDate", data.birthDate);
        context.commit("setPassportNumber", data.passportNumber);
        context.commit("setPassportDate", data.passportDate);
        context.commit("setPassportPlace", data.passportPlace);
        context.commit("setPassportAddress", data.passportAddress);
        context.commit("setPassportCode", data.passportCode);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action saveStudentProfile" + error);
    });
}
export async  function  fetchStudentHistoryLessons  ( context ) {

  return Vue.prototype.$axios
    .get(STUDENT_HISTORY_LESSONS)
    .then(response => {
      if (response.data) {
        context.commit("setHistoryLessons", response.data);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchStudentHistoryLessons" + error);
    });
}
export async  function  studentBuy  ( context, paymentinfo ) {
  let data =  {
    PAYMENT_INFO: paymentinfo,
  };
  return Vue.prototype.$axios
    .post(STUDENT_BUY, data)
    .then(response => {
      return !!response.data.success;
    })
    .catch(error => {
      throw new Error("action studentBuy " + error);
    });
}
export async  function  fetchAvailableDays  ( context ) {
  return Vue.prototype.$axios
    .get(STUDENT_AVAILABLE_DAYS)
    .then(response => {
      if (response.data &&  response.data.dates) {
        context.commit("setAvailableDays", response.data.dates);
        return  true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchAvailableDays" + error);
    });
}
export async  function  fetchAvailableTime  ( context, date ) {
  return Vue.prototype.$axios
    .post(STUDENT_LESSONS_DAY, {date: date})
    .then(response => {
      if (response.data &&  response.data.lessons) {
        context.commit("setAvailableTime", response.data.lessons);
        return  true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchAvailableTime" + error);
    });
}
export async  function  signUpStudent  ( context, data ) {
  return Vue.prototype.$axios
    .post(STUDENT_SIGNED_LESSON, data)
    .then(response => {
      return !!response.data.success;
    })
    .catch(error => {
      throw new Error("action signUpStudent" + error);
    });
}
export async  function  unsignStudent  ( context, data ) {
  return Vue.prototype.$axios
    .post(STUDENT_UNSIGNED_LESSON, data)
    .then(response => {
      return !!response.data.success;
    })
    .catch(error => {
      throw new Error("action unsignStudent" + error);
    });
}
export async  function  fetchFeedbackQuestions  ( context, data ) {
  return Vue.prototype.$axios
    .get(STUDENT_FEEDBACK)
    .then(response => {
      if (response.data) {
        context.commit("setFeedbackQuestions", response.data);
        return  true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchFeedbackQuestions" + error);
    });
}

export async  function  sendFeedbackAnswers  ( context, data ) {
  return Vue.prototype.$axios
    .post(STUDENT_FEEDBACK_ANSWER, data)
    .then(response => {
      return !!response.data.success;
    })
    .catch(error => {
      throw new Error("action sendFeedbackAnswers" + error);
    });
}
