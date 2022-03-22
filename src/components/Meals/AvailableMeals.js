import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useContext, useEffect} from "react";
import useFetch from "../hooks/use-fetch";
import MealsContext from "../hooks/use-context";

const AvailableMeals = () => {
  const { isLoading, error, fetchMeals } = useFetch();
  const cxt = useContext(MealsContext)

  useEffect(() => {
    const transformTasks = (mealObject) => {
      const loadedMeals = [];

      for (const mealKey in mealObject) {
        loadedMeals.push({ id: mealKey, name: mealObject[mealKey].name,
          description: mealObject[mealKey].description, price:mealObject[mealKey].price});
      }
      cxt.AddMeal(loadedMeals);
    };
    fetchMeals(
        { url: 'https://react-testing-42531-default-rtdb.firebaseio.com/meals.json' },
        transformTasks
    );
  }, [fetchMeals]);

  const mealsList = cxt.GetMeal.map((x) => (
    <MealItem
      key={x.id}
      id={x.id}
      name={x.name}
      description={x.description}
      price={x.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && <p>Loading ...</p>}
        {error && <p>An error has occurred, try again later ...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
