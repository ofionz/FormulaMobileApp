
export function getLessonById(state) {
  return id => {
    let result;
    for (const item in state.dates) {
      for (const elem in state.dates[item].lessons) {
        for (const lesson in state.dates[item].lessons) {
          if (state.dates[item].lessons[lesson].id === id) {
            result = state.dates[item].lessons[lesson];
            result.date = state.dates[item].date;
            return result;
          }
        }
      }
    }
  };
}
