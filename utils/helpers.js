module.exports = {
    format_date: date => {          // Format the date into human readable format
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    calc_calories: (goal, calories) => {
        return goal - calories;
    },
    add_calories: (posts) => {              // Add calories from all posts
        let totalCalories = 0;
        for(let i = 0; i < posts.length; i++) {
            totalCalories += posts[i].calories;
        }

        return totalCalories;
    },
    get_goal: (posts) => {                  // Get user's calorie goal
        return posts[0].user.caloriegoal;
    },
    get_today: () => {                      // Get today's date
        return `${new Date().getMonth() + 1}/${new Date().getDate()}`
    }
}