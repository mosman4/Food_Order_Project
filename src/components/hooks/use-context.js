import React, {useState} from 'react';
const MealsContext = React.createContext({
    AddMeal: () => {},
    GetMeal: [],
    newUser: ()=> {}
});

export const AuthContextProvider = (props) => {
    const [meals, setMeals] = useState([]);
    const [newOrder, setOrder] = useState([]);
    const mealsSetter = (meal) => {
        setMeals(meal)
        console.log(meal)
    }
    const usersAppender = (order) => {
        setOrder((prevTasks) => prevTasks.concat(order));
    }

    return (
        <MealsContext.Provider
            value={{
                AddMeal: mealsSetter,
                GetMeal:meals,
                newUser:usersAppender
            }}
        >
            {props.children}
        </MealsContext.Provider>
    );
}

export default MealsContext;