module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    calc_calories: (goal, calories) => {
        return goal - calories;
    },
    add_calories: (posts) => {
        let totalCalories = 0;
        for(let i = 0; i < posts.length; i++) {
            totalCalories += posts[i].calories;
        }

        return totalCalories;
    },
    get_goal: (posts) => {
        return posts[0].user.caloriegoal;
    },
    get_today: () => {
        return `${new Date().getMonth() + 1}/${new Date().getDate()}`
    }
}